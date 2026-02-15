import { Button } from '@/components/ui/button';

const Fisioterapia = () => {
  const specialties = [
    'Fisioterapia',
    'Fisioterapia neurologica',
    'Valutazione neurologica',
    'Patologie sistema nervoso centrale e periferico',
    'Neuropatie',
    'Fiseoterapia funzionale',
  ];

  const pricingPlans = [
    {
      title: 'SESSIONE DI FISIOTERAPIA',
      price: '60',
      //unit: '€',
      description: '1 Sessione di 1 Ora',
      savings:'',
      buttonText: 'MI INTERESSA',
    },
    {
      title: 'SESSIONE DI FISIOTERAPIA (5)',
      price: '280',
      unit: '€56/h',
      savings: 'Risparmia €20!',
      description: 'Buono da 5 Sessioni',
      buttonText: 'MI INTERESSA',
    },
    {
      title: 'SESSIONE DI FISIOTERAPIA (10)',
      price: '540',
      unit: '€54/h',
      savings: 'Risparmia €60!',
      description: 'Buono da 10 Sessioni',
      buttonText: 'MI INTERESSA',
    },
  ];

  return (
    <section id="servicios" className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Title and List */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              FISIOTERAPIA
            </h2>
            <p className="text-sm font-medium text-gray-600 mb-4">
              Specializzato in:
            </p>
            <ul className="space-y-2">
              {specialties.map((specialty, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-gray-700"
                >
                  <span className="text-[#C9A962] mr-2">•</span>
                  {specialty}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="/fisioterapia-back.jpg"
              alt="Fisioterapia"
              className="w-full h-auto rounded-sm shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-1 h-32 bg-[#C9A962]" />
            <div className="absolute bottom-0 right-0 w-32 h-1 bg-[#C9A962]" />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-sm shadow-md p-8 text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="text-sm font-medium text-[#C9A962] mb-4 tracking-wider">
                {plan.title}
              </h3>
              <div className="mb-2">
                <span className="text-xs text-gray-500 align-top">
                  {plan.unit}
                </span>
                <span className="text-5xl font-light text-gray-800">
                  {plan.price}
                </span>
                <span className="text-xl text-black">
                  €
                </span>
              </div>
              {plan.savings && (
                <p className="text-sm text-[#C9A962] mb-2">{plan.savings}</p>
              )}
              <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
              <Button
                variant="default"
                className="bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest px-6 py-2 rounded-sm"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fisioterapia;
