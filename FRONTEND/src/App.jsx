// src/App.jsx
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar"; // Adjust path if necessary
import "./index.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className={`
               ${isSidebarOpen ? "ml-40 md:ml-64" : "ml-16"}
               bg-gray-100`}>
          <h1 className="text-2xl font-bold">This is dashboard</h1>
          <p className="mt-2">All your dashboard content goes here.</p>
        </main>
        
      </div>
    </div>
  );
}

export default App;
