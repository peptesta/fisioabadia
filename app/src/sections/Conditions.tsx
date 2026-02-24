const Conditions = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1b4965] text-center mb-12">
          Perchè è importante la riabilitazione neurologica a domicilio?
        </h2>

        <div className="grid text-center">
          <p className="text-[#1b4965]/80 leading-relaxed text-lg max-w-4xl mx-auto">
            Nelle fasi iniziali del percorso riabilitativo, il paziente potrebbe non essere sempre in grado di recarsi 
            presso il centro. È fondamentale, tuttavia, non disperdere questo periodo cruciale per il recupero funzionale.
            Inoltre, per ottenere risultati significativi e favorire un recupero intensivo, l'ora di trattamento svolta 
            presso il centro non è sufficiente da sola: è necessario integrare il lavoro con attività ed 
            esercizi domiciliari distribuiti nell'arco dell'intera giornata, secondo le indicazioni fornite 
            dagli specialisti.
          </p>
        </div>
        
        {/* Decorative element */}
        <div className="flex justify-center mt-10">
          <div className="w-16 h-1 bg-[#62b6cb] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Conditions;