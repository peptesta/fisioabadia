import { Phone, Calendar, MessageCircle } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/34626934089"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#C9A962] hover:bg-[#B8994F] text-white p-3 rounded-l-sm transition-colors shadow-lg"
        title="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Phone Button */}
      <a
        href="tel:+34626934089"
        className="bg-[#4A4A4A] hover:bg-[#3A3A3A] text-white p-3 rounded-l-sm transition-colors shadow-lg"
        title="Llamar"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Calendar Button */}
      <a
        href="#contacto"
        className="bg-[#4A4A4A] hover:bg-[#3A3A3A] text-white p-3 rounded-l-sm transition-colors shadow-lg"
        title="Cita"
      >
        <Calendar className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingButtons;
