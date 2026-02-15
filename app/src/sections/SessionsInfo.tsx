import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SessionsInfo = () => {
  const features = [
    {
      title: 'MULTIDISCIPLINARE',
      subtitle: 'SPECIALISTI IN',
      description:
        'Apparato locomotore, neurologico, sportivo, ginecologico, pediatrico e geriatrico.',
      bgColor: 'bg-[#4A4A4A]',
      textColor: 'text-white',
      buttonVariant: 'outline' as const,
    },
    {
      title: 'DOLORE ALLA SCHIENA E INFORTUNI',
      subtitle: 'Trattamento completo del dolore e prevenzione.',
      description:
        'Cerchiamo la soluzione alle patologie e alla causa che provoca il dolore.',
      bgColor: 'bg-[#C9A962]',
      textColor: 'text-white',
      buttonVariant: 'outline' as const,
    },
    {
      title: 'RIABILITAZIONE E PREVENZIONE',
      subtitle:
        'Dopo aver trattato il dolore, la prevenzione è altrettanto importante.',
      description:
        'Ti insegneremo esercizi specifici per evitare che il dolore ritorni.',
      bgColor: 'bg-[#F0F0F0]',
      textColor: 'text-gray-800',
      buttonVariant: 'default' as const,
    },
    {
      title: 'ALLENATI BENE',
      subtitle: 'TORNA A MUOVERTI',
      description:
        'Stai uscendo da un infortunio e vuoi tornare a muoverti, non solo recuperare la mobilità. Il Pilates con macchinari è una tecnica sicura ed efficace.',
      bgColor: 'bg-[#C9A962]',
      textColor: 'text-white',
      buttonVariant: 'outline' as const,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Text */}
        <div className="max-w-4xl mx-auto text-center mb-12 border border-[#C9A962] p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            COME SONO LE MIE SEDUTE DI FISIOTERAPIA A NAPOLI?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Offro un servizio di fisioterapia a Napoli altamente specializzato, mettendo al centro la tua salute e il tuo benessere. 
            Il mio obiettivo è aiutarti a ridurre il dolore e risolvere la problematica alla sua origine, non solo i sintomi.
            Durante il primo incontro ascolto la tua storia clinica e valuto con attenzione la tua situazione attraverso un’accurata 
            valutazione ed esplorazione fisica. In questo modo posso individuare le cause del problema e costruire un piano di trattamento personalizzato.
            Nel percorso terapeutico utilizzo diverse tecniche, scelte in base alle tue esigenze e alla patologia, dagli approcci manuali 
            e articolari fino a tecniche più delicate come quelle craniali.
          </p>
          <Button
            variant="default"
            className="bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest px-6 py-2 rounded-sm"
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
              className={`${feature.bgColor} ${feature.textColor} p-6 rounded-sm min-h-[280px] flex flex-col`}
            >
              <h3 className="text-lg font-bold mb-2 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xs font-medium mb-3 opacity-90">
                {feature.subtitle}
              </p>
              <p className="text-sm opacity-80 flex-grow">
                {feature.description}
              </p>
              <Button
                variant={feature.buttonVariant}
                className={`mt-4 text-xs tracking-widest rounded-sm ${
                  feature.buttonVariant === 'outline'
                    ? 'border-white text-black hover:bg-white/10'
                    : 'bg-[#C9A962] hover:bg-[#B8994F] text-white'
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
