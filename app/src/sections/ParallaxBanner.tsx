import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ParallaxBanner = () => {
  return (
    <section
      className="relative py-24 md:py-32 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: 'url(/parallax-bg.jpg)',
      }}
    >
      {/* Overlay - Teal tinted */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#006B6B]/70 via-[#006B6B]/50 to-[#4A9B9B]/40" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs tracking-[0.3em] text-[#7FCFCF] mb-4 font-medium">
          MENO DOLORE, PIÙ FORZA
        </p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
          LA FISIOTERAPIA È SALUTE, MOBILITÀ,
          <br />
          <span className="text-[#E8F4F4]">FUNZIONALITÀ, FORZA, VITA</span>
        </h2>
        <Button
          variant="default"
          className="bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-xs tracking-widest px-8 py-3 rounded-md shadow-lg shadow-[#006B6B]/40 transition-all hover:shadow-xl hover:shadow-[#006B6B]/50 hover:-translate-y-0.5"
        >
          INIZIA OGGI
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default ParallaxBanner;