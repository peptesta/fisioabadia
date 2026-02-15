const Conditions = () => {
  const leftConditions = [
    'Fascite plantare',
    'Distorsioni',
    'Tendiniti',
    'Lesioni nella rotula',
    'Dolore lombare cronico',
    'Artrite',
    'Sciatica',
    'Scoliosi',
  ];

  const rightConditions = [
    'Contratture muscolari',
    'Sperone calcaneare',
    'Dolore alla mandibola',
    'Fibromialgia',
    'Cefalea tensiva',
    'Borsite',
    'Ernia del disco',
    'Dolore lombare',
    'Osteoartrite',
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-12">
          Perchè è importante la riabilitazione neurologica a domicilio?
        </h2>

        {/*<div className="grid md:grid-cols-2 gap-x-16 gap-y-3">
          <ul className="space-y-3">
            {leftConditions.map((condition, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-700"
              >
                <span className="text-[#C9A962] mr-3">•</span>
                {condition}
              </li>
            ))}
          </ul>

          <ul className="space-y-3">
            {rightConditions.map((condition, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-700"
              >
                <span className="text-[#C9A962] mr-3">•</span>
                {condition}
              </li>
            ))}
          </ul>
        </div>*/}
        <div className="grid text-center">
          Nelle fasi iniziali del percorso riabilitativo, il paziente potrebbe non essere sempre in grado di recarsi 
          presso il centro. È fondamentale, tuttavia, non disperdere questo periodo cruciale per il recupero funzionale.
          Inoltre, per ottenere risultati significativi e favorire un recupero intensivo, l’ora di trattamento svolta 
          presso il centro non è sufficiente da sola: è necessario integrare il lavoro con attività ed 
          esercizi domiciliari distribuiti nell’arco dell’intera giornata, secondo le indicazioni fornite 
          dagli specialisti.
        </div>
      </div>
    </section>
  );
};

export default Conditions;
