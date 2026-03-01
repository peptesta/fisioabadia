import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'QUANTE SEDUTE DI FISIOTERAPIA SARANNO NECESSARIE?',
      answer:
        'Il numero di sedute dipende dalla problematica e dalla sua evoluzione. Dopo la prima valutazione, ti indicherò il percorso terapeutico più adatto al tuo caso.',
    },
    {
      question: 'CERCO UNA FISIOTERAPISTA SPECIALIZZATO A NAPOLI',
      answer:
        'Fisio Abadia offre un servizio di fisioterapia personalizzato, con esperienza in ambito muscoloscheletrico, sportivo, neurologico, pavimento pelvico e riabilitazione funzionale.',
    },
    {
      question: 'LO STUDIO LAVORA CON ASSICURAZIONI O MUTUE?',
      answer:
        'Collaboro con alcune assicurazioni sanitarie. Ti consiglio di contattarmi direttamente per verificare se la tua polizza è convenzionata.',
    },
    {
      question: 'QUANTO DURA UNA SEDUTA DI FISIOTERAPIA?',
      answer:
        'Le sedute di fisioterapia hanno una durata indicativa di circa 60 minuti, che può variare in base al tipo di trattamento necessario.',
    },
    {
      question: 'HO ESAMI MEDICI. DEVO PORTARLI?',
      answer:
        'Sì, è consigliato portare eventuali esami o referti medici (risonanze magnetiche, radiografie, ecografie, referti specialistici) per una valutazione più completa.',
    },
    {
      question: 'SONO IN GRAVIDANZA. POSSO FARE FISIOTERAPIA?',
      answer:
        'Sì, la fisioterapia in gravidanza può essere molto utile. Mi occupo di pavimento pelvico e fisioterapia ostetrica per alleviare dolori lombari, sciatalgie e preparare il corpo al parto in modo sicuro.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#006B6B] text-center mb-12">
          DOMANDE
          <br />
          <span className="text-[#4A9B9B]">FREQUENTI</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="bg-[#E8F4F4] rounded-lg border border-[#7FCFCF]/50 overflow-hidden"
            >
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger className="px-4 py-4 text-left text-sm font-semibold text-[#006B6B] hover:no-underline hover:bg-[#7FCFCF]/20 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-sm text-[#006B6B]/80 leading-relaxed bg-white/50">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;