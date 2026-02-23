import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INIZIO', href: '#inicio' },
    { name: 'BUONO REGALO', href: '#bono' },
    { name: 'SERVIZI', href: '#servicios', hasDropdown: true },
    { name: 'METODO', href: '#metodo' },
    { name: 'BLOG', href: '#blog' },
    { name: 'CONTATTO', href: '#contacto' },
    { name: 'Registrati', href: '/signup' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <span
              className={`text-xl font-semibold tracking-wider transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              FISIO
            </span>
            <span
              className={`text-xl font-light transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-white/80'
              }`}
            >
              ◊
            </span>
            <span
              className={`text-xl font-semibold tracking-wider transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              ABADIA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-medium tracking-wider transition-colors hover:text-[#C9A962] flex items-center gap-1 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } ${link.name === 'SERVICIOS' ? 'text-[#C9A962]' : ''}`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-lg mt-2 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#C9A962] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
