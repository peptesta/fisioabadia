const AboutPhysio = () => {
  return (
    <section className="py-16 md:py-24 bg-[#E8F4F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#006B6B] text-center mb-16 uppercase">
          LA FISIOTERAPIA
          <br />
          <span className="text-[#4A9B9B]">NEUROLOGICA A DOMICILIO</span>
        </h2>

        {/* Section 1 - Cos'è */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-lg font-semibold text-[#006B6B] mb-4 border-l-4 border-[#4A9B9B] pl-4">
              1. COS'È LA FISIOTERAPIA NEUROLOGICA
            </h3>
            <p className="text-sm text-[#006B6B]/80 leading-relaxed">
              La fisioterapia neurologica è una branca specializzata che si occupa del recupero funzionale di persone con lesioni del sistema nervoso centrale o periferico. A differenza della fisioterapia classica, si concentra sulla <strong>neuroplasticità</strong>: la capacità del cervello di riorganizzarsi per recuperare funzioni motorie perdute. Il trattamento a domicilio permette di lavorare direttamente nel contesto di vita del paziente, rendendo ogni esercizio più concreto, immediato ed efficace per il ritorno all'autonomia.
            </p>
          </div>
          <div className="relative group">
            <img
              src="/neck-massage.jpg"
              alt="Valutazione Neurologica"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#006B6B]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 right-0 w-1 h-24 bg-[#4A9B9B]" />
            <div className="absolute bottom-0 right-0 w-24 h-1 bg-[#4A9B9B]" />
          </div>
        </div>

        {/* Section 2 - Obiettivi */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative order-2 lg:order-1 group">
            <img
              src="/balance-exercise.jpg"
              alt="Esercizi di equilibrio e cammino"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#006B6B]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 w-1 h-24 bg-[#4A9B9B]" />
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#4A9B9B]" />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-lg font-semibold text-[#006B6B] mb-4 border-l-4 border-[#4A9B9B] pl-4">
              2. OBIETTIVI DEL PERCORSO
            </h3>
            <p className="text-sm text-[#006B6B]/80 leading-relaxed mb-4">
              Il percorso riabilitativo domiciliare mira a traguardi specifici:
            </p>
            <div className="space-y-4 text-sm text-[#006B6B]/80 leading-relaxed">
              <p>
                <span className="font-medium text-[#4A9B9B]">
                  – Recupero Funzionale:
                </span>{' '}
                Migliorare la qualità del movimento, la coordinazione e l'equilibrio per ridurre il rischio di cadute e facilitare il cammino.
              </p>
              <p>
                <span className="font-medium text-[#4A9B9B]">– Autonomia Quotidiana:</span>{' '}
                Adattare l'ambiente domestico e addestrare il paziente e i caregiver alle attività della vita giornaliera (vestirsi, lavarsi, spostarsi).
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 - Benefici */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-lg font-semibold text-[#006B6B] mb-4 border-l-4 border-[#4A9B9B] pl-4">
              3. I BENEFICI A LUNGO TERMINE
            </h3>
            <ul className="space-y-2 text-sm text-[#006B6B]/80 leading-relaxed">
              <li className="flex items-start">
                <span className="text-[#4A9B9B] mr-2">–</span>
                Riduzione della spasticità e dei compensi motori errati.
              </li>
              <li className="flex items-start">
                <span className="text-[#4A9B9B] mr-2">–</span>
                Mantenimento dei trofismi muscolari e della mobilità articolare.
              </li>
              <li className="flex items-start">
                <span className="text-[#4A9B9B] mr-2">–</span>
                Miglioramento della propriocezione e della percezione del proprio corpo.
              </li>
              <li className="flex items-start">
                <span className="text-[#4A9B9B] mr-2">–</span>
                Sostegno psicologico motivazionale attraverso il raggiungimento di piccoli obiettivi costanti.
              </li>
              <li className="flex items-start">
                <span className="text-[#4A9B9B] mr-2">–</span>
                Prevenzione delle complicanze legate all'immobilità o alle patologie degenerative.
              </li>
            </ul>
          </div>
          <div className="relative group">
            <img
              src="/knee-treatment.jpg"
              alt="Trattamento dei disturbi motori"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#006B6B]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 right-0 w-1 h-24 bg-[#4A9B9B]" />
            <div className="absolute bottom-0 right-0 w-24 h-1 bg-[#4A9B9B]" />
          </div>
        </div>

        {/* Section 4 - Specializzazioni */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative order-2 lg:order-1 group">
            <img
              src="/foot-massage.jpg"
              alt="Fisioterapia specialistica"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#006B6B]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 w-1 h-24 bg-[#4A9B9B]" />
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#4A9B9B]" />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-lg font-semibold text-[#006B6B] mb-4 border-l-4 border-[#4A9B9B] pl-4">
              4. AMBITI DI INTERVENTO SPECIALISTICO
            </h3>
            <ul className="space-y-2 text-sm text-[#006B6B]/80 leading-relaxed">
              <li className="flex items-center">
                <span className="text-[#4A9B9B] mr-2">•</span>
                Riabilitazione post-Ictus (Ischemico/Emorragico)
              </li>
              <li className="flex items-center">
                <span className="text-[#4A9B9B] mr-2">•</span>
                Malattia di Parkinson e parkinsonismi
              </li>
              <li className="flex items-center">
                <span className="text-[#4A9B9B] mr-2">•</span>
                Sclerosi Multipla
              </li>
              <li className="flex items-center">
                <span className="text-[#4A9B9B] mr-2">•</span>
                Neuropatie periferiche e lesioni nervose
              </li>
              <li className="flex items-center">
                <span className="text-[#4A9B9B] mr-2">•</span>
                Rieducazione funzionale del cammino
              </li>
              <li className="flex items-center">
                <span className="text-[#4A9B9B] mr-2">•</span>
                Ginnastica propriocettiva ed equilibrio
              </li>
              <li className="flex items-center">
                <span className="text-[#4A9B9B] mr-2">•</span>
                Valutazione e prevenzione delle cadute
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPhysio;