export default function Fisioterapia() {
  const specialties = [
    'Fisioterapia',
    'Fisioterapia neurologica',
    'Valutazione neurologica',
    'Patologie sistema nervoso centrale e periferico',
    'Neuropatie',
    'Fisioterapia funzionale', // Corretto refuso
  ];

  return (
    <section id="su-di-me" className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intestazione Principale */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
            Dott. Francesco Abadia
          </h2>
          <div className="w-20 h-1 bg-[#C9A962]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Colonna Sinistra - Testo e Competenze */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
              Il mio approccio
            </h3>
            <p className="text-md leading-relaxed text-gray-600 mb-8">
              Specializzarsi in ambito neurologico per me non è stata solo una scelta accademica, ma una missione: 
              restituire una prospettiva di vita a chi sente di averla persa. Credo fermamente che, sfruttando le incredibili capacità 
              di adattamento del nostro corpo e applicando protocolli rigorosi, sia possibile aspirare a una qualità di vita migliore.
              <br /><br />
              So che la domanda che ti tormenta è: <strong>"Potrò recuperare? Quanto tempo ci vorrà?"</strong>. 
              La mia risposta non è fatta di false promesse, ma di evidenza scientifica. Insieme definiremo obiettivi chiari e misurabili, senza zone d'ombra. 
              Il mio metodo si basa sulla terapia intensiva e sul monitoraggio costante: ogni progresso viene registrato, 
              ogni traguardo è un passo reale verso la tua nuova autonomia.
            </p>

            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-[#C9A962]">
              <p className="text-sm font-bold text-gray-800 mb-4 uppercase">
                Specializzato in:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <span className="text-[#C9A962] mr-2 text-lg">•</span>
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonna Destra - Immagine con decorazione */}
          <div className="relative mt-8 lg:mt-0">
            <img
              src="/fisioterapia-back.jpg"
              alt="Dott. Francesco Abadia - Fisioterapia Neurologica"
              className="w-full h-auto rounded-sm shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
            {/* Elementi decorativi Gold */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#C9A962]" />
          </div>
        </div>
      </div>
    </section>
  );
};