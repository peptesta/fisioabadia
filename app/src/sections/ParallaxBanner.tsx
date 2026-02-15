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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs tracking-[0.3em] text-white/70 mb-4">
          MENO DOLORE, PIÙ FORZA
        </p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
          LA FISIOTERAPIA È SALUTE, MOBILITÀ,
          <br />
          FUNZIONALITÀ, FORZA, VITA
        </h2>
        <Button
          variant="default"
          className="bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest px-8 py-3 rounded-sm"
        >
          INIZIA OGGI
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default ParallaxBanner;
