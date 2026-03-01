import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type NavLink = 
  | { name: string; href: string; hasDropdown?: boolean; isButton?: never; onClick?: never }
  | { name: string; href: string; isButton: true; onClick: () => void | Promise<void>; hasDropdown?: never };

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { session, signOutUser } = UserAuth() || {};
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOutUser?.();
    navigate('/');
  };

  const baseNavLinks: NavLink[] = [
    { name: 'INIZIO', href: '#inicio' },
    { name: 'BUONO REGALO', href: '#bono' },
    { name: 'SERVIZI', href: '#servicios', hasDropdown: true },
    { name: 'METODO', href: '#metodo' },
    { name: 'BLOG', href: '#blog' },
    { name: 'CONTATTO', href: '#contacto' },
  ];

  const authLink: NavLink = session
    ? { name: 'LOGOUT', href: '#', isButton: true, onClick: handleLogout }
    : { name: 'LOGIN/REGISTRATI', href: '/signup' };

  const navLinks: NavLink[] = [...baseNavLinks, authLink];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#006B6B]/95 backdrop-blur-sm shadow-lg shadow-[#006B6B]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center group">
            <span
              className={`text-xl font-semibold tracking-wider transition-colors ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              FISIO
            </span>
            <span
              className={`text-xl font-light transition-colors ${
                isScrolled ? 'text-[#7FCFCF]' : 'text-[#7FCFCF]'
              }`}
            >
              ◊
            </span>
            <span
              className={`text-xl font-semibold tracking-wider transition-colors ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              ABADIA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              'isButton' in link && link.isButton ? (
                <button
                  key={index}
                  onClick={link.onClick}
                  className={`text-xs font-medium tracking-wider transition-colors hover:text-[#7FCFCF] ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className={`text-xs font-medium tracking-wider transition-colors hover:text-[#7FCFCF] flex items-center gap-1 ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </a>
              )
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
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#006B6B] shadow-xl shadow-[#006B6B]/30 rounded-lg mt-2 py-4 border border-[#4A9B9B]">
            {navLinks.map((link, index) => (
              'isButton' in link && link.isButton ? (
                <button
                  key={index}
                  onClick={() => {
                    link.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-white hover:bg-[#4A9B9B] hover:text-[#7FCFCF] transition-colors"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-white hover:bg-[#4A9B9B] hover:text-[#7FCFCF] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;