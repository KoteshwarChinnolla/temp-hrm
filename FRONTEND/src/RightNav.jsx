import React from 'react'
import { Bell, Maximize } from "lucide-react";
const RightNav = () => {
  return (
    <div className="flex items-center gap-6">
        {/* Fullscreen Icon */}
        <Maximize className="w-5 h-5 cursor-pointer" />

        <img
            src="https://flagcdn.com/us.svg"
            alt="US Flag"
            className="w-6 h-4 object-cover rounded-sm"
        />

        {/* Notification Bell */}
        <div className="relative">
          <Bell className="w-5 h-5 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full" />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 pr-5">
          <span className="font-semibold text-sm">Ella Jones</span>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
  )
}

export default RightNav
