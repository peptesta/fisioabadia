import { MapPin, FileText, Link2, ShoppingCart, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contatto">
      {/* CTA Banner */}
      <div
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/parallax-bg.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b4965]/70 via-[#1b4965]/50 to-[#62b6cb]/40" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] text-[#bee9e8] mb-4 font-medium">
            MENO DOLORE, PIÙ FORZA
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            CAMBIA LA TUA <span className="text-[#cae9ff]">VITA</span>
          </h2>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-[#cae9ff]/20 py-16 mr-16 ml-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 - Info Studio */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#1b4965]" />
                <h3 className="text-lg font-semibold text-[#1b4965] tracking-wider">
                  FISIO ABADIA
                </h3>
              </div>
              <div className="w-48 border-b-2 border-[#62b6cb] mb-4"></div>
              <div className="space-y-2 text-xs text-[#1b4965]/70">
                <p>IL TUO STUDIO DI PILATES,</p>
                <p>FISIOTERAPIA E NUTRIZIONE</p>
                <p className="mt-4">Via Napoli, 12</p>
                <p>80100 Napoli</p>
                <p className="mt-4">+39 081 123 4567</p>
                <p className="mt-4">
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    AVVISO LEGALE
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    COOKIE POLICY
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    PRIVACY POLICY
                  </a>
                </p>
              </div>
            </div>

            {/* Column 2 - Link utili */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="w-5 h-5 text-[#1b4965]" />
                <h3 className="text-lg font-semibold text-[#1b4965] tracking-wider">
                  LINK UTILI
                </h3>
              </div>
              <div className="w-48 border-b-2 border-[#62b6cb] mb-4"></div>
              <div className="space-y-2 text-xs text-[#1b4965]/70">
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    FISIOTERAPIA A NAPOLI
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    COME ARRIVARE
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    CONTATTI
                  </a>
                </p>
                <p className="mt-4">
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors inline-block">
                    <Instagram className="w-5 h-5" />
                  </a>
                </p>
              </div>
            </div>

            {/* Column 3 - Shop Online */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-[#1b4965]" />
                <h3 className="text-lg font-semibold text-[#1b4965] tracking-wider">
                  ACQUISTA ONLINE PACCHETTI
                </h3>
              </div>
              <div className="w-48 border-b-2 border-[#62b6cb] mb-4"></div>
              <div className="space-y-2 text-xs text-[#1b4965]/70">
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    ACQUISTA PACCHETTI SALUTE
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    POLITICA DI RECESSO
                  </a>
                </p>
                <p>
                  <a href="#" className="hover:text-[#5fa8d3] transition-colors">
                    PAGAMENTO 100% SICURO
                  </a>
                </p>
                <div className="flex gap-2 mt-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-6 opacity-70"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-6 opacity-70"
                  />
                </div>
              </div>
            </div>

            {/* Column 4 - Posizione */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-[#1b4965]" />
                <h3 className="text-lg font-semibold text-[#1b4965] tracking-wider">
                  DOVE TROVARMI
                </h3>
              </div>
              <div className="w-48 border-b-2 border-[#62b6cb] mb-4"></div>
              <div className="space-y-2 text-xs text-[#1b4965]/70">
                <p className="font-medium text-[#1b4965]">
                  FISIO ABADIA | Fisioterapia Napoli
                </p>
                <p className="mt-4 font-medium text-[#1b4965]">Indirizzo:</p>
                <p>Via Napoli, 12 – 80100 Napoli (NA)</p>
                <p className="mt-4 font-medium text-[#1b4965]">Orari:</p>
                <p>Lun – Ven</p>
                <p>08:00 – 21:00</p>
                <p className="mt-4 font-medium text-[#1b4965]">Contatti:</p>
                <p className="text-[#5fa8d3] font-semibold">+39 081 123 4567</p>
                <div className="mt-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.927!2d14.2526!3d40.8518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUxJzI2LjgiTiAxNMKwMTUnMDcuMyJF!5e0!3m2!1sit!2sit!4v1234567890"
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg border-2 border-[#bee9e8]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#1b4965] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-[#cae9ff]/80">
            Powered by{' '}
            <a href="#" className="text-[#bee9e8] hover:text-white transition-colors">
              Peppe Testa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;