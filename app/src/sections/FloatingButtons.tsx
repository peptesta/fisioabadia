import { Phone, Calendar, MessageCircle } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/393757411413"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#4A9B9B] hover:bg-[#5AAAAA] text-white p-3 rounded-l-lg transition-all duration-300 shadow-lg shadow-[#4A9B9B]/30 hover:shadow-xl hover:shadow-[#4A9B9B]/40 hover:pr-5"
        title="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Phone Button */}
      <a
        href="tel:+393757411413"
        className="bg-[#006B6B] hover:bg-[#007B7B] text-white p-3 rounded-l-lg transition-all duration-300 shadow-lg shadow-[#006B6B]/30 hover:shadow-xl hover:shadow-[#006B6B]/40 hover:pr-5"
        title="Chiamare"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Calendar Button */}
      <a
        href="/user/booking"
        className="bg-[#7FCFCF] hover:bg-[#8FDFDF] text-[#006B6B] p-3 rounded-l-lg transition-all duration-300 shadow-lg shadow-[#7FCFCF]/30 hover:shadow-xl hover:shadow-[#7FCFCF]/40 hover:pr-5"
        title="Appuntamento"
      >
        <Calendar className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingButtons;