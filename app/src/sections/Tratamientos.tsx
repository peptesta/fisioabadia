const Treatments = () => {
  const treatments = [
    'Riabilitazione Neurologica: trattamento di esiti di Ictus, Sclerosi Multipla, Parkinson e patologie del Sistema Nervoso Centrale.',
    'Patologie del Sistema Nervoso Periferico: gestione di neuropatie, compressioni nervose e recupero della sensibilità/motilità.',
    'Valutazione Neurologica Funzionale: analisi approfondita del tono muscolare, dei riflessi e della coordinazione motoria.',
    'Fisioterapia Funzionale: percorsi personalizzati per il ripristino delle attività della vita quotidiana e dell\'autonomia.',
    'Riabilitazione delle Neuropatie: trattamento del dolore neuropatico e delle radicolopatie (sciatalgie, cruralgie, cervicobrachialgie).',
    'Disturbi dell\'Equilibrio e del Cammino: rieducazione propriocettiva, gestione di vertigini e instabilità posturale.',
    'Dolore Cronico e Sindromi Complesse: approccio integrato per fibromialgia, cefalee muscolo-tensive e dolore generalizzato.',
    'Trattamento Post-Chirurgico Neurologico e Ortopedico: protocolli di recupero funzionale e gestione delle cicatrici.',
    'Fisioterapia Muscolo-Scheletrica: gestione di cervicalgie, lombalgie, ernie discali e contratture muscolari.',
    'Prevenzione e Performance: programmi di esercizio terapeutico per il mantenimento del benessere del sistema nervoso e muscolare.',
  ];

  return (
    <section className="py-16 md:py-24 bg-[#E8F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1 group">
            <img
              src="/tratamientos-massage.jpg" // Assicurati che l'immagine sia coerente con il nuovo focus
              alt="Trattamenti di Fisioterapia Neurologica"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#006B6B]/15 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Decorative corners - Teal palette */}
            <div className="absolute bottom-0 left-0 w-1 h-32 bg-[#4A9B9B]" />
            <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#4A9B9B]" />
            <div className="absolute top-0 right-0 w-1 h-24 bg-[#7FCFCF]" />
            <div className="absolute top-0 right-0 w-24 h-1 bg-[#7FCFCF]" />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006B6B] mb-6 uppercase">
              I Miei Trattamenti
            </h2>
            <p className="text-sm text-[#006B6B]/70 mb-6 font-medium uppercase tracking-wider">
              Specializzati in Fisioterapia Neurologica e Funzionale:
            </p>
            <ul className="space-y-4">
              {treatments.map((treatment, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-[#006B6B]/80 hover:text-[#4A9B9B] transition-colors duration-300"
                >
                  <span className="text-[#4A9B9B] mr-3 mt-1 text-lg">•</span>
                  <span className="leading-relaxed">{treatment}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA accent */}
            <div className="mt-8 pt-6 border-t border-[#7FCFCF]/50">
              <p className="text-[#4A9B9B] font-medium text-sm italic">
                Piani terapeutici basati su una valutazione neurologica accurata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treatments;