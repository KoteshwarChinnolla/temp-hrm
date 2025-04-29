import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Clipboard, CheckSquare, Calendar, Contact, Users,
  Settings, LogOut
} from "lucide-react";
import img from "../assets/profile.png";
import { IoPeople } from "react-icons/io5";
import { BsCupHot } from "react-icons/bs";
import { PiToolboxDuotone } from "react-icons/pi";
import { FiClipboard } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { BiSolidReport } from "react-icons/bi";
import { FcReading } from "react-icons/fc";
import { FaReacteurope, FaReadme } from "react-icons/fa";
import { GrDocumentTime } from "react-icons/gr";

const adminMenuItems = [
  { icon: <Home size={20} />, text: "Dashboard", to: "/dashboard" },
  
  { icon: <Clipboard size={20} />, text: "Projects", to: "/projects" },
  { icon: <CheckSquare size={20} />, text: "Attendance", to: "/Adminattendance" },
  { icon: <CheckSquare size={20} />, text: "Monthly Attendance", to: "/attendance/sheet" },
  { icon: <Calendar size={20} />, text: "Calendar", to: "/calender" },
  { icon: <IoPeople size={20} />, text: "Leaders", to: "/leaders" },
  { icon: <Contact size={20} />, text: "Contact", to: "/contacts" },
  { icon: <Users size={20} />, text: "Employees", to: "/employees/all" },
  { icon: <LuCalendar size={20} />, text: "Leave Management", to: "/leavemanagement" },
  { icon: <GrDocumentTime size={20} />, text: "Shift Managment", to: "/shiftad" },
  { icon: <BsCupHot size={20} />, text: "Holidays", to: "/holidays" },
  { icon: <FiClipboard size={20} />, text: "Payroll", to: "/payroll" },
  { icon: <PiToolboxDuotone size={20} />, text: "Departments", to: "/departments" },
  { icon: <FaReadme size={20} />, text: "Training", to: "/training" },
  { icon: <BiSolidReport size={20} />, text: "Reports", to: "/reports" },
  { icon: <Settings size={20} />, text: "Settings", to: "/settings" },
];

const AdminSidebar = ({ isExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSubMenu = (text) => {
    setOpenMenu((prev) => (prev === text ? null : text));
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear saved login state
    navigate("/"); // Redirect to login
    window.location.reload(); // Optional: reload to reset app state
  };

  return (
    <div className={`h-100vh bg-white text-black flex flex-col transition-all duration-300 ${isExpanded ? "w-64" : "w-16"} group hover:w-64 overflow-y-auto`}>
      <div className="flex-1 overflow-y-auto">
        {/* Profile */}
        <div className="flex flex-col items-center mt-4">
          <figure className="flex flex-col items-center">
            <img src={img} className="w-16 h-16 rounded-full" alt="Admin" />
            <figcaption className="mt-2 text-sm font-semibold hidden group-hover:block">Admin</figcaption>
          </figure>
        </div>

        {/* Main Menu */}
        <nav className="mt-6 space-y-2 px-2">
          {adminMenuItems.map((item, index) => (
            <div key={index}>
              <div
                className="flex items-center justify-between p-3 rounded hover:bg-gray-300 cursor-pointer transition-all"
                onClick={() => item.hasSubItems && toggleSubMenu(item.text)}
              >
                <Link to={item.to} className="flex items-center gap-3 text-black no-underline" style={{ textDecoration: "none" }}>
                  <span>{item.icon}</span>
                  <span className={`ml-2 text-sm ${isExpanded ? "inline" : "hidden group-hover:inline"}`}>
                    {item.text}
                  </span>
                </Link>
              </div>
              {item.hasSubItems && openMenu === item.text && (
                <div className="ml-10 mt-1 space-y-1">
                  {item.subItems.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      to={sub.to}
                      style={{ textDecoration: "none" }}
                      className={`block text-sm p-2 rounded hover:bg-gray-100 ${location.pathname === sub.to ? "text-blue-600 font-semibold" : ""}`}
                    >
                      {sub.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div
        className="flex items-center gap-3 p-4 mt-auto cursor-pointer hover:bg-gray-300 transition-all"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span className={`text-sm ${isExpanded ? "inline" : "hidden group-hover:inline"}`}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default AdminSidebar;
