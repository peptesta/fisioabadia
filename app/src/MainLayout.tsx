import { Outlet } from "react-router-dom";
import Navbar from "./sections/Navbar";
import FloatingButtons from "./sections/FloatingButtons";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E8F4F4]">
      {/* Navbar sempre visibile */}
      <Navbar />
      <FloatingButtons/>

      {/* Contenuto variabile delle pagine */}
      <main className="flex-1 w-full">
        <Outlet /> 
      </main>
    </div>
  );
}