import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format, parseISO, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isToday } from "date-fns";
import { it } from "date-fns/locale";
import { 
  Check, X, User, Clock, FileText, Calendar as CalendarIcon, 
  ExternalLink, Mail, Phone, MapPin, Info, ChevronDown, 
  Loader2, Save, ChevronLeft, ChevronRight, Download, Navigation
} from "lucide-react";

export default function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [confirmedApps, setConfirmedApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPending, setShowPending] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editLocation, setEditLocation] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
const [historyMonth, setHistoryMonth] = useState(new Date().getMonth());
const [historyYear, setHistoryYear] = useState(new Date().getFullYear());

// Logica per filtrare lo storico
const historicalApps = confirmedApps.filter(app => {
  const date = parseISO(app.availability.start_time);
  return date.getMonth() === historyMonth && date.getFullYear() === historyYear;
});

// Opzioni per i filtri
const months = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];
const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);


  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select(`*, availability (*), profiles (*)`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data.filter(a => a.status === 'pending'));
      setConfirmedApps(data.filter(a => a.status === 'confirmed'));
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

    const saveLocation = async () => {
    if (!selectedApp) return;
    
    const { error } = await supabase
        .from("appointments")
        .update({ location: editLocation })
        .eq("id", selectedApp.id);

    if (error) {
        toast.error("Errore salvataggio posizione");
    } else {
        // Attiviamo il feedback visivo
        setIsSaved(true);
        fetchData(); // Aggiorna i dati nel DB
        
        // Reset dopo 2 secondi
        setTimeout(() => {
        setIsSaved(false);
        }, 2000);
    }
    };

  const handleAction = async (appId: number, availId: number, status: 'confirmed' | 'rejected') => {
    await supabase.from("appointments").update({ status }).eq("id", appId);
    if (status === 'confirmed') await supabase.from("availability").update({ is_booked: true }).eq("id", availId);
    fetchData();
    toast.success("Stato aggiornato!");
  };

  const openInGoogleMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  const bookedDays = confirmedApps.map(app => parseISO(app.availability.start_time));
  const appsOnSelectedDate = confirmedApps.filter(app => selectedDate && isSameDay(parseISO(app.availability.start_time), selectedDate));

  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-[#E8F4F4] via-white to-[#E8F4F4]">
      <div className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-8">
        
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b-2 border-[#006B6B]/20">
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-black text-[#006B6B] tracking-tight leading-none">
              DASHBOARD-ADMIN
            </h1>
            <p className="text-[#4A9B9B] font-bold text-lg uppercase tracking-widest">
              Dashboard Gestionale
            </p>
          </div>
          <Button 
            onClick={fetchData} 
            disabled={loading}
            className="bg-[#006B6B] hover:bg-[#4A9B9B] text-white font-black h-14 px-8 rounded-2xl text-lg shadow-lg shadow-[#006B6B]/20 transition-all hover:scale-105 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            Aggiorna
          </Button>
        </header>

        {/* Richieste in Attesa - Collapsible */}
        <section className="space-y-4">
          <button 
            onClick={() => setShowPending(!showPending)}
            className="w-full flex justify-between items-center bg-gradient-to-r from-[#4A9B9B] to-[#006B6B] p-6 text-white font-black text-2xl uppercase rounded-2xl shadow-lg shadow-[#006B6B]/20 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-black text-xl">
                {requests.length}
              </div>
              <span>Richieste in Attesa</span>
            </div>
            <div className={`transform transition-transform duration-300 ${showPending ? 'rotate-180' : ''}`}>
              <ChevronDown size={32} />
            </div>
          </button>
          
          {showPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
              {requests.length === 0 ? (
                <div className="col-span-full p-12 text-center bg-white rounded-2xl border-2 border-dashed border-[#4A9B9B]/30">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F4F4] flex items-center justify-center mb-4">
                    <Check className="text-[#4A9B9B]" size={32} />
                  </div>
                  <p className="text-[#4A9B9B] font-bold text-lg">Nessuna richiesta in attesa</p>
                </div>
              ) : (
                requests.map(app => (
                  <Card 
                    key={app.id} 
                    className="border-2 border-[#4A9B9B]/20 bg-white p-6 rounded-2xl shadow-lg shadow-[#006B6B]/5 hover:shadow-xl hover:border-[#4A9B9B]/40 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black text-[#006B6B] uppercase truncate leading-tight">
                          {app.profiles.full_name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-[#4A9B9B] font-bold">
                          <Clock size={16} />
                          <span>{format(parseISO(app.availability.start_time), "dd MMM - HH:mm", { locale: it })}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button 
                          onClick={() => handleAction(app.id, app.availability.id, 'confirmed')} 
                          className="bg-green-500 hover:bg-green-600 text-white rounded-xl h-12 w-12 shadow-lg shadow-green-500/20 transition-all hover:scale-110"
                        >
                          <Check size={20} />
                        </Button>
                        <Button 
                          onClick={() => handleAction(app.id, app.availability.id, 'rejected')} 
                          className="bg-red-500 hover:bg-red-600 text-white rounded-xl h-12 w-12 shadow-lg shadow-red-500/20 transition-all hover:scale-110"
                        >
                          <X size={20} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </section>

                    {/* Storico Appuntamenti */}
        <section className="space-y-4">
        <button 
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex justify-between items-center bg-gradient-to-r from-[#006B6B] to-[#4A9B9B] p-6 text-white font-black text-2xl uppercase rounded-2xl shadow-lg shadow-[#006B6B]/20 transition-all hover:shadow-xl"
        >
            <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FileText size={24} />
            </div>
            <span>Storico Visite</span>
            </div>
            <div className={`transform transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`}>
            <ChevronDown size={32} />
            </div>
        </button>

        {showHistory && (
            <div className="bg-white border-2 border-[#006B6B]/10 rounded-3xl p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl shadow-[#006B6B]/5">
            {/* Filtri Storico */}
            <div className="flex flex-wrap gap-6 items-end border-b-2 border-[#E8F4F4] pb-6">
                <div className="space-y-2">
                <label className="text-xs font-black text-[#006B6B] uppercase tracking-wider">Mese</label>
                <select 
                    value={historyMonth} 
                    onChange={(e) => setHistoryMonth(parseInt(e.target.value))}
                    className="w-48 h-12 border-2 border-[#006B6B]/20 rounded-xl font-bold text-[#006B6B] px-4 bg-[#F9FFFF] focus:border-[#006B6B] focus:ring-2 focus:ring-[#7FCFCF] transition-all cursor-pointer"
                >
                    {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                </div>
                <div className="space-y-2">
                <label className="text-xs font-black text-[#006B6B] uppercase tracking-wider">Anno</label>
                <select 
                    value={historyYear} 
                    onChange={(e) => setHistoryYear(parseInt(e.target.value))}
                    className="w-32 h-12 border-2 border-[#006B6B]/20 rounded-xl font-bold text-[#006B6B] px-4 bg-[#F9FFFF] focus:border-[#006B6B] focus:ring-2 focus:ring-[#7FCFCF] transition-all cursor-pointer"
                >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                </div>
                <div className="text-right flex-1">
                <p className="text-xs font-black text-[#4A9B9B] uppercase tracking-wider mb-1">Totale visite nel periodo</p>
                <p className="text-5xl font-black text-[#006B6B] leading-none">{historicalApps.length}</p>
                </div>
            </div>

            {/* Lista Storico */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {historicalApps.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-[#E8F4F4] rounded-2xl border-2 border-dashed border-[#4A9B9B]/30 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center">
                    <FileText className="text-[#4A9B9B]" size={32} />
                    </div>
                    <p className="text-[#4A9B9B] font-bold text-lg">Nessun record per questo periodo</p>
                </div>
                ) : (
                historicalApps.map(app => (
                    <div 
                    key={app.id} 
                    onClick={() => { setSelectedApp(app); setIsDetailsOpen(true); }}
                    className="group border-2 border-[#4A9B9B]/20 bg-[#E8F4F4] p-5 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-[#006B6B] hover:border-[#006B6B] transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                    <div className="space-y-1">
                        <p className="font-black text-lg text-[#006B6B] uppercase leading-tight group-hover:text-white transition-colors">
                        {app.profiles.full_name}
                        </p>
                        <p className="text-sm font-bold text-[#4A9B9B] group-hover:text-white/80 transition-colors">
                        {format(parseISO(app.availability.start_time), "dd MMMM yyyy", { locale: it })}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#4A9B9B] uppercase opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-white/80">
                        Dettagli
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-white/20 flex items-center justify-center transition-colors">
                        <ChevronRight size={20} className="text-[#006B6B] group-hover:text-white transition-colors" />
                        </div>
                    </div>
                    </div>
                ))
                )}
            </div>
        </div>
    )}
    </section>

        {/* Agenda e Calendario */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Custom Calendar */}
          <div className="xl:col-span-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-[#006B6B] flex items-center justify-center shadow-lg shadow-[#006B6B]/20">
                <CalendarIcon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#006B6B]">Calendario Appuntamenti</h2>
                <p className="text-[#4A9B9B] font-medium">Giorni con visite confermate evidenziati</p>
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

                {/* Week Days */}
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
                    const isBooked = bookedDays.some(bookedDay => isSameDay(bookedDay, day));
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const today = isToday(day);
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          relative h-20 lg:h-24 rounded-2xl font-bold text-xl transition-all duration-300 ease-out
                          flex flex-col items-center justify-center gap-1
                          ${isSelected
                            ? 'bg-[#006B6B] text-white shadow-lg shadow-[#006B6B]/30 scale-105' 
                            : isBooked
                              ? 'bg-[#4A9B9B] text-white shadow-md hover:bg-[#006B6B] hover:shadow-lg hover:-translate-y-1'
                              : today
                                ? 'bg-[#7FCFCF]/30 text-[#006B6B] border-2 border-[#006B6B] hover:bg-[#006B6B] hover:text-white'
                                : 'bg-[#E8F4F4] text-[#4A9B9B] hover:bg-[#4A9B9B] hover:text-white hover:shadow-lg hover:shadow-[#4A9B9B]/20 hover:-translate-y-1'
                          }
                        `}
                      >
                        <span className="text-2xl">{format(day, "d")}</span>
                        {isBooked && !isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white/80" />
                        )}
                        {today && !isSelected && <span className="text-xs font-bold">Oggi</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-[#E8F4F4] flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-[#4A9B9B]" />
                    <span className="text-sm font-bold text-[#4A9B9B]">Prenotazioni</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-[#006B6B]" />
                    <span className="text-sm font-bold text-[#006B6B]">Selezionato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-[#7FCFCF]/30 border-2 border-[#006B6B]" />
                    <span className="text-sm font-bold text-[#006B6B]">Oggi</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista Pazienti */}
          <div className="xl:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#006B6B] uppercase">
                  Appuntamenti del {format(selectedDate || new Date(), "dd MMMM", { locale: it })}
                </h2>
                <p className="text-[#4A9B9B] font-medium mt-1">
                  {appsOnSelectedDate.length} {appsOnSelectedDate.length === 1 ? 'paziente' : 'pazienti'} programmati
                </p>
              </div>
            </div>
            
            {appsOnSelectedDate.length === 0 ? (
              <div className="p-16 bg-white rounded-3xl border-2 border-dashed border-[#4A9B9B]/30 text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-[#E8F4F4] flex items-center justify-center">
                  <CalendarIcon className="text-[#4A9B9B]" size={48} />
                </div>
                <p className="text-[#4A9B9B] font-bold text-xl">Nessun appuntamento</p>
                <p className="text-gray-400">Seleziona un altro giorno o attendi nuove richieste</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appsOnSelectedDate.map(app => (
                  <Card 
                    key={app.id} 
                    className="border-2 border-[#006B6B]/10 bg-white p-6 rounded-2xl shadow-lg shadow-[#006B6B]/5 hover:shadow-xl hover:border-[#006B6B]/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#006B6B] flex items-center justify-center text-white font-black text-xl">
                            {app.profiles.full_name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-[#006B6B] uppercase leading-none">
                              {app.profiles.full_name}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-[#4A9B9B] font-bold">
                              <span className="flex items-center gap-2">
                                <Clock size={18} />
                                {format(parseISO(app.availability.start_time), "HH:mm")} - {format(parseISO(app.availability.end_time), "HH:mm")}
                              </span>
                              <span className="flex items-center gap-2">
                                <Phone size={18} />
                                {app.profiles.phone_mark}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {app.location && (
                          <button 
                            onClick={() => openInGoogleMaps(app.location)}
                            className="flex items-center gap-2 text-[#4A9B9B] hover:text-[#006B6B] font-bold text-sm transition-colors group/location"
                          >
                            <MapPin size={16} className="group-hover/location:scale-110 transition-transform" />
                            <span className="truncate max-w-md">{app.location}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover/location:opacity-100 transition-opacity" />
                          </button>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => { 
                          setSelectedApp(app); 
                          setEditLocation(app.location || ""); 
                          setIsDetailsOpen(true); 
                        }}
                        className="bg-[#006B6B] hover:bg-[#4A9B9B] text-white font-black rounded-xl h-14 px-8 shadow-lg shadow-[#006B6B]/20 transition-all hover:scale-105 active:scale-95 shrink-0"
                      >
                        <User className="mr-2" size={20} />
                        Visualizza Scheda
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Dettagli Paziente */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="border-none rounded-3xl bg-white p-0 max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
          <div className="bg-gradient-to-r from-[#006B6B] to-[#4A9B9B] p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">Cartella Paziente</h3>
                  <p className="text-white/80 font-medium">Dettagli completi appuntamento</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDetailsOpen(false)}
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Anagrafica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-[#4A9B9B] uppercase tracking-wider mb-2 block">Nome Completo</label>
                  <p className="text-3xl font-black text-[#006B6B] uppercase leading-none">
                    {selectedApp?.profiles.full_name}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-black text-[#4A9B9B] uppercase tracking-wider block">Contatti</label>
                  <div className="space-y-2">
                    <a 
                      href={`tel:${selectedApp?.profiles.phone_mark}`}
                      className="flex items-center gap-3 text-xl font-bold text-[#006B6B] hover:text-[#4A9B9B] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E8F4F4] flex items-center justify-center group-hover:bg-[#006B6B] group-hover:text-white transition-colors">
                        <Phone size={20} />
                      </div>
                      {selectedApp?.profiles.phone_mark}
                    </a>
                    <a 
                      href={`mailto:${selectedApp?.profiles.email}`}
                      className="flex items-center gap-3 text-lg font-bold text-[#4A9B9B] hover:text-[#006B6B] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E8F4F4] flex items-center justify-center group-hover:bg-[#006B6B] group-hover:text-white transition-colors">
                        <Mail size={20} />
                      </div>
                      <span className="truncate">{selectedApp?.profiles.email}</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#E8F4F4] p-6 rounded-2xl border-l-4 border-[#4A9B9B]">
                <label className="text-xs font-black text-[#4A9B9B] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info size={16} />
                  Note Cliniche
                </label>
                <p className="font-bold text-[#006B6B] italic text-lg leading-relaxed">
                  "{selectedApp?.notes || "Nessuna nota aggiuntiva inserita dal paziente"}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Indirizzo */}
              <div className="space-y-4">
                <label className="text-xs font-black text-[#006B6B] uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} />
                  Indirizzo Visita
                </label>
                
                <div className="space-y-3">
                    <div className="flex gap-2 relative">
                        <Input 
                            value={editLocation} 
                            onChange={(e) => setEditLocation(e.target.value)} 
                            placeholder="Inserisci indirizzo completo..."
                            className="flex-1 border-2 border-[#006B6B]/20 font-bold text-[#006B6B] h-14 rounded-xl focus:border-[#006B6B] focus:ring-2 focus:ring-[#7FCFCF] transition-all"
                        />
                        
                        <div className="relative">
                            {/* Messaggio "Posizione salvata" */}
                            {isSaved && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#006B6B] text-white text-[10px] font-black px-2 py-1 rounded-md animate-in fade-in zoom-in slide-in-from-bottom-2 duration-300 whitespace-nowrap shadow-lg">
                                POSIZIONE SALVATA
                                {/* Triangolino sotto il messaggio */}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#006B6B] rotate-45"></div>
                            </div>
                            )}

                            <Button 
                            onClick={saveLocation} 
                            className={`h-14 px-6 rounded-xl shadow-lg transition-all duration-300 ${
                                isSaved 
                                ? "bg-green-500 scale-105 shadow-green-200" 
                                : "bg-[#006B6B] hover:bg-[#4A9B9B] shadow-[#006B6B]/20 hover:scale-105"
                            }`}
                            >
                            {isSaved ? (
                                <Check size={20} className="animate-in zoom-in duration-300" />
                            ) : (
                                <Save size={20} />
                            )}
                            </Button>
                        </div>
                    </div>
                  
                  {selectedApp?.location && (
                    <Button 
                      variant="outline" 
                      onClick={() => openInGoogleMaps(selectedApp.location)}
                      className="w-full border-2 border-[#006B6B] text-[#006B6B] hover:bg-[#006B6B] hover:text-white font-bold h-14 rounded-xl transition-all group"
                    >
                      <Navigation size={20} className="mr-2 group-hover:animate-bounce" />
                      Naviga su Google Maps
                    </Button>
                  )}
                  
                  {!selectedApp?.location && !editLocation && (
                    <div className="p-4 bg-[#E8F4F4] rounded-xl text-center">
                      <p className="text-[#4A9B9B] font-medium text-sm">Nessun indirizzo salvato</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documento */}
              <div className="space-y-4">
                <label className="text-xs font-black text-[#006B6B] uppercase tracking-wider flex items-center gap-2">
                  <FileText size={16} />
                  Documentazione Allegata
                </label>
                
                {selectedApp?.document_url ? (
                  <div className="bg-[#E8F4F4] p-6 rounded-2xl border-2 border-[#4A9B9B]/20 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-[#006B6B] flex items-center justify-center shadow-lg shadow-[#006B6B]/20">
                      <FileText size={40} className="text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-[#006B6B] mb-1">Documento caricato</p>
                      <p className="text-sm text-[#4A9B9B]">Clicca per scaricare</p>
                    </div>
                    <Button 
                      onClick={() => {
                        const url = supabase.storage.from("appointment-documents").getPublicUrl(selectedApp.document_url).data.publicUrl;
                        window.open(url, "_blank");
                      }}
                      className="w-full bg-[#006B6B] hover:bg-[#4A9B9B] text-white font-bold rounded-xl h-12 shadow-lg shadow-[#006B6B]/20 transition-all hover:scale-[1.02]"
                    >
                      <Download className="mr-2" size={18} />
                      Scarica Allegato
                    </Button>
                  </div>
                ) : (
                  <div className="p-8 bg-[#E8F4F4] rounded-2xl border-2 border-dashed border-[#4A9B9B]/30 text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center">
                      <FileText className="text-[#4A9B9B]" size={32} />
                    </div>
                    <p className="text-[#4A9B9B] font-medium">Nessun documento allegato</p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Appuntamento */}
            <div className="bg-gradient-to-r from-[#E8F4F4] to-white p-6 rounded-2xl border border-[#4A9B9B]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-[#4A9B9B] uppercase tracking-wider mb-1">Data e Orario</p>
                  <p className="text-2xl font-black text-[#006B6B]">
                    {selectedApp && format(parseISO(selectedApp.availability.start_time), "EEEE dd MMMM yyyy", { locale: it })}
                  </p>
                  <p className="text-xl font-bold text-[#4A9B9B] mt-1">
                    {selectedApp && format(parseISO(selectedApp.availability.start_time), "HH:mm")} - {selectedApp && format(parseISO(selectedApp.availability.end_time), "HH:mm")}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#006B6B] flex items-center justify-center shadow-lg shadow-[#006B6B]/20">
                  <Clock className="text-white" size={32} />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}