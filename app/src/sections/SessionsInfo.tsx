import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SessionsInfo = () => {
  const features = [
    {
      title: 'SPECIALIZZAZIONE NEUROLOGICA',
      subtitle: 'SISTEMA NERVOSO',
      description:
        'Trattamento mirato per esiti di Ictus, Parkinson, Sclerosi Multipla e patologie del sistema nervoso centrale e periferico.',
      bgColor: 'bg-[#006B6B]', // Dark Teal
      textColor: 'text-white',
      buttonClass: 'border-white text-white hover:bg-white/20',
    },
    {
      title: 'COMODITÀ A DOMICILIO',
      subtitle: 'RIABILITAZIONE DOVE SEI TU',
      description:
        'Porto la terapia direttamente a casa tua a Napoli, eliminando lo stress del trasporto e lavorando nel tuo ambiente quotidiano.',
      bgColor: 'bg-[#4A9B9B]', // Medium Teal
      textColor: 'text-white',
      buttonClass: 'border-white text-white hover:bg-white/20',
    },
    {
      title: 'VALUTAZIONE FUNZIONALE',
      subtitle: 'PIANO PERSONALIZZATO',
      description:
        'Eseguo un\'accurata valutazione neurologica e motoria per definire obiettivi concreti di autonomia e recupero.',
      bgColor: 'bg-[#E8F4F4]', // Very Light Teal
      textColor: 'text-[#006B6B]',
      buttonClass: 'bg-[#006B6B] hover:bg-[#4A9B9B] text-white shadow-md',
    },
    {
      title: 'AUTONOMIA E CAMMINO',
      subtitle: 'TORNA A MUOVERTI',
      description:
        'Lavoro sul ripristino del cammino, dell\'equilibrio e della coordinazione per migliorare la qualità della tua vita ogni giorno.',
      bgColor: 'bg-[#7FCFCF]', // Light Teal/Cyan
      textColor: 'text-[#006B6B]',
      buttonClass: 'bg-[#006B6B] hover:bg-[#4A9B9B] text-white shadow-md',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="max-w-4xl mx-auto text-center mb-12 border-2 border-[#7FCFCF] p-8 rounded-lg bg-[#E8F4F4]/50">
          <h2 className="text-xl md:text-2xl font-semibold text-[#006B6B] mb-4 uppercase">
            Fisioterapia e Riabilitazione Neurologica a Domicilio a Napoli
          </h2>
          <p className="text-sm text-[#006B6B]/70 leading-relaxed mb-6">
            Offro un servizio di <strong>fisioterapia neurologica direttamente presso il tuo domicilio</strong> a Napoli. 
            Il mio approccio è dedicato a chi necessita di un percorso riabilitativo specialistico per patologie del sistema nervoso, 
            svolto nel comfort e nella sicurezza della propria casa. 
            Durante il primo incontro domiciliare, effettuo una <strong>valutazione neurologica completa</strong> per analizzare 
            le capacità motorie e sensitive. Lavoriamo insieme non solo sui sintomi, ma sul recupero funzionale e sull'autonomia 
            nello spazio domestico, utilizzando tecniche manuali e protocolli di esercizio terapeutico personalizzati.
          </p>
          <Button
            variant="default"
            className="bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-xs tracking-widest px-6 py-2 rounded-md shadow-lg shadow-[#006B6B]/30 transition-all hover:shadow-xl hover:shadow-[#006B6B]/40"
          >
            PRENOTA UNA VISITA A DOMICILIO
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} ${feature.textColor} p-6 rounded-lg min-h-[280px] flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <h3 className="text-lg font-bold mb-2 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xs font-medium mb-3 opacity-90">
                {feature.subtitle}
              </p>
              <p className="text-sm opacity-80 flex-grow leading-relaxed">
                {feature.description}
              </p>
              <Button
                variant="outline"
                className={`mt-4 text-xs tracking-widest rounded-md ${feature.buttonClass}`}
              >
                MAGGIORI INFO
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SessionsInfo;