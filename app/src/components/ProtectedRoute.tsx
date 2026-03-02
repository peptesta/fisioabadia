import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const { session, authReady } = UserAuth();

  if (!authReady) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#E8F4F4]">
        <Loader2 className="h-12 w-12 animate-spin text-[#006B6B]" />
        <p className="mt-4 font-bold text-[#006B6B] uppercase tracking-widest animate-pulse">
          Verifica identità...
        </p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}