import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { format, parseISO, isAfter } from "date-fns";
import { it } from "date-fns/locale";
import { 
  Clock, CalendarCheck, History, Edit3, Save, X, 
  ChevronDown, AlertCircle, Loader2, Upload, Trash2, FileText 
} from "lucide-react";

export default function UserDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const [openSections, setOpenSections] = useState({
    confirmed: true,
    pending: true,
    history: false
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [tempNote, setTempNote] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFilePreview, setNewFilePreview] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data, error } = await supabase
        .from("appointments")
        .select(`*, availability (start_time, end_time)`)
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setAppointments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFullUpdate = async () => {
    if (!selectedApp) return;
    setUpdating(true);
    let finalFileUrl = selectedApp.document_url;

    try {
      if (newFile) {
        const fileName = `${selectedApp.client_id}/${Date.now()}_${newFile.name}`;
        const { data, error: uploadError } = await supabase.storage
          .from("appointment-documents")
          .upload(fileName, newFile);

        if (uploadError) throw uploadError;
        finalFileUrl = data.path;

        if (selectedApp.document_url) {
          await supabase.storage.from("appointment-documents").remove([selectedApp.document_url]);
        }
      }

      const { error: dbError } = await supabase
        .from("appointments")
        .update({ notes: tempNote, document_url: finalFileUrl })
        .eq("id", selectedApp.id);

      if (dbError) throw dbError;

      toast.success("Richiesta aggiornata!");
      setIsEditModalOpen(false);
      setNewFile(null);
      setNewFilePreview(null);
      fetchData();
    } catch (err: any) {
      toast.error("Errore: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedApp || !window.confirm("Sei sicuro di voler eliminare questa richiesta? L'azione è irreversibile.")) return;
    
    setUpdating(true);
    try {
      if (selectedApp.document_url) {
        await supabase.storage.from("appointment-documents").remove([selectedApp.document_url]);
      }

      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", selectedApp.id);

      if (error) throw error;

      toast.success("Prenotazione eliminata correttamente.");
      setIsEditModalOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error("Errore durante l'eliminazione");
    } finally {
      setUpdating(false);
    }
  };

  const now = new Date();
  const pending = appointments.filter(a => a.status === 'pending' && isAfter(parseISO(a.availability.start_time), now));
  const confirmed = appointments.filter(a => a.status === 'confirmed' && isAfter(parseISO(a.availability.start_time), now));
  const history = appointments.filter(a => !isAfter(parseISO(a.availability.start_time), now) || a.status === 'rejected');

  if (loading) return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-[#E8F4F4] via-white to-[#E8F4F4] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-[#006B6B]" size={64} />
        <p className="text-[#4A9B9B] font-bold uppercase tracking-wider">Caricamento...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F4] via-white to-[#E8F4F4]">
      <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-10">
        
        {/* Header */}
        <header className="pb-8 border-b-2 border-[#006B6B]/20">
          <h1 className="text-5xl lg:text-6xl font-black text-[#006B6B] tracking-tight leading-none">
            Area Paziente
          </h1>
          <p className="text-xl font-bold text-[#4A9B9B] mt-2 uppercase tracking-widest">
            Gestisci le tue prenotazioni
          </p>
        </header>

        {/* 1. Confermati */}
        <div className="space-y-4">
          <button 
            onClick={() => toggleSection('confirmed')} 
            className="w-full flex justify-between items-center bg-gradient-to-r from-[#006B6B] to-[#4A9B9B] p-6 text-white rounded-2xl shadow-lg shadow-[#006B6B]/20 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <CalendarCheck size={24} />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black uppercase block">Confermati</span>
                <span className="text-sm font-bold opacity-80">{confirmed.length} appuntamenti</span>
              </div>
            </div>
            <div className={`transform transition-transform duration-300 ${openSections.confirmed ? 'rotate-180' : ''}`}>
              <ChevronDown size={32} />
            </div>
          </button>
          
          {openSections.confirmed && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              {confirmed.length === 0 ? (
                <div className="p-12 bg-white rounded-2xl border-2 border-dashed border-[#4A9B9B]/30 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F4F4] flex items-center justify-center mb-4">
                    <CalendarCheck className="text-[#4A9B9B]" size={32} />
                  </div>
                  <p className="text-[#4A9B9B] font-bold">Nessun appuntamento confermato</p>
                </div>
              ) : (
                confirmed.map(app => (
                  <Card 
                    key={app.id} 
                    className="border-2 border-[#006B6B]/20 bg-white p-6 rounded-2xl shadow-lg shadow-[#006B6B]/5 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-2xl font-black text-[#006B6B] uppercase">
                          {format(parseISO(app.availability.start_time), "EEEE dd MMMM", { locale: it })}
                        </p>
                        <p className="text-lg font-bold text-[#4A9B9B]">
                          {format(parseISO(app.availability.start_time), "HH:mm")} - {format(parseISO(app.availability.end_time), "HH:mm")}
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full font-black text-sm uppercase flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Confermato
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>

        {/* 2. In Attesa */}
        <div className="space-y-4">
          <button 
            onClick={() => toggleSection('pending')} 
            className="w-full flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white rounded-2xl shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black uppercase block">In Attesa</span>
                <span className="text-sm font-bold opacity-80">{pending.length} richieste</span>
              </div>
            </div>
            <div className={`transform transition-transform duration-300 ${openSections.pending ? 'rotate-180' : ''}`}>
              <ChevronDown size={32} />
            </div>
          </button>
          
          {openSections.pending && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              {pending.length === 0 ? (
                <div className="p-12 bg-white rounded-2xl border-2 border-dashed border-orange-200 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-orange-50 flex items-center justify-center mb-4">
                    <Clock className="text-orange-400" size={32} />
                  </div>
                  <p className="text-orange-400 font-bold">Nessuna richiesta in attesa</p>
                </div>
              ) : (
                pending.map(app => (
                  <Card 
                    key={app.id} 
                    onClick={() => { setSelectedApp(app); setTempNote(app.notes || ""); setIsEditModalOpen(true); }}
                    className="border-2 border-orange-200 bg-white p-6 rounded-2xl shadow-lg shadow-orange-500/5 cursor-pointer hover:shadow-xl hover:border-orange-300 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <p className="text-2xl font-black text-orange-600 uppercase">
                          {format(parseISO(app.availability.start_time), "EEEE dd MMMM", { locale: it })}
                        </p>
                        <p className="text-lg font-bold text-orange-400">
                          {format(parseISO(app.availability.start_time), "HH:mm")} - {format(parseISO(app.availability.end_time), "HH:mm")}
                        </p>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <Edit3 size={14} />
                          Clicca per modificare o annullare
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <AlertCircle size={24} className="text-orange-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>

        {/* 3. Storico */}
        <div className="space-y-4">
          <button 
            onClick={() => toggleSection('history')} 
            className="w-full flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-800 p-6 text-white rounded-2xl shadow-lg shadow-gray-700/20 transition-all hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <History size={24} />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black uppercase block">Storico</span>
                <span className="text-sm font-bold opacity-80">{history.length} visite passate</span>
              </div>
            </div>
            <div className={`transform transition-transform duration-300 ${openSections.history ? 'rotate-180' : ''}`}>
              <ChevronDown size={32} />
            </div>
          </button>
          
          {openSections.history && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              {history.length === 0 ? (
                <div className="p-12 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <History className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-400 font-bold">Nessuno storico disponibile</p>
                </div>
              ) : (
                history.map(app => (
                  <div 
                    key={app.id} 
                    className="p-6 bg-white border-2 border-gray-200 rounded-2xl flex justify-between items-center hover:border-gray-300 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-xl font-black text-gray-700 uppercase">
                        {format(parseISO(app.availability.start_time), "EEEE dd MMMM yyyy", { locale: it })}
                      </p>
                      <p className="text-sm font-bold text-gray-400">
                        {format(parseISO(app.availability.start_time), "HH:mm")} - {format(parseISO(app.availability.end_time), "HH:mm")}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold text-sm uppercase ${
                      app.status === 'confirmed' 
                        ? 'bg-[#006B6B]/10 text-[#006B6B]' 
                        : app.status === 'rejected'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {app.status === 'confirmed' ? 'Completata' : app.status === 'rejected' ? 'Rifiutata' : 'Passata'}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Edit */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl border-none rounded-3xl bg-white p-0 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Edit3 size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight">Modifica Richiesta</h3>
                <p className="text-sm font-bold opacity-80">Aggiorna le note o l'allegato</p>
              </div>
            </div>
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-orange-600 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} />
                Note Cliniche
              </label>
              <Textarea 
                value={tempNote} 
                onChange={(e) => setTempNote(e.target.value)}
                className="w-full min-h-[200px] border-2 border-orange-200 rounded-2xl font-medium text-lg p-6 bg-orange-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                placeholder="Inserisci qui le tue note..."
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-xs font-black text-orange-600 uppercase tracking-wider flex items-center gap-2">
                <Upload size={16} />
                Sostituisci Documentazione
              </label>
              <div className="relative border-2 border-dashed border-orange-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] bg-orange-50/30 hover:bg-orange-50 transition-colors group cursor-pointer overflow-hidden">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { setNewFile(f); setNewFilePreview(URL.createObjectURL(f)); }
                  }} 
                />
                {newFilePreview ? (
                  <div className="relative">
                    <img src={newFilePreview} className="w-32 h-32 object-cover rounded-xl border-4 border-orange-500 shadow-lg" alt="preview" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setNewFile(null); setNewFilePreview(null); }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : selectedApp?.document_url ? (
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-orange-100 flex items-center justify-center">
                      <FileText size={32} className="text-orange-500" />
                    </div>
                    <p className="text-sm font-bold text-orange-600">Documento presente</p>
                    <p className="text-xs text-gray-400">Clicca per sostituire</p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload size={32} className="text-orange-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-400 group-hover:text-orange-500 transition-colors">Carica nuovo file</p>
                    <p className="text-xs text-gray-300">PDF, JPG o PNG</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row gap-4">
            <Button 
              onClick={handleFullUpdate} 
              disabled={updating} 
              className="flex-1 bg-[#006B6B] hover:bg-[#4A9B9B] text-white font-black text-xl py-6 rounded-2xl shadow-lg shadow-[#006B6B]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {updating ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save className="mr-2" size={20} />}
              Salva Modifiche
            </Button>
            <Button 
              onClick={handleDelete} 
              disabled={updating} 
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black text-xl py-6 rounded-2xl shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Trash2 className="mr-2" size={20} />
              Elimina Richiesta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}