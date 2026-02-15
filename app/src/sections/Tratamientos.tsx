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
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src="/tratamientos-massage.jpg"
              alt="Tratamientos"
              className="w-full h-auto rounded-sm shadow-lg"
            />
            <div className="absolute bottom-0 left-0 w-1 h-32 bg-[#C9A962]" />
            <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#C9A962]" />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              TRATTAMENTI
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Ti offiramo trattamenti di:
            </p>
            <ul className="space-y-3">
              {treatments.map((treatment, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-gray-700"
                >
                  <span className="text-[#C9A962] mr-3 mt-1">•</span>
                  <span>{treatment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treatments;
