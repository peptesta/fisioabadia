import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedAdminRoute() {
  const authContext = UserAuth();

  // Recupero la lista delle email autorizzate dal file .env
  // .split(",") trasforma la stringa "mail1@test.it,mail2@test.it" in un array
  //const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(",") || [];

  if (!authContext) return null;

  const { session, loading } = authContext;

  // 1. Fase di caricamento
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#E8F4F4]">
        <Loader2 className="h-12 w-12 animate-spin text-[#006B6B]" />
      </div>
    );
  }

  // 2. Controllo Sessione: Se non è loggato -> Vai al Login
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // 3. Controllo Autorizzazione: La mail dell'utente è nella lista admin?
  const userEmail = session.user?.email;
  //const isAdmin = userEmail && adminEmails.includes(userEmail);
  const isAdmin = authContext.isAdmin;

  if (!isAdmin) {
    console.warn(`Accesso Admin negato per: ${userEmail}`);
    // Se è un utente normale che prova a forzare l'URL admin, lo mandiamo alla sua dashboard
    return <Navigate to="/user/dashboard" replace />;
  }

  // 4. Accesso Garantito: Mostra le pagine Admin
  return <Outlet />;
}