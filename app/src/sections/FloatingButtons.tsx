import { Phone, Calendar, MessageCircle } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/34626934089"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#5fa8d3] hover:bg-[#62b6cb] text-white p-3 rounded-l-lg transition-all duration-300 shadow-lg shadow-[#5fa8d3]/30 hover:shadow-xl hover:shadow-[#62b6cb]/40 hover:pr-5"
        title="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Phone Button */}
      <a
        href="tel:+34626934089"
        className="bg-[#1b4965] hover:bg-[#2a5a7a] text-white p-3 rounded-l-lg transition-all duration-300 shadow-lg shadow-[#1b4965]/30 hover:shadow-xl hover:shadow-[#1b4965]/40 hover:pr-5"
        title="Llamar"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Calendar Button */}
      <a
        href="#contacto"
        className="bg-[#62b6cb] hover:bg-[#7bc4d6] text-white p-3 rounded-l-lg transition-all duration-300 shadow-lg shadow-[#62b6cb]/30 hover:shadow-xl hover:shadow-[#62b6cb]/40 hover:pr-5"
        title="Cita"
      >
        <Calendar className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingButtons;