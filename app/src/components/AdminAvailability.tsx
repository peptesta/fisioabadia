import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths } from "date-fns";
import { it } from "date-fns/locale";
import { Plus, Trash2, Calendar as CalendarIcon, Clock, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface Availability {
  id: number;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export default function AdminAvailability() {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState([{ start: "09:00", end: "10:00" }]);
  const [existingAvailability, setExistingAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const fetchAvailability = async () => {
    console.log("DEBUG: Inizio fetch disponibilità...");
    const { data, error } = await supabase
      .from("availability")
      .select("*")
      .order("start_time", { ascending: true });
    
    if (error) {
      console.error("DEBUG: Errore fetch:", error);
      toast.error("Errore caricamento dati");
    } else {
      console.log("DEBUG: Dati ricevuti dal DB:", data);
      setExistingAvailability(data || []);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleSave = async () => {
    console.log("DEBUG: Bottone SALVA cliccato");

    if (selectedDays.length === 0) {
      toast.error("Seleziona almeno un giorno!");
      return;
    }

    setLoading(true);

    // 1. Generazione del payload
    const payload = selectedDays.flatMap((day) =>
      timeSlots.map((slot) => {
        const [sh, sm] = slot.start.split(":").map(Number);
        const [eh, em] = slot.end.split(":").map(Number);
        
        const s = new Date(day); s.setHours(sh, sm, 0, 0);
        const e = new Date(day); e.setHours(eh, em, 0, 0);
        
        return { 
          start_time: s.toISOString(), 
          end_time: e.toISOString(), 
          is_booked: false 
        };
      })
    );

    // 2. CONTROLLO DUPLICATI
    // Verifichiamo se qualcuno dei nuovi slot esiste già nel database (existingAvailability)
    const duplicates = payload.filter(newSlot => 
      existingAvailability.some(existing => 
        existing.start_time === newSlot.start_time && 
        existing.end_time === newSlot.end_time
      )
    );

    if (duplicates.length > 0) {
      const firstDup = duplicates[0];
      const dupDate = format(parseISO(firstDup.start_time), "dd/MM 'alle' HH:mm", { locale: it });
      toast.error(`Errore: Lo slot del ${dupDate} esiste già nel database!`);
      setLoading(false);
      return; // Blocca l'invio
    }

    // 3. INVIO AL DB (Se non ci sono duplicati)
    console.log("DEBUG: Nessun duplicato trovato. Invio payload:", payload);

    const { error } = await supabase.from("availability").insert(payload).select();

    if (error) {
      console.error("DEBUG: Errore durante l'INSERT:", error);
      toast.error(`Errore DB: ${error.message}`);
      if (error.code === "23505") { // Codice errore per violazione di unicità in PostgreSQL
        setDuplicateError("Slot già esistente");
        }
    } else {
      console.log("DEBUG: Inserimento riuscito!");
      toast.success(`${payload.length} nuovi slot inseriti correttamente`);
      setSelectedDays([]); 
      await fetchAvailability();
    }
    setLoading(false);
  };

  const deleteSlot = async (id: number) => {
    console.log("DEBUG: Tentativo eliminazione slot ID:", id);
    const { error } = await supabase.from("availability").delete().eq("id", id);
    if (error) {
      console.error("DEBUG: Errore cancellazione:", error);
    } else {
      toast.success("Slot rimosso");
      fetchAvailability();
    }
  };

  const isSelected = (day: Date) => {
    return selectedDays.some(selectedDay => 
      format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  const toggleDay = (day: Date) => {
    if (isSelected(day)) {
      setSelectedDays(selectedDays.filter(d => format(d, 'yyyy-MM-dd') !== format(day, 'yyyy-MM-dd')));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-[#E8F4F4] via-white to-[#E8F4F4]">
      <div className="max-w-[1600px] mx-auto p-6 lg:p-10 space-y-8">
        
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b-2 border-[#006B6B]/20">
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-black text-[#006B6B] tracking-tight leading-none">
              FISIOABADIA
            </h1>
            <p className="text-[#4A9B9B] font-bold text-lg uppercase tracking-widest">
              Pannello Amministratore
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-[#4A9B9B]/20">
            <div className="w-3 h-3 rounded-full bg-[#006B6B] animate-pulse" />
            <span className="text-[#006B6B] font-bold text-sm uppercase tracking-wider">
              Sistema Attivo
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Custom Calendar Section */}
          <div className="xl:col-span-7 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-[#006B6B] flex items-center justify-center shadow-lg shadow-[#006B6B]/20">
                <CalendarIcon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#006B6B]">Selezione Giorni</h2>
                <p className="text-[#4A9B9B] font-medium">Clicca per selezionare multipli giorni</p>
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
                    const selected = isSelected(day);
                    const today = isToday(day);
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleDay(day)}
                        className={`
                          relative h-24 lg:h-28 rounded-2xl font-bold text-xl transition-all duration-300 ease-out
                          flex flex-col items-center justify-center gap-1
                          ${selected 
                            ? 'bg-[#006B6B] text-white shadow-lg shadow-[#006B6B]/30 scale-105' 
                            : today
                              ? 'bg-[#7FCFCF]/30 text-[#006B6B] border-2 border-[#006B6B] hover:bg-[#006B6B] hover:text-white'
                              : 'bg-[#E8F4F4] text-[#4A9B9B] hover:bg-[#4A9B9B] hover:text-white hover:shadow-lg hover:shadow-[#4A9B9B]/20 hover:-translate-y-1'
                          }
                        `}
                      >
                        <span className="text-2xl">{format(day, "d")}</span>
                        {selected && (
                          <span className="text-xs font-medium opacity-80">Selezionato</span>
                        )}
                        {today && !selected && (
                          <span className="text-xs font-bold">Oggi</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-[#E8F4F4]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-lg bg-[#E8F4F4] border border-[#4A9B9B]" />
                    <span className="text-sm font-bold text-[#4A9B9B]">Disponibile</span>
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

            {/* Selected Days Preview */}
            {selectedDays.length > 0 && (
              <div className="bg-[#006B6B] text-white p-6 rounded-2xl shadow-xl shadow-[#006B6B]/20 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black text-xl">
                      {selectedDays.length}
                    </div>
                    <span className="font-bold text-lg">Giorni selezionati</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedDays([])}
                    className="text-white/80 hover:text-white hover:bg-white/20"
                  >
                    Azzera
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedDays.sort((a, b) => a.getTime() - b.getTime()).map((day, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm"
                    >
                      {format(day, "dd MMM", { locale: it })}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Control Panel - UNCHANGED */}
          <div className="xl:col-span-5 space-y-6">
            
            <Card className="border-2 border-[#4A9B9B]/20 bg-white shadow-xl shadow-[#006B6B]/5 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#4A9B9B] to-[#006B6B] text-white p-6">
                <div className="flex items-center gap-3">
                  <Clock size={24} className="opacity-80" />
                  <CardTitle className="text-xl font-black uppercase tracking-wide">
                    Configura Orari
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {timeSlots.map((slot, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-3 p-4 bg-[#E8F4F4] rounded-2xl border-2 border-transparent hover:border-[#7FCFCF] transition-all duration-300"
                  >
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs font-bold text-[#006B6B] uppercase tracking-wider ml-1">
                        Inizio
                      </Label>
                      <Input 
                        type="time" 
                        value={slot.start} 
                        onChange={(e) => {
                          const n = [...timeSlots]; 
                          n[index].start = e.target.value; 
                          setTimeSlots(n);
                        }} 
                        className="text-lg font-bold border-2 border-[#006B6B]/20 bg-white focus:border-[#006B6B] focus:ring-2 focus:ring-[#7FCFCF] rounded-xl h-12 transition-all" 
                      />
                    </div>
                    <div className="text-[#4A9B9B] font-black text-2xl pt-6">→</div>
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs font-bold text-[#006B6B] uppercase tracking-wider ml-1">
                        Fine
                      </Label>
                      <Input 
                        type="time" 
                        value={slot.end} 
                        onChange={(e) => {
                          const n = [...timeSlots]; 
                          n[index].end = e.target.value; 
                          setTimeSlots(n);
                        }} 
                        className="text-lg font-bold border-2 border-[#006B6B]/20 bg-white focus:border-[#006B6B] focus:ring-2 focus:ring-[#7FCFCF] rounded-xl h-12 transition-all" 
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setTimeSlots(timeSlots.filter((_, i) => i !== index))}
                      className="mt-6 hover:bg-red-50 hover:text-red-600 rounded-xl h-12 w-12 transition-colors"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                ))}
                
                <Button 
                  onClick={() => setTimeSlots([...timeSlots, { start: "09:00", end: "10:00" }])} 
                  variant="outline" 
                  className="w-full border-2 border-dashed border-[#4A9B9B] text-[#006B6B] hover:bg-[#E8F4F4] hover:border-[#006B6B] font-bold py-6 rounded-xl transition-all duration-300 group"
                >
                  <Plus className="mr-2 group-hover:rotate-90 transition-transform" size={20} />
                  Aggiungi Fascia Oraria
                </Button>

                <Button 
                  onClick={handleSave} 
                  disabled={loading || selectedDays.length === 0} 
                  className="w-full bg-[#006B6B] hover:bg-[#4A9B9B] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-black h-16 rounded-2xl shadow-xl shadow-[#006B6B]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-4"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={24} />
                  ) : (
                    <Plus className="mr-2" size={24} />
                  )}
                  {loading ? "Caricamento..." : `Salva ${selectedDays.length > 0 ? selectedDays.length * timeSlots.length : ''} Slot`}
                </Button>
                {duplicateError && (
                  <div className="mt-4 p-4 rounded-xl bg-red-100 text-red-700 text-sm">
                    {duplicateError}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-2 border-[#006B6B]/10 bg-white shadow-xl shadow-[#006B6B]/5 rounded-3xl overflow-hidden flex flex-col max-h-[600px]">
              <CardHeader className="bg-[#E8F4F4] p-6 border-b border-[#006B6B]/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#006B6B] flex items-center justify-center">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-black text-[#006B6B] uppercase tracking-wide">
                        Slot Esistenti
                      </CardTitle>
                      <p className="text-sm text-[#4A9B9B] font-medium">
                        {existingAvailability.length} disponibilità attive
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto flex-1 custom-scrollbar">
                {existingAvailability.length === 0 ? (
                  <div className="p-12 text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F4F4] flex items-center justify-center">
                      <CalendarIcon className="text-[#4A9B9B]" size={32} />
                    </div>
                    <p className="text-[#4A9B9B] font-medium">Nessuno slot programmato</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#E8F4F4]">
                    {existingAvailability.map((slot) => (
                      <div 
                        key={slot.id} 
                        className="group flex items-center justify-between p-5 hover:bg-[#F0FAFA] transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-12 rounded-full ${slot.is_booked ? 'bg-red-400' : 'bg-[#7FCFCF]'} shadow-inner`} />
                          <div>
                            <span className="font-black text-[#006B6B] text-lg block">
                              {format(parseISO(slot.start_time), "EEEE dd MMMM", { locale: it })}
                            </span>
                            <span className="font-bold text-[#4A9B9B] text-sm flex items-center gap-2">
                              <Clock size={14} />
                              {format(parseISO(slot.start_time), "HH:mm")} - {format(parseISO(slot.end_time), "HH:mm")}
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteSlot(slot.id)} 
                          className="opacity-0 group-hover:opacity-100 hover:bg-red-50 text-red-500 rounded-xl transition-all duration-200 h-12 w-12"
                        >
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}