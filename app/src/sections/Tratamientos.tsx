const Treatments = () => {
  const treatments = [
    'Dolore alla schiena: cervicalgie, dorsalgie, lombalgie, contratture muscolari, ernie discali, scoliosi, torcicollo e altri.',
    'Lesioni sportive: distorsioni, pubalgie, lussazioni, problemi discali, tendiniti, epicondiliti, ecc.',
    'Trattamento del dolore al ginocchio, tendiniti, tendinite del tensore della fascia lata, condromalacia rotulea, borsiti e lesioni dei legamenti e del menisco.',
    'Traumatismi: incidenti stradali, colpo di frusta cervicale, cadute, ecc.',
    'Mal di testa, emicranie, cefalee, fibromialgia e dolore generalizzato.',
    'Artrite reumatoide.',
    'Vertigini, capogiri e acufeni.',
    'Dolori post-chirurgici e cicatrici.',
    'Gravidanza: pre e post parto.',
    'Patologie temporo-mandibolari, dolore e bruxismo.',
  ];

  return (
    <section className="py-16 md:py-24 bg-[#bee9e8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1 group">
            <img
              src="/tratamientos-massage.jpg"
              alt="Tratamientos"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#1b4965]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Decorative corners - Blue palette */}
            <div className="absolute bottom-0 left-0 w-1 h-32 bg-[#5fa8d3]" />
            <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#5fa8d3]" />
            {/* Additional top-right corner accent */}
            <div className="absolute top-0 right-0 w-1 h-24 bg-[#62b6cb]" />
            <div className="absolute top-0 right-0 w-24 h-1 bg-[#62b6cb]" />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b4965] mb-6">
              TRATTAMENTI
            </h2>
            <p className="text-sm text-[#1b4965]/70 mb-6 font-medium uppercase tracking-wider">
              Ti offriamo trattamenti di:
            </p>
            <ul className="space-y-4">
              {treatments.map((treatment, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-[#1b4965]/80 hover:text-[#5fa8d3] transition-colors duration-300"
                >
                  <span className="text-[#62b6cb] mr-3 mt-1 text-lg">•</span>
                  <span className="leading-relaxed">{treatment}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA accent */}
            <div className="mt-8 pt-6 border-t border-[#bee9e8]">
              <p className="text-[#5fa8d3] font-medium text-sm">
                Protocolli personalizzati per ogni esigenza
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treatments;