const AboutPhysio = () => {
  return (
    <section className="py-16 md:py-24 bg-[#cae9ff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1b4965] text-center mb-16">
          TUTTO SULLA
          <br />
          <span className="text-[#5fa8d3]">FISIOTERAPIA</span>
        </h2>

        {/* Section 1 - What is Physiotherapy */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-lg font-semibold text-[#1b4965] mb-4 border-l-4 border-[#62b6cb] pl-4">
              1. COS'È LA FISIOTERAPIA
            </h3>
            <p className="text-sm text-[#1b4965]/80 leading-relaxed">
              La fisioterapia è una disciplina delle scienze della salute che
              offre un trattamento terapeutico e riabilitativo. Il suo obiettivo
              è ripristinare il corretto funzionamento del corpo umano, risolvendo
              lesioni e patologie e, quando possibile, prevenirle. La fisioterapia
              non utilizza farmaci, ma diversi agenti fisici come il calore, il
              freddo, il movimento, gli esercizi di stretching, ecc. Il principale
              strumento di lavoro è rappresentato dalle mani del fisioterapista.
              I benefici della fisioterapia sono ampiamente riconosciuti e
              consentono di trattare disturbi sia acuti che cronici.
            </p>
          </div>
          <div className="relative group">
            <img
              src="/neck-massage.jpg"
              alt="Cos'è la fisioterapia"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#1b4965]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 right-0 w-1 h-24 bg-[#5fa8d3]" />
            <div className="absolute bottom-0 right-0 w-24 h-1 bg-[#5fa8d3]" />
          </div>
        </div>

        {/* Section 2 - Objectives */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative order-2 lg:order-1 group">
            <img
              src="/balance-exercise.jpg"
              alt="Obiettivi della fisioterapia"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#1b4965]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 w-1 h-24 bg-[#62b6cb]" />
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#62b6cb]" />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-lg font-semibold text-[#1b4965] mb-4 border-l-4 border-[#62b6cb] pl-4">
              2. OBIETTIVI
            </h3>
            <p className="text-sm text-[#1b4965]/80 leading-relaxed mb-4">
              La fisioterapia comprende diversi obiettivi:
            </p>
            <div className="space-y-4 text-sm text-[#1b4965]/80 leading-relaxed">
              <p>
                <span className="font-medium text-[#5fa8d3]">
                  – Terapeutico e riabilitativo:
                </span>{' '}
                si occupa di trattare il disturbo affinché la persona possa
                recuperare e tornare a svolgere le attività quotidiane in modo
                del tutto normale. Come affermato dalla Confederazione Mondiale
                della Fisioterapia: "Favorisce il recupero della massima
                funzionalità e mobilità dell'individuo nel corso della vita".
              </p>
              <p>
                <span className="font-medium text-[#5fa8d3]">– Preventivo:</span>{' '}
                in questo caso la fisioterapia fornisce gli strumenti necessari
                affinché la persona possa migliorare e mantenere il proprio stato
                di salute.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 - Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-lg font-semibold text-[#1b4965] mb-4 border-l-4 border-[#62b6cb] pl-4">
              3. BENEFICI
            </h3>
            <ul className="space-y-2 text-sm text-[#1b4965]/80 leading-relaxed">
              <li className="flex items-start">
                <span className="text-[#62b6cb] mr-2">–</span>
                Migliora la qualità della vita.
              </li>
              <li className="flex items-start">
                <span className="text-[#62b6cb] mr-2">–</span>
                Favorisce il recupero dei tessuti danneggiati e ne ripristina la funzionalità.
              </li>
              <li className="flex items-start">
                <span className="text-[#62b6cb] mr-2">–</span>
                Aiuta a prevenire l'invecchiamento.
              </li>
              <li className="flex items-start">
                <span className="text-[#62b6cb] mr-2">–</span>
                Rende la persona protagonista della propria salute e del percorso di recupero.
              </li>
              <li className="flex items-start">
                <span className="text-[#62b6cb] mr-2">–</span>
                Permette di comprendere il corpo come un insieme, sapendo che qualsiasi alterazione può influire sullo stato di salute.
              </li>
              <li className="flex items-start">
                <span className="text-[#62b6cb] mr-2">–</span>
                Riduce l'infiammazione, allevia il dolore e accelera i processi di rigenerazione dell'organismo.
              </li>
            </ul>
          </div>
          <div className="relative group">
            <img
              src="/knee-treatment.jpg"
              alt="Benefici della fisioterapia"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#1b4965]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 right-0 w-1 h-24 bg-[#5fa8d3]" />
            <div className="absolute bottom-0 right-0 w-24 h-1 bg-[#5fa8d3]" />
          </div>
        </div>

        {/* Section 4 - Types */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative order-2 lg:order-1 group">
            <img
              src="/foot-massage.jpg"
              alt="Tipi di fisioterapia"
              className="w-full h-auto rounded-lg shadow-xl shadow-[#1b4965]/10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 w-1 h-24 bg-[#62b6cb]" />
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#62b6cb]" />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-lg font-semibold text-[#1b4965] mb-4 border-l-4 border-[#62b6cb] pl-4">
              4. TIPI DI FISIOTERAPIA PRESSO FISIO ABADIA
            </h3>
            <ul className="space-y-2 text-sm text-[#1b4965]/80 leading-relaxed">
              <li className="flex items-center">
                <span className="text-[#62b6cb] mr-2">•</span>
                Apparato locomotore
              </li>
              <li className="flex items-center">
                <span className="text-[#62b6cb] mr-2">•</span>
                Pavimento pelvico
              </li>
              <li className="flex items-center">
                <span className="text-[#62b6cb] mr-2">•</span>
                Fisioterapia sportiva
              </li>
              <li className="flex items-center">
                <span className="text-[#62b6cb] mr-2">•</span>
                Miofasciale
              </li>
              <li className="flex items-center">
                <span className="text-[#62b6cb] mr-2">•</span>
                ATM (articolazione temporo-mandibolare)
              </li>
              <li className="flex items-center">
                <span className="text-[#62b6cb] mr-2">•</span>
                Viscerale
              </li>
              <li className="flex items-center">
                <span className="text-[#62b6cb] mr-2">•</span>
                Neurologica
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPhysio;