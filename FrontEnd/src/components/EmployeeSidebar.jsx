import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  CheckSquare,
  Airplay,
  Users,
  Folder,
  Clipboard,
  Settings,
  MessageSquare,
  LogOut,
  Calendar,
  Mail,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import img from "../assets/profile.png";

const mainMenuItems = [
  { icon: <Home size={20} />, text: "Dashboard", to: "/dashboard" },
  { icon: <CheckSquare size={20} />, text: "Attendance", to: "/Empattendance" },
  { icon: <Clipboard size={20} />, text: "My Leaves", to: "/leaves" },
  { icon: <Users size={20} />, text: "My Team", to: "/team" },
  { icon: <Airplay size={20} />, text: "My Project", to: "/project" },
  { icon: <Folder size={20} />, text: "My Tasks", to: "/tasks" },
  { icon: <Settings size={20} />, text: "Settings", to: "/settings" },
  { icon: <MessageSquare size={20} />, text: "Chat", to: "/chat" },
];

const appsMenuItems = [
  {
    icon: <Calendar size={20} />,
    text: "Calendar",
    to: "/calendar",
    badge: "New",
  },
  {
    icon: <LogOut size={20} />,
    text: "Logout",
    to: "/",
  },
];

const EmployeeSidebar = ({ isExpanded }) => {
  return (
    <div
      className={`h-100vh bg-white text-black flex flex-col transition-all duration-300 
      ${isExpanded ? "w-64" : "w-16"} group hover:w-64 
      overflow-y-auto`}
    >
      <div className="flex-1 overflow-y-auto">
        {/* Profile */}
        <div className="flex flex-col items-center mt-4">
          <figure className="flex flex-col items-center">
            <img src={img} className="w-16 h-16 rounded-full" alt="Employee" />
            <figcaption className="mt-2 text-sm font-semibold hidden group-hover:block">
              Employee
            </figcaption>
          </figure>
        </div>

        {/* Main Menu */}
        <nav className="mt-6 space-y-2 px-2">
          {mainMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center p-3 rounded hover:bg-gray-300 transition-all text-black no-underline"
              style={{ textDecoration: "none" }}
            >
              <span>{item.icon}</span>
              <span
                className={`ml-4 text-sm ${
                  isExpanded ? "inline" : "hidden group-hover:inline"
                }`}
              >
                {item.text}
              </span>
            </Link>
          ))}
        </nav>

        {/* APPS section */}
        <div className="mt-6 px-4 text-xs font-bold text-gray-500 uppercase">
          {isExpanded ? (
            "Apps"
          ) : (
            <span className="group-hover:inline hidden">Apps</span>
          )}
        </div>
        <nav className="mt-2 space-y-2 px-2">
          {appsMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center justify-between p-3 rounded hover:bg-gray-300 text-black no-underline"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center">
                <span>{item.icon}</span>
                <span
                  className={`ml-4 text-sm ${
                    isExpanded ? "inline" : "hidden group-hover:inline"
                  }`}
                >
                  {item.text}
                </span>
              </div>

              {item.chevron && isExpanded && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
    </div>
  );
};

export default EmployeeSidebar;