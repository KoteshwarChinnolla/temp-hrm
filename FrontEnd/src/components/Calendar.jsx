import React, { useState, useEffect } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [selectedCalendars, setSelectedCalendars] = useState({
    Work: false,
    Personal: false,
    Important: false,
    Travel: false,
    Friends: false,
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    calendar: "Work",
    time: "",
    date: new Date(),
  });
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    return savedEvents
      ? JSON.parse(savedEvents).map((event) => ({
          ...event,
          date: new Date(event.date),
        }))
      : [
          {
            id: 1,
            title: "Team Meeting",
            date: new Date(2024, 3, 15),
            calendar: "Work",
            color: "blue",
          },
          {
            id: 2,
            title: "Doctor Appointment",
            date: new Date(2024, 3, 20),
            calendar: "Personal",
            color: "green",
          },
          {
            id: 3,
            title: "Project Deadline",
            date: new Date(2024, 3, 25),
            calendar: "Important",
            color: "red",
          },
          {
            id: 4,
            title: "Vacation",
            date: new Date(2024, 3, 10),
            calendar: "Travel",
            color: "orange",
          },
          {
            id: 5,
            title: "Birthday Party",
            date: new Date(2024, 3, 28),
            calendar: "Friends",
            color: "purple",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const calendarColors = {
    Work: "blue",
    Personal: "green",
    Important: "red",
    Travel: "orange",
    Friends: "purple",
  };

  const handleDateChange = (date, isPicker = false) => {
    const setter = isPicker ? setDatePickerDate : setCurrentDate;
    setter((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + date);
      return newDate;
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const days = [];
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setNewEvent((prev) => ({
      ...prev,
      date: date,
      time: `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`,
    }));
    setIsDatePickerOpen(false);
    setIsAddEventOpen(true);
  };

  const handleAddEvent = () => {
    if (newEvent.title && selectedDate) {
      const [hours, minutes] = newEvent.time.split(":").map(Number);
      const eventDate = new Date(selectedDate);
      eventDate.setHours(hours, minutes);

      const event = {
        id: Date.now(),
        title: newEvent.title,
        description: newEvent.description,
        date: eventDate,
        calendar: newEvent.calendar,
        color: calendarColors[newEvent.calendar],
      };

      setEvents((prev) => [...prev, event]);
      handleCloseAddEvent();
    }
  };

  const handleCloseAddEvent = () => {
    setIsAddEventOpen(false);
    setNewEvent({
      title: "",
      description: "",
      calendar: "Work",
      time: "",
      date: new Date(),
    });
    setSelectedDate(null);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        selectedCalendars[event.calendar]
      );
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow p-4">
        <button
          onClick={() => setIsDatePickerOpen(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold"
        >
          Add Event
        </button>
        <h2 className="mt-6 text-lg font-medium">My Calendars</h2>
        <ul className="space-y-2 mt-2">
          {Object.entries(selectedCalendars).map(([calendar, isSelected]) => (
            <li key={calendar} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() =>
                  setSelectedCalendars((prev) => ({
                    ...prev,
                    [calendar]: !prev[calendar],
                  }))
                }
                className="form-checkbox text-blue-600"
              />
              <span
                className={`${isSelected ? "font-medium" : "text-gray-500"}`}
              >
                {calendar}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        {/* Today's Date Display */}
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {new Date().toLocaleString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleDateChange(-1)}
              className="px-2 py-1 rounded hover:bg-gray-200"
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="bg-purple-200 text-purple-700 font-medium px-4 py-1 rounded"
            >
              today
            </button>
            <button
              onClick={() => handleDateChange(1)}
              className="px-2 py-1 rounded hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={currentDate.getMonth()}
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setMonth(parseInt(e.target.value));
                setCurrentDate(newDate);
              }}
              className="px-3 py-1 border rounded-md"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2000, i, 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <select
              value={currentDate.getFullYear()}
              onChange={(e) => {
                const newDate = new Date(currentDate);
                newDate.setFullYear(parseInt(e.target.value));
                setCurrentDate(newDate);
              }}
              className="px-3 py-1 border rounded-md"
            >
              {Array.from({ length: 15 }, (_, i) => {
                const year = new Date().getFullYear() - 5 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-300">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-white text-center font-semibold py-2">
              {day}
            </div>
          ))}
          {days.map((day, i) => {
            const dayEvents = getEventsForDate(day.date);
            return (
              <div
                key={i}
                onClick={() => handleDateSelect(day.date)}
                className={`h-24 bg-white p-1 text-sm relative ${
                  !day.isCurrentMonth ? "text-gray-400" : ""
                } ${
                  isToday(day.date)
                    ? "bg-purple-100 border-2 border-purple-500"
                    : ""
                } cursor-pointer hover:bg-gray-50`}
              >
                <div
                  className={`${
                    isToday(day.date) ? "font-bold text-purple-700" : ""
                  }`}
                >
                  {day.date.getDate()}
                </div>
                <div className="absolute bottom-1 left-1 right-1 space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="group relative text-white text-xs px-1 py-0.5 rounded truncate"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event.id);
                        }}
                        className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white hover:text-red-200"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Select Date for Event</h2>
                <button
                  onClick={() => setIsDatePickerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <select
                    value={datePickerDate.getMonth()}
                    onChange={(e) => {
                      const newDate = new Date(datePickerDate);
                      newDate.setMonth(parseInt(e.target.value));
                      setDatePickerDate(newDate);
                    }}
                    className="px-3 py-1 border rounded-md"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {new Date(2000, i, 1).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                  <select
                    value={datePickerDate.getFullYear()}
                    onChange={(e) => {
                      const newDate = new Date(datePickerDate);
                      newDate.setFullYear(parseInt(e.target.value));
                      setDatePickerDate(newDate);
                    }}
                    className="px-3 py-1 border rounded-md"
                  >
                    {Array.from({ length: 15 }, (_, i) => {
                      const year = new Date().getFullYear() - 5 + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-sm"
                    >
                      {day}
                    </div>
                  )
                )}
                {getDaysInMonth(datePickerDate).map((day, i) => (
                  <div
                    key={i}
                    onClick={() => handleDateSelect(day.date)}
                    className={`p-2 text-center cursor-pointer rounded ${
                      !day.isCurrentMonth ? "text-gray-400" : ""
                    } ${
                      isToday(day.date)
                        ? "bg-purple-100 font-bold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {day.date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isAddEventOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Add Event for {selectedDate?.toLocaleDateString()}
                </h2>
                <button
                  onClick={handleCloseAddEvent}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calendar
                  </label>
                  <select
                    value={newEvent.calendar}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, calendar: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {Object.keys(selectedCalendars).map((calendar) => (
                      <option key={calendar} value={calendar}>
                        {calendar}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                    placeholder="Enter event description"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCloseAddEvent}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}