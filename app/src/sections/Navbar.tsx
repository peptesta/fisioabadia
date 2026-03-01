import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Aggiunto useLocation

type NavLink = 
  | { name: string; href: string; hasDropdown?: boolean; isButton?: never; onClick?: never }
  | { name: string; href: string; isButton: true; onClick: () => void | Promise<void>; hasDropdown?: never };

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { session, signOutUser } = UserAuth() || {};
  const navigate = useNavigate();
  const location = useLocation(); // Hook per rilevare la rotta attuale

  // Verifichiamo se siamo nella Home Page (App.tsx)
  const isHomePage = location.pathname === "/";

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

  // ... baseNavLinks e authLink rimangono invariati ...
  const baseNavLinks: NavLink[] = [
    { name: 'INIZIO', href: isHomePage ? '#inicio' : '/#inicio' },
    { name: 'BLOG', href: isHomePage ? '#blog' : '/#blog' },
    { name: 'CONTATTO', href: isHomePage ? '#contacto' : '/#contacto' },
    { name: 'PRENOTA', href: '/user/booking' },
  ];

  const authLink: NavLink[] = session
    ? [
        { name: 'DASHBOARD', href: session.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard' },
        { name: session.user.role === 'admin' ? 'GESTISCI DISPONIBILITÀ' : '', href: session.user.role === 'admin' ? '/admin/availability' : ''},
        { name: 'PRENOTAZIONI', href: '/user/booking' },
        { name: 'LOGOUT', href: '#', isButton: true, onClick: handleLogout },
      ]
    : [{ name: 'LOGIN/REGISTRATI', href: '/signup' }];

  const navLinks: NavLink[] = [...baseNavLinks, ...authLink];

  // Logica per determinare lo sfondo:
  // Se NON è la home, è SEMPRE colorata.
  // Se è la home, è colorata SOLO se isScrolled è true.
  const shouldBeColored = !isHomePage || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeColored
          ? 'bg-[#006B6B]/95 backdrop-blur-sm shadow-lg shadow-[#006B6B]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <span className="text-xl font-semibold tracking-wider text-white">
              FISIO
            </span>
            <span className="text-xl font-light text-[#7FCFCF]">
              ◊
            </span>
            <span className="text-xl font-semibold tracking-wider text-white">
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
                  className="text-xs font-medium tracking-wider transition-colors hover:text-[#7FCFCF] text-white"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="text-xs font-medium tracking-wider transition-colors hover:text-[#7FCFCF] flex items-center gap-1 text-white"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </a>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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