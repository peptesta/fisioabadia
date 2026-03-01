import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { parseISO, addMinutes } from "date-fns";
import { Loader2, ShieldAlert, Terminal, RefreshCcw } from "lucide-react";

export default function SpamTestSuite() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  const runSpamTest = async () => {
    setIsRunning(true);
    setLogs([]);
    addLog("🚀 AVVIO TEST DI STRESS ANTI-SPAM...");

    // 1. Verifica Utente
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      addLog("❌ ERRORE: Nessun utente loggato.");
      setIsRunning(false);
      return;
    }

    // 2. Reset iniziale del profilo (per pulire i test precedenti)
    addLog("🧹 Resetting contatori profilo...");
    await supabase.from("profiles").update({ request_count: 0, last_request_timestamp: null }).eq("id", user.id);

    // 3. Ciclo di simulazione (4 tentativi)
    for (let i = 1; i <= 4; i++) {
      addLog(`--- TENTATIVO ${i} ---`);

      // Recupero forzato dei dati aggiornati dal DB
      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("request_count, last_request_timestamp")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        addLog(`❌ Errore fetch: ${fetchError.message}`);
        break;
      }

      const currentCount = profile.request_count || 0;
      const lastTimestamp = profile.last_request_timestamp;

      // Logica di blocco (la stessa che abbiamo nel componente BookingCalendar)
      if (currentCount >= 3) {
        if (lastTimestamp) {
          const cooldownEnd = addMinutes(parseISO(lastTimestamp), 15);
          if (new Date() < cooldownEnd) {
            addLog(`✅ BLOCCO RIUSCITO! Il sistema ha negato l'invio ${i}.`);
            addLog(`📊 STATO FINALE: Conteggio=${currentCount}, Blocco attivo fino a ${cooldownEnd.toLocaleTimeString()}`);
            toast.success("Test superato: Spam bloccato!");
            setIsRunning(false);
            return; 
          }
        }
      }

      // Simulazione di invio riuscito: Incremento contatore e timestamp
      addLog(`Inviando richiesta ${i}...`);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ 
          request_count: currentCount + 1, 
          last_request_timestamp: new Date().toISOString() 
        })
        .eq("id", user.id);

      if (updateError) {
        addLog(`❌ Errore Update: ${updateError.message}`);
      } else {
        addLog(`⚠️ Richiesta ${i} accettata. DB Aggiornato: count = ${currentCount + 1}`);
      }

      // Piccola pausa per simulare latenza di rete
      await new Promise(res => setTimeout(res, 800));
    }

    addLog("⚠️ TEST CONCLUSO: Se non hai visto il messaggio di BLOCCO, qualcosa non va.");
    setIsRunning(false);
  };

  return (
    <div className="p-6 bg-[#E8F4F4] min-h-screen flex items-center justify-center font-sans">
      <Card className="w-full max-w-2xl border-[10px] border-[#006B6B] rounded-none shadow-2xl bg-white">
        <CardHeader className="bg-[#006B6B] text-white p-6">
          <CardTitle className="text-3xl font-black uppercase italic flex items-center gap-4">
            <ShieldAlert size={36} /> Spam Test Suite XL
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="bg-yellow-50 border-4 border-yellow-400 p-4 text-yellow-800 font-bold text-sm">
            ATTENZIONE: Questo test caricherà 3 slot finti sul tuo profilo per verificare se il 4° viene bloccato.
          </div>

          <Button 
            onClick={runSpamTest} 
            disabled={isRunning}
            className="w-full bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-2xl font-black py-10 rounded-none shadow-xl transition-all active:scale-95"
          >
            {isRunning ? (
              <> <Loader2 className="animate-spin mr-3" size={32} /> ESECUZIONE... </>
            ) : (
              "AVVIA ATTACCO SIMULATO"
            )}
          </Button>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#006B6B] font-black uppercase text-sm">
              <Terminal size={18} /> Console di Debug
            </div>
            <div className="bg-black text-green-400 p-6 font-mono text-sm h-80 overflow-y-auto border-4 border-gray-800 shadow-inner custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className="mb-1 border-b border-green-900/30 pb-1">
                  {log}
                </div>
              ))}
              {logs.length === 0 && <div className="opacity-50 italic">In attesa di istruzioni...</div>}
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={() => setLogs([])}
            className="w-full border-4 border-[#4A9B9B] text-[#006B6B] font-black uppercase"
          >
            <RefreshCcw className="mr-2" size={18} /> Pulisci Console
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}