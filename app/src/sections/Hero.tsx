const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen min-h-[600px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-physio.jpg)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              FISIOTERAPIA E RIABILITAZIONE NEUROLOGICA
              <br />
              NAPOLI
            </h1>
            {/*<p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light tracking-wide">
              IL SOLLIEVO ARRIVA DOVE SEI TU
            </p>*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
