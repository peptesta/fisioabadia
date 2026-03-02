import { Calendar, ClipboardList, LayoutDashboard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHub = () => {
  const adminOptions = [
    {
      title: "Gestione Disponibilità",
      description: "Imposta gli orari, i giorni di chiusura e le fasce orarie per le prenotazioni.",
      icon: <Calendar className="w-8 h-8 text-[#006B6B]" />,
      link: "/admin/availability",
      color: "border-l-8 border-l-[#006B6B]"
    },
    {
      title: "Le Mie Visite",
      description: "Visualizza l'elenco completo degli appuntamenti programmati e lo storico.",
      icon: <ClipboardList className="w-8 h-8 text-[#4A9B9B]" />,
      link: "/admin/dashboard",
      color: "border-l-8 border-l-[#4A9B9B]"
    },
    {
      title: "Dashboard Statistiche",
      description: "Analizza l'andamento delle prenotazioni e i dati dei pazienti.",
      icon: <LayoutDashboard className="w-8 h-8 text-[#7FCFCF]" />,
      link: "/admin/dashboard",
      color: "border-l-8 border-l-[#7FCFCF]"
    }
  ];

  return (
    <div className="max-w-5xl mt-16 mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-[#006B6B] uppercase italic tracking-tighter">
          Pannello di Controllo <span className="text-black italic font-light">Admin</span>
        </h1>
        <p className="text-[#4A9B9B] font-medium mt-2">Benvenuto, Francesco. Gestisci la tua attività da qui.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {adminOptions.map((option, index) => (
          <Link 
            key={index} 
            to={option.link}
            className={`group bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between ${option.color} border-2 border-black/5`}
          >
            <div>
              <div className="mb-6 p-3 bg-[#E8F4F4] w-fit rounded-xl group-hover:scale-110 transition-transform">
                {option.icon}
              </div>
              <h2 className="text-xl font-black text-gray-900 uppercase mb-4 tracking-tight">
                {option.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                {option.description}
              </p>
            </div>
            
            <div className="flex items-center text-[#006B6B] font-bold text-xs tracking-widest uppercase mt-4">
              Entra ora <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminHub;