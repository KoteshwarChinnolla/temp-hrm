// src/components/Navbar.jsx
import { Menu } from "lucide-react";
import RightNav from "./RightNav";
import { LuArrowDownUp } from "react-icons/lu";
import logo from "./assets/logo.png";

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  return (
    <nav
      className={`bg-white shadow-sm px-4 py-2 flex gap-4 items-center justify-between min-h-[60px] transition-all duration-300
        ${isSidebarOpen ? "ml-39 md:ml-64" : "ml-14 md:ml-16"
      }`}
    >
      {/* Logo + Hamburger */}
      <div className="flex items-center gap-2">
      
        <Menu
          onClick={onToggleSidebar}
          className="w-6 h-6 ml-3 cursor-pointer"
        />
        
      </div>

      {/* Right icons */}
      <div className="flex">
        <div className="hidden md:block">
          <RightNav />
        </div>
        <div className="md:hidden">
          <LuArrowDownUp className="w-5 h-5 text-black" />
        </div>
      </div>
    </nav>
  );
}
