import React, { useState } from "react";
import { Maximize, Minimize } from "lucide-react"; // Icons
import Flag from "react-world-flags"; // Flag component
import img1 from "../assets/logo.png"; // Logo image
import img from "../assets/profile.png"; // Profile image

const TopNavbar = ({ isExpanded, setIsExpanded }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (isFullscreen) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }

    // Toggle fullscreen state
    setIsFullscreen(!isFullscreen);
  };

  return (
    <nav className="bg-white flex justify-between items-center text-black p-3 w-full">
      {/* Left section: Logo and Menu Toggle */}
      <div className="flex items-center gap-4">
        <a href="/dashboard">
          <img src={img1} className="w-10" alt="Logo" />
        </a>
        <button
          onClick={() => setIsExpanded(!isExpanded)} // Toggle sidebar state
          className="text-black focus:outline-none"
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-black rounded" />
            <div className="w-6 h-0.5 bg-black rounded" />
            <div className="w-6 h-0.5 bg-black rounded" />
          </div>
        </button>
      </div>

      {/* Right section: Fullscreen toggle, Flag and Profile */}
      <div className="flex items-center gap-4">
        <button onClick={toggleFullscreen} className="text-black">
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
        <Flag
          code="us"
          style={{
            width: 30,
            height: 18,
            borderRadius: "4px",
          }}
        />
        <button className="flex items-center text-black p-2 hover:bg-gray-200  hover:border-0 rounded-2xl">
         
          <img src={img} className="w-10" alt="" />
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
