export default function Fisioterapia() {
  const specialties = [
    'Fisioterapia',
    'Fisioterapia neurologica',
    'Valutazione neurologica',
    'Patologie sistema nervoso centrale e periferico',
    'Neuropatie',
    'Fisioterapia funzionale',
  ];

  return (
    <section id="su-di-me" className="py-16 md:py-24 bg-[#cae9ff]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intestazione Principale */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1b4965] mb-2">
            Dott. Francesco Abadia
          </h2>
          <div className="w-20 h-1 bg-[#5fa8d3]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Colonna Sinistra - Testo e Competenze */}
          <div>
            <h3 className="text-xl font-bold text-[#1b4965] mb-6 uppercase tracking-wider">
              Il mio approccio
            </h3>
            <p className="text-md leading-relaxed text-[#1b4965]/80 mb-8">
              Specializzarsi in ambito neurologico per me non è stata solo una scelta accademica, ma una missione: 
              restituire una prospettiva di vita a chi sente di averla persa. Credo fermamente che, sfruttando le incredibili capacità 
              di adattamento del nostro corpo e applicando protocolli rigorosi, sia possibile aspirare a una qualità di vita migliore.
              <br /><br />
              So che la domanda che ti tormenta è: <strong className="text-[#5fa8d3]">"Potrò recuperare? Quanto tempo ci vorrà?"</strong>. 
              La mia risposta non è fatta di false promesse, ma di evidenza scientifica. Insieme definiremo obiettivi chiari e misurabili, senza zone d'ombra. 
              Il mio metodo si basa sulla terapia intensiva e sul monitoraggio costante: ogni progresso viene registrato, 
              ogni traguardo è un passo reale verso la tua nuova autonomia.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-lg shadow-[#1b4965]/5 border-l-4 border-[#62b6cb]">
              <p className="text-sm font-bold text-[#1b4965] mb-4 uppercase">
                Specializzato in:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center text-sm text-[#1b4965]/80">
                    <span className="text-[#5fa8d3] mr-2 text-lg">•</span>
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
              className="w-full h-auto rounded-lg shadow-xl shadow-[#1b4965]/20 grayscale-[20%] hover:grayscale-0 transition-all duration-500 border-4 border-white"
            />
            {/* Elementi decorativi Blue */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#62b6cb] rounded-br-lg" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-[#bee9e8] rounded-tl-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};