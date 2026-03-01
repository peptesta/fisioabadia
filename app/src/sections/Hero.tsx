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
        {/* Overlay - Teal tinted for medical professionalism */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#006B6B]/70 via-[#006B6B]/50 to-[#4A9B9B]/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              FISIOTERAPIA E RIABILITAZIONE NEUROLOGICA
              <br />
              <span className="text-[#7FCFCF]">NAPOLI</span>
            </h1>
            {/* Decorative line */}
            <div className="w-24 h-1 bg-[#7FCFCF] mt-6 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;