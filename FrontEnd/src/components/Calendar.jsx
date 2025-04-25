import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaDownload, FaArrowLeft, FaArrowRight,FaHome  } from "react-icons/fa";

const CalendarPage = () => {
  return (
    
    
    <div className="bg-white text-shadow-black p-6 rounded-xl shadow-md bg-blend-color ">
          <div className="flex justify-between items-center">
        
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Calendar</h2>
      <div className="flex gap-2 items-center ">
                        <a href="/dashboard">
                          {" "}
                          <FaHome className="text-lg" />
                        </a>
                        <span className="text-lg">&gt;</span>
                        <span className="text-lg">Home</span>
                        <span className="text-lg">&gt;</span>
                        <span className="text-lg">My Calendar</span>
                      </div>
                    
     </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        height="auto"
        color="black"
        events={[
          {
            title: "Team Meeting",
            date: "2025-04-28",
            color: "#76ad72", // Tailwind indigo-500
          },
          {
            title: "Project Deadline",
            date: "2025-05-01",
            color: "#f52a0b", // amber-500
          },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
         
        }}
        eventDisplay="block"
      />
    </div>
  );
};

export default CalendarPage;
