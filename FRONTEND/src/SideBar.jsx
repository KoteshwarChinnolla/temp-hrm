import {
    LuLayoutDashboard,
    LuUser,
    LuSettings,
    LuProjector,
    LuCalendar,
    LuFileText,
    LuMenu,
  } from "react-icons/lu";
  import profile from "./assets/profile.png";
  import logo from "./assets/logo.png"
  
  export default function Sidebar({ isSidebarOpen }) {
    return (
      <>
        {/* Menu Toggle Button - always visible */}
       
  
        {/* Sidebar */}
        <aside
          className={`h-screen bg-white shadow-md fixed top-0 left-0 z-40 transition-all duration-300
            ${ isSidebarOpen ? "w-40 md:w-64" : "w-14 md:w-16"
                
          }`}
        >
          <div className="flex items-center justify-center p-4">
            {isSidebarOpen ? (
              <h2 className="text-xl font-bold text-gray-800">ACS</h2>
            ) : (
              <img src={logo} alt="Logo" className="w-6 h-7" />
            
            )}
          </div>
  
          {isSidebarOpen && (
            <div className="flex flex-col items-center text-center p-4">
              <img
                src={profile}
                className="w-16 h-16 rounded-full mb-2"
                alt="Profile"
              />
              <h3 className="font-medium text-gray-700">Sarah Smith</h3>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
          )}
  
          <div className="mt-4 px-2">
            <p className={`text-xs text-gray-400 ${!isSidebarOpen && "hidden"}`}>
              MAIN
            </p>
            <ul className="flex flex-col gap-2 mt-2">
              <SidebarItem icon={<LuLayoutDashboard />} label="Dashboard" open={isSidebarOpen} />
              <SidebarItem icon={<LuProjector />} label="Projects" open={isSidebarOpen} />
              <SidebarItem icon={<LuUser />} label="Employees" open={isSidebarOpen} />
              <SidebarItem icon={<LuCalendar />} label="Leave Management" open={isSidebarOpen} />
              <SidebarItem icon={<LuFileText />} label="Attendance" open={isSidebarOpen} />
            </ul>
          </div>
  
          <div className="flex-grow" />
          <div className="p-4">
            <SidebarItem icon={<LuSettings />} label="Settings" open={isSidebarOpen} />
          </div>
        </aside>
      </>
    );
  }
  
  function SidebarItem({ icon, label, open }) {
    return (
      <li
        className={`flex items-center gap-4 p-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-700 transition-all duration-200 ${
          open ? "justify-start" : "justify-center"
        }`}
      >
        <span>{icon}</span>
        {open && <span className="text-sm">{label}</span>}
      </li>
    );
  }
  