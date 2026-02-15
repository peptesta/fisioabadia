import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

const PatientTestimonials = () => {
  const testimonials = [
    {
      title: 'Il mio centro di fisioterapia a Napoli',
      subtitle: '',
      text: '"Ieri sono andato per la prima volta per un dolore ai piedi e il fisioterapista mi ha rimesso a nuovo: zero dolore e piedi perfetti. Inoltre mi ha insegnato alcune tecniche per evitare che il problema si ripresentasse. Sono molto soddisfatto e lo consiglio al 100%."',
      author: 'James Harden',
      rating: 5,
    },
    {
      title: 'Fisioterapia sportiva efficace',
      subtitle: '',
      text: '"Sono andato da Fisio Abadia perché avevo una lesione al soleo causata dalla corsa. Mi ha seguito David e la seduta è stata davvero ottima. Prima mi ha fatto un breve questionario e, dopo avergli spiegato come mi ero infortunato e aver valutato il tipo di lesione, mi ha dato molti consigli utili per prevenire problemi futuri. Anche il massaggio terapeutico è stato eccellente: ha applicato diverse tecniche, ho sentito pochissimo dolore e in una settimana ero già guarito. Consiglio David R. al 100%. Molto professionale, efficace e chiaro nelle spiegazioni."',
      author: 'Stephen Curry',
      rating: 5,
    },
    {
      title: 'Addio al dolore cervicale',
      text: '"Sono in trattamento da un mese e mi sento seguita con grande attenzione sia dal centro che dalla professionista che mi assiste. Sia il problema cervicale che la tendinite sono migliorati moltissimo e non soffro più né di dolore né di emicranie. Consiglio sia il team di Pilates che quello di osteopatia e fisioterapia."',
      author: 'Klay Thompson',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          I NOSTRI PAZIENTI
        </h2>
        <div className="flex justify-center mb-12">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-[#C9A962] text-[#C9A962]" />
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {testimonial.title}
              </h3>
              {testimonial.subtitle && (
                <p className="text-xs text-gray-500 mb-4">
                  {testimonial.subtitle}
                </p>
              )}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#C9A962] text-[#C9A962]"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">
                {testimonial.text}
              </p>
              <p className="text-sm font-medium text-gray-800">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="default"
            className="bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest px-8 py-3 rounded-sm"
          >
            PRENOTA ORA
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PatientTestimonials;
