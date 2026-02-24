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
        {/* Overlay - Blue tinted for palette cohesion */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b4965]/60 via-[#1b4965]/40 to-[#62b6cb]/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              FISIOTERAPIA E RIABILITAZIONE NEUROLOGICA
              <br />
              <span className="text-[#bee9e8]">NAPOLI</span>
            </h1>
            {/* Optional accent line */}
            <div className="w-24 h-1 bg-[#62b6cb] mt-6 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;