import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format, isSameDay, parseISO, addMinutes, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths } from "date-fns";
import { it } from "date-fns/locale";
import { Loader2, Upload, CalendarCheck, AlertTriangle, ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, Trash2, CheckCircle, Hourglass, Lock, X, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingCalendar() {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [availableSlots, setAvailableSlots] = useState<any[]>([]);
    const [userAppointments, setUserAppointments] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [notes, setNotes] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        setUserProfile(profile);

        const { data: apps } = await supabase
        .from("appointments")
        .select(`*, availability(start_time, end_time)`)
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });
        setUserAppointments(apps || []);
    }

    const { data: slots } = await supabase.from("availability").select("*").eq("is_booked", false);
    setAvailableSlots(slots || []);
    };

    useEffect(() => { fetchData(); }, []);

    const isSpamRestricted = () => {
    if (!userProfile?.last_request_timestamp) return false;
        if (userProfile.request_count >= 3) {
            const lastReq = parseISO(userProfile.last_request_timestamp);
            const cooldownEnd = addMinutes(lastReq, 30);
            return new Date() < cooldownEnd;
        }
        return false;
    };

    const handleBooking = async () => {
        if (!selectedSlot) return toast.error("Seleziona un orario!");
        if (isDayPending(selectedDay!)) return toast.error("Hai già una richiesta attiva per oggi!");

            // Controllo Spam prima di procedere
            if (isSpamRestricted()) {
                return toast.error("Limite raggiunto! Devi aspettare 15 minuti dall'ultima richiesta.");
            }

        setLoading(true);

        try {
            let fileUrl = "";
            if (file) {
                const fileName = `${userProfile.id}/${Date.now()}_${file.name}`;
                const { data, error: uploadError } = await supabase.storage.from("appointment-documents").upload(fileName, file);
                if (uploadError) throw uploadError;
                fileUrl = data.path;
            }

            // 1. Inserimento Appuntamento
            const { error: bookingError } = await supabase.from("appointments").insert({
                client_id: userProfile.id,
                availability_id: selectedSlot.id,
                notes: notes,
                document_url: fileUrl,
                status: 'pending'
            });

            if (bookingError) throw bookingError;

            // 2. Aggiornamento contatore spam su Supabase
            // Se il contatore era già a 3 e il cooldown è passato, ricomincia da 1, altrimenti incrementa
            const currentCount = userProfile.request_count || 0;
            const newCount = currentCount >= 3 ? 1 : currentCount + 1;

            const { error: profileError } = await supabase
                .from("profiles")
                .update({ 
                request_count: newCount, 
                last_request_timestamp: new Date().toISOString() 
                })
                .eq("id", userProfile.id);

            if (profileError) throw profileError;

            toast.success("Richiesta inviata con successo!");
            setSelectedSlot(null); 
            setNotes(""); 
            setFile(null); 
            fetchData(); // Ricarica profilo e liste

        } catch (error: any) {
            console.error("Errore prenotazione:", error);
            toast.error("Errore: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleModifyRedirect = () => {
        navigate("/user/dashboard/");
    };

    const deleteAppointment = async (id: number) => {
        // 1. Troviamo prima il percorso del file per questo appuntamento
        const { data: appointmentData } = await supabase
            .from("appointments")
            .select("document_url")
            .eq("id", id)
            .single();

        // 2. Se c'è un file, cancelliamolo dallo Storage
        if (appointmentData?.document_url) {
            console.log("DEBUG: Cancellazione file dallo storage:", appointmentData.document_url);
            const { error: storageError } = await supabase.storage
            .from("appointment-documents")
            .remove([appointmentData.document_url]);

            if (storageError) {
            console.error("DEBUG: Errore cancellazione file storage:", storageError);
            // Decidi se bloccare o meno la cancellazione dell'appuntamento se il file fallisce
            }
        }

        // 3. Cancelliamo l'appuntamento dal Database
        const { error: dbError } = await supabase
            .from("appointments")
            .delete()
            .eq("id", id);

        if (dbError) {
            toast.error("Errore nella cancellazione");
        } else {
            toast.success("Prenotazione e documenti eliminati");
            fetchData(); // Ricarica tutto
        }
    };

    const isDayAvailable = (day: Date) => availableSlots.some(s => isSameDay(parseISO(s.start_time), day));
    const isDayPending = (day: Date) => userAppointments.some(a => (a.status === 'pending' || a.status === 'confirmed') && isSameDay(parseISO(a.availability.start_time), day));

    const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
    const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

    const [showArrow, setShowArrow] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Scompare se l'utente scende più di 100px
            if (window.scrollY > 100) {
                setShowArrow(false);
            } else {
                setShowArrow(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Funzione per lo scroll fluido al resoconto
    const scrollToAppointments = () => {
        const element = document.getElementById("appointments-section");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-[#E8F4F4] via-white to-[#E8F4F4]">
        <div className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-8">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b-2 border-[#006B6B]/20">
            <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-black text-[#006B6B] tracking-tight leading-none">
                PRENOTA ORA
            </h1>
            <p className="text-[#4A9B9B] font-bold text-lg uppercase tracking-widest">
                FisioAbadia
            </p>
            </div>
            {isSpamRestricted() && (
            <div className="flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
                <AlertTriangle size={20} />
                <span className="font-bold text-sm uppercase">Cooldown Anti-Spam Attivo</span>
            </div>
            )}
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            <div className="xl:col-span-7 space-y-6">
            {/* Custom Calendar */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[#006B6B] flex items-center justify-center shadow-lg shadow-[#006B6B]/20">
                <CalendarIcon className="text-white" size={24} />
                </div>
                <div>
                <h2 className="text-2xl font-black text-[#006B6B]">Seleziona Data</h2>
                <p className="text-[#4A9B9B] font-medium">Giorni disponibili evidenziati in teal</p>
                </div>
            </div>
            
            <Card className="border-none shadow-2xl shadow-[#006B6B]/10 rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-6 lg:p-8">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[#006B6B] hover:bg-[#E8F4F4] hover:text-[#006B6B] transition-all duration-200"
                    >
                    <ChevronLeft size={24} />
                    </button>
                    <h3 className="text-3xl font-black text-[#006B6B] uppercase tracking-wide">
                    {format(currentMonth, "MMMM yyyy", { locale: it })}
                    </h3>
                    <button 
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[#006B6B] hover:bg-[#E8F4F4] hover:text-[#006B6B] transition-all duration-200"
                    >
                    <ChevronRight size={24} />
                    </button>
                </div>

                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day) => (
                    <div key={day} className="text-center py-3 text-[#006B6B] font-bold text-lg uppercase tracking-wider">
                        {day}
                    </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-3">
                    {days.map((day, idx) => {
                    const available = isDayAvailable(day);
                    const pending = isDayPending(day);
                    const selected = selectedDay && isSameDay(day, selectedDay);
                    const today = isToday(day);
                    
                    return (
                        <button
                        key={idx}
                        onClick={() => available && !pending && setSelectedDay(day)}
                        disabled={!available || pending}
                        className={`
                            relative h-24 lg:h-28 rounded-2xl font-bold text-xl transition-all duration-300 ease-out
                            flex flex-col items-center justify-center gap-1
                            ${pending 
                            ? 'bg-orange-400 text-white shadow-lg cursor-not-allowed' 
                            : selected
                                ? 'bg-[#006B6B] text-white shadow-lg shadow-[#006B6B]/30 scale-105' 
                                : !available
                                ? 'bg-gray-200 text-gray-300 cursor-not-allowed'
                                : today
                                    ? 'bg-[#7FCFCF]/30 text-[#006B6B] border-2 border-[#006B6B] hover:bg-[#006B6B] hover:text-white'
                                    : 'bg-[#E8F4F4] text-[#4A9B9B] hover:bg-[#4A9B9B] hover:text-white hover:shadow-lg hover:shadow-[#4A9B9B]/20 hover:-translate-y-1'
                            }
                        `}
                        >
                        <span className="text-2xl">{format(day, "d")}</span>
                        {pending && <Lock size={16} className="opacity-80" />}
                        {selected && <span className="text-xs font-medium opacity-80">Scelto</span>}
                        {today && !selected && !pending && <span className="text-xs font-bold">Oggi</span>}
                        {available && !selected && !pending && <span className="text-xs opacity-60">Libero</span>}
                        </button>
                    );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-[#E8F4F4] flex-wrap">
                    <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-[#E8F4F4] border border-[#4A9B9B]" />
                    <span className="text-sm font-bold text-[#4A9B9B]">Disponibile</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-[#006B6B]" />
                    <span className="text-sm font-bold text-[#006B6B]">Selezionato</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-orange-400" />
                    <span className="text-sm font-bold text-orange-500">Occupato</span>
                    </div>
                </div>
                </CardContent>
            </Card>

            

            {/* Freccia verso il resoconto - Posizionata in basso al centro */}
            <div 
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
                showArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
            >
            <button 
                onClick={scrollToAppointments}
                className="flex flex-col items-center gap-2 group"
            >
                <span className="text-sm font-black uppercase tracking-tighter text-[#006B6B] bg-white/80 px-3 py-1 rounded-full shadow-sm border border-[#7FCFCF]">
                Resoconto prenotazioni
                </span>
                <div className="bg-[#006B6B] p-3 rounded-full shadow-2xl animate-bounce group-hover:bg-[#4A9B9B] transition-colors">
                <ChevronLeft className="rotate-[270deg] text-white" size={32} />
                </div>
            </button>
            </div>

            {/* Appointments List */}
            <div id="appointments-section">
                <Card className="border-2 border-[#006B6B]/10 bg-white shadow-xl shadow-[#006B6B]/5 rounded-3xl overflow-hidden flex flex-col max-h-[500px]">
                <CardHeader className="bg-[#E8F4F4] p-6 border-b border-[#006B6B]/10">
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#006B6B] flex items-center justify-center">
                        <Clock className="text-white" size={20} />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-black text-[#006B6B] uppercase tracking-wide">
                        Le Tue Prenotazioni
                        </CardTitle>
                        <p className="text-sm text-[#4A9B9B] font-medium">
                        {userAppointments.length} appuntamenti
                        </p>
                    </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto flex-1 custom-scrollbar">
                    {userAppointments.length === 0 ? (
                    <div className="p-12 text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F4F4] flex items-center justify-center">
                        <CalendarIcon className="text-[#4A9B9B]" size={32} />
                        </div>
                        <p className="text-[#4A9B9B] font-medium">Nessuna prenotazione attiva</p>
                    </div>
                    ) : (
                    <div className="divide-y divide-[#E8F4F4]">
                        {userAppointments.map((app) => (
                        <div 
                            key={app.id} 
                            className="group flex items-center justify-between p-5 hover:bg-[#F0FAFA] transition-colors duration-200"
                        >
                            <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${app.status === 'pending' ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-500'}`}>
                                {app.status === 'pending' ? <Hourglass size={24} className="animate-pulse" /> : <CheckCircle size={24} />}
                            </div>
                            <div>
                                <span className="font-black text-[#006B6B] text-lg block">
                                {format(parseISO(app.availability.start_time), "EEEE dd MMMM", { locale: it })}
                                </span>
                                <span className="font-bold text-[#4A9B9B] text-sm flex items-center gap-2">
                                <Clock size={14} />
                                {format(parseISO(app.availability.start_time), "HH:mm")} - {format(parseISO(app.availability.end_time), "HH:mm")}
                                </span>
                            </div>
                            </div>
                            <div className="flex items-center gap-3">
                            { app.status === 'pending' && (
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={handleModifyRedirect} 
                                        className="hover:bg-blue-50 text-blue-600 rounded-xl h-10 w-10"
                                        title="Modifica prenotazione"
                                    >
                                        <Edit3 size={18} />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => deleteAppointment(app.id)} 
                                        className="opacity-0 group-hover:opacity-100 hover:bg-red-50 text-red-500 rounded-xl transition-all duration-200 h-10 w-10"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            )}
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                {app.status === 'pending' ? 'In Attesa' : 'Confermata'}
                                </span>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </CardContent>
                </Card>
            </div>
            </div>

            {/* Booking Form Sidebar */}
            <div className="xl:col-span-5 space-y-6">
            <Card className="border-2 border-[#4A9B9B]/20 bg-white shadow-xl shadow-[#006B6B]/5 rounded-3xl overflow-hidden sticky top-6">
                <CardHeader className="bg-gradient-to-r from-[#4A9B9B] to-[#006B6B] text-white p-6">
                <div className="flex items-center gap-3">
                    <CalendarCheck size={24} className="opacity-80" />
                    <CardTitle className="text-xl font-black uppercase tracking-wide">
                    Dettagli Prenotazione
                    </CardTitle>
                </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                {selectedDay && isDayPending(selectedDay) ? (
                    <div className="bg-orange-50 border-2 border-orange-200 text-orange-700 p-8 rounded-2xl text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                        <Lock size={32} className="text-orange-500" />
                    </div>
                    <h3 className="font-black text-xl uppercase">Giorno Occupato</h3>
                    <p className="font-medium">Hai già una richiesta attiva per questa data.</p>
                    <Button 
                        variant="outline" 
                        onClick={() => setSelectedDay(undefined)}
                        className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                        Seleziona un'altra data
                    </Button>
                    </div>
                ) : (
                    <>
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-[#006B6B] uppercase tracking-wider ml-1 flex items-center gap-2">
                        <Clock size={14} />
                        Orari Disponibili
                        </label>
                        {!selectedDay ? (
                        <div className="p-8 text-center bg-[#E8F4F4] rounded-2xl border-2 border-dashed border-[#4A9B9B]/30">
                            <p className="text-[#4A9B9B] font-medium">Seleziona una data dal calendario</p>
                        </div>
                        ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {availableSlots.filter(s => isSameDay(parseISO(s.start_time), selectedDay)).length === 0 ? (
                            <p className="col-span-2 text-center text-[#4A9B9B] py-4">Nessun orario disponibile</p>
                            ) : (
                            availableSlots.filter(s => isSameDay(parseISO(s.start_time), selectedDay)).map(slot => (
                                <button
                                key={slot.id}
                                onClick={() => setSelectedSlot(slot)}
                                disabled={isDayPending(selectedDay)}
                                className={`
                                    p-4 rounded-xl font-bold text-lg transition-all duration-300
                                    ${isDayPending(selectedDay)
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : selectedSlot?.id === slot.id 
                                        ? 'bg-[#006B6B] text-white shadow-lg shadow-[#006B6B]/20 scale-105' 
                                        : 'bg-[#E8F4F4] text-[#006B6B] hover:bg-[#4A9B9B] hover:text-white hover:shadow-md'
                                    }
                                `}
                                >
                                {format(parseISO(slot.start_time), "HH:mm")}
                                </button>
                            ))
                            )}
                        </div>
                        )}
                        {selectedDay && isDayPending(selectedDay) && (
                        <div className="bg-orange-100 border border-orange-300 text-orange-700 p-4 rounded-xl text-center">
                            <p className="font-bold text-sm flex items-center justify-center gap-2">
                            <Lock size={16} />
                            Hai già una prenotazione in attesa per questo giorno
                            </p>
                        </div>
                        )}
                    </div>

                    <div className={`space-y-2 ${selectedDay && isDayPending(selectedDay) ? 'opacity-50 pointer-events-none' : ''}`}>
                        <label className="text-xs font-bold text-[#006B6B] uppercase tracking-wider ml-1">
                        Note Mediche
                        </label>
                        <Textarea 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                        placeholder="Descrivi il tuo problema (es. dolore cervicale...)"
                        disabled={selectedDay && isDayPending(selectedDay)}
                        className="min-h-[120px] text-lg font-medium border-2 border-[#006B6B]/20 bg-[#F9FFFF] focus:border-[#006B6B] focus:ring-2 focus:ring-[#7FCFCF] rounded-xl transition-all resize-none"
                        />
                    </div>

                    <div className={`space-y-2 ${selectedDay && isDayPending(selectedDay) ? 'opacity-50 pointer-events-none' : ''}`}>
                        <label className="text-xs font-bold text-[#006B6B] uppercase tracking-wider ml-1">
                        Documentazione
                        </label>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#4A9B9B] p-8 rounded-2xl bg-[#E8F4F4] hover:bg-[#7FCFCF]/20 hover:border-[#006B6B] transition-all duration-300 group cursor-pointer relative overflow-hidden">
                        <input 
                            type="file" 
                            onChange={(e) => setFile(e.target.files?.[0] || null)} 
                            disabled={selectedDay && isDayPending(selectedDay)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="text-[#006B6B] mb-3 group-hover:scale-110 transition-transform" size={32} />
                        <p className="text-[#006B6B] font-bold text-center truncate max-w-full px-4">
                            {file ? file.name : "Clicca per caricare file"}
                        </p>
                        <p className="text-xs mt-2 text-[#4A9B9B] font-medium uppercase tracking-wider">
                            PDF, JPG o PNG (Max 5MB)
                        </p>
                        {file && (
                            <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-full text-red-500"
                            >
                            <X size={16} />
                            </button>
                        )}
                        </div>
                    </div>

                    <Button 
                        onClick={handleBooking} 
                        disabled={loading || isSpamRestricted() || !selectedSlot || !selectedDay || (selectedDay && isDayPending(selectedDay))} 
                        className="w-full bg-[#006B6B] hover:bg-[#4A9B9B] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-black h-16 rounded-2xl shadow-xl shadow-[#006B6B]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {loading ? (
                        <Loader2 className="animate-spin mr-2" size={24} />
                        ) : (
                        <CalendarCheck className="mr-2" size={24} />
                        )}
                        {loading ? "Invio..." : "Invia Richiesta"}
                    </Button>
                    </>
                )}
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    </div>
    );
    }