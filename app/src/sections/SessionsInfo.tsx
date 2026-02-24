import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SessionsInfo = () => {
  const features = [
    {
      title: 'MULTIDISCIPLINARE',
      subtitle: 'SPECIALISTI IN',
      description:
        'Apparato locomotore, neurologico, sportivo, ginecologico, pediatrico e geriatrico.',
      bgColor: 'bg-[#1b4965]', // Yale Blue - deep and sophisticated
      textColor: 'text-white',
      buttonVariant: 'outline' as const,
    },
    {
      title: 'DOLORE ALLA SCHIENA E INFORTUNI',
      subtitle: 'Trattamento completo del dolore e prevenzione.',
      description:
        'Cerchiamo la soluzione alle patologie e alla causa che provoca il dolore.',
      bgColor: 'bg-[#5fa8d3]', // Fresh Sky - vivid and optimistic
      textColor: 'text-white',
      buttonVariant: 'outline' as const,
    },
    {
      title: 'RIABILITAZIONE E PREVENZIONE',
      subtitle:
        'Dopo aver trattato il dolore, la prevenzione è altrettanto importante.',
      description:
        'Ti insegneremo esercizi specifici per evitare che il dolore ritorni.',
      bgColor: 'bg-[#cae9ff]', // Pale Sky - soft and airy
      textColor: 'text-[#1b4965]',
      buttonVariant: 'default' as const,
    },
    {
      title: 'ALLENATI BENE',
      subtitle: 'TORNA A MUOVERTI',
      description:
        'Stai uscendo da un infortunio e vuoi tornare a muoverti, non solo recuperare la mobilità. Il Pilates con macchinari è una tecnica sicura ed efficace.',
      bgColor: 'bg-[#62b6cb]', // Pacific Blue - bright and invigorating
      textColor: 'text-white',
      buttonVariant: 'outline' as const,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="max-w-4xl mx-auto text-center mb-12 border-2 border-[#bee9e8] p-8 rounded-lg bg-[#cae9ff]/10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1b4965] mb-4">
            COME SONO LE MIE SEDUTE DI FISIOTERAPIA A NAPOLI?
          </h2>
          <p className="text-sm text-[#1b4965]/70 leading-relaxed mb-6">
            Offro un servizio di fisioterapia a Napoli altamente specializzato, mettendo al centro la tua salute e il tuo benessere. 
            Il mio obiettivo è aiutarti a ridurre il dolore e risolvere la problematica alla sua origine, non solo i sintomi.
            Durante il primo incontro ascolto la tua storia clinica e valuto con attenzione la tua situazione attraverso un'accurata 
            valutazione ed esplorazione fisica. In questo modo posso individuare le cause del problema e costruire un piano di trattamento personalizzato.
            Nel percorso terapeutico utilizzo diverse tecniche, scelte in base alle tue esigenze e alla patologia, dagli approcci manuali 
            e articolari fino a tecniche più delicate come quelle craniali.
          </p>
          <Button
            variant="default"
            className="bg-[#5fa8d3] hover:bg-[#62b6cb] text-white text-xs tracking-widest px-6 py-2 rounded-md shadow-lg shadow-[#5fa8d3]/30 transition-all hover:shadow-xl hover:shadow-[#5fa8d3]/40"
          >
            MI INTERESSA!
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
                variant={feature.buttonVariant}
                className={`mt-4 text-xs tracking-widest rounded-md ${
                  feature.buttonVariant === 'outline'
                    ? 'border-white text-white hover:bg-white/20'
                    : 'bg-[#5fa8d3] hover:bg-[#62b6cb] text-white shadow-md'
                }`}
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