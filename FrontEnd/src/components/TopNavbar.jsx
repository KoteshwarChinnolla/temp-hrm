import React, { useState } from "react";
import { Maximize, Minimize } from "lucide-react";
import Flag from "react-world-flags";
import img1 from "../assets/logo.png";
import img from "../assets/profile.png";

const TopNavbar = ({ isExpanded, setIsExpanded }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.mozCancelFullscreen?.() ||
        document.msExitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.() ||
        document.documentElement.webkitRequestFullscreen?.() ||
        document.documentElement.mozRequestFullScreen?.() ||
        document.documentElement.msRequestFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 w-full flex items-center justify-between flex-wrap">
      {/* Left section: Logo & sidebar toggle */}
      <div className="flex items-center gap-4">
        <a href="/dashboard">
          <img src={img1} className="w-10 sm:w-12" alt="Logo" />
        </a>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-black focus:outline-none"
        >
          <div className="space-y-1">
            <div className="w-5 h-0.5 bg-black rounded" />
            <div className="w-5 h-0.5 bg-black rounded" />
            <div className="w-5 h-0.5 bg-black rounded" />
          </div>
        </button>
      </div>

      {/* Right section: Fullscreen, Flag, Profile */}
      <div className="flex items-center gap-4 mt-3 sm:mt-0">
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

        <button className="flex items-center text-black p-2 hover:bg-gray-200 rounded-full">
          <img src={img} className="w-9 sm:w-10 rounded-full" alt="Profile" />
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
