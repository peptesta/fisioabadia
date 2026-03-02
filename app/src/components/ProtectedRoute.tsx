import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const authContext = UserAuth();

  // Sicurezza: se il context non è raggiungibile
  if (!authContext) {
    console.error("ProtectedRoute deve essere usato dentro AuthContextProvider");
    return null;
  }

  const { session, loading } = authContext;

  // 1. Fase di caricamento (mentre Supabase verifica il token)
  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#E8F4F4]">
        <Loader2 className="h-12 w-12 animate-spin text-[#006B6B]" />
        <p className="mt-4 font-bold text-[#006B6B] uppercase tracking-widest animate-pulse">
          Verifica identità...
        </p>
      </div>
    );
  }

  // 2. Se non c'è una sessione attiva dopo il caricamento, reindirizza al login
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // 3. Se loggato, mostra il contenuto della rotta
  return <Outlet />;
}