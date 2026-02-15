const AboutPhysio = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
          TUTTO SULLA
          <br />
          FISIOTERAPIA
        </h2>

        {/* Section 1 - What is Physiotherapy */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              1. COS’È LA FISIOTERAPIA
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
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
          <div className="relative">
            <img
              src="/neck-massage.jpg"
              alt="Cos’è la fisioterapia"
              className="w-full h-auto rounded-sm shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-1 h-24 bg-[#C9A962]" />
            <div className="absolute bottom-0 right-0 w-24 h-1 bg-[#C9A962]" />
          </div>
        </div>

        {/* Section 2 - Objectives */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative order-2 lg:order-1">
            <img
              src="/balance-exercise.jpg"
              alt="Obiettivi della fisioterapia"
              className="w-full h-auto rounded-sm shadow-lg"
            />
            <div className="absolute bottom-0 left-0 w-1 h-24 bg-[#C9A962]" />
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#C9A962]" />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              2. OBIETTIVI
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              La fisioterapia comprende diversi obiettivi:
            </p>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                <span className="font-medium text-[#5A8A9A]">
                  – Terapeutico e riabilitativo:
                </span>{' '}
                si occupa di trattare il disturbo affinché la persona possa
                recuperare e tornare a svolgere le attività quotidiane in modo
                del tutto normale. Come affermato dalla Confederazione Mondiale
                della Fisioterapia: “Favorisce il recupero della massima
                funzionalità e mobilità dell’individuo nel corso della vita”.
              </p>
              <p>
                <span className="font-medium text-[#5A8A9A]">– Preventivo:</span>{' '}
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              3. BENEFICI
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <li>– Migliora la qualità della vita.</li>
              <li>
                – Favorisce il recupero dei tessuti danneggiati e ne ripristina la
                funzionalità.
              </li>
              <li>– Aiuta a prevenire l’invecchiamento.</li>
              <li>
                – Rende la persona protagonista della propria salute e del
                percorso di recupero.
              </li>
              <li>
                – Permette di comprendere il corpo come un insieme, sapendo che
                qualsiasi alterazione può influire sullo stato di salute.
              </li>
              <li>
                – Riduce l’infiammazione, allevia il dolore e accelera i processi
                di rigenerazione dell’organismo.
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="/knee-treatment.jpg"
              alt="Benefici della fisioterapia"
              className="w-full h-auto rounded-sm shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-1 h-24 bg-[#C9A962]" />
            <div className="absolute bottom-0 right-0 w-24 h-1 bg-[#C9A962]" />
          </div>
        </div>

        {/* Section 4 - Types */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative order-2 lg:order-1">
            <img
              src="/foot-massage.jpg"
              alt="Tipi di fisioterapia"
              className="w-full h-auto rounded-sm shadow-lg"
            />
            <div className="absolute bottom-0 left-0 w-1 h-24 bg-[#C9A962]" />
            <div className="absolute bottom-0 left-0 w-24 h-1 bg-[#C9A962]" />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              4. TIPI DI FISIOTERAPIA PRESSO FISIO ABADIA
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <li>– Apparato locomotore</li>
              <li>– Pavimento pelvico</li>
              <li>– Fisioterapia sportiva</li>
              <li>– Miofasciale</li>
              <li>– ATM (articolazione temporo-mandibolare)</li>
              <li>– Viscerale</li>
              <li>– Neurologica</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPhysio;
