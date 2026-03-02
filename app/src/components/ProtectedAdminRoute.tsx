import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedAdminRoute() {
  const { session, authReady, isAdmin } = UserAuth();

  if (!authReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#E8F4F4]">
        <Loader2 className="h-12 w-12 animate-spin text-[#006B6B]" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />;
}