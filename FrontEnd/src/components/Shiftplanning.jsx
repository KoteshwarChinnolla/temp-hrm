"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Edit,
  Trash,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Bell,
  CheckCircle,
  AlertCircle,
  CalendarIcon,
} from "lucide-react";

export default function ShiftManagement() {
  // State for current view
  const [view, setView] = useState("schedule"); // schedule, employees, reports
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [createShiftModal, setCreateShiftModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Ray Tanaka requested time off for next week",
      type: "request",
      read: false,
    },
    {
      id: 2,
      message: "New shift schedule published for May",
      type: "info",
      read: false,
    },
    {
      id: 3,
      message: "Overtime alert: Alberto Burgos (48hrs this week)",
      type: "alert",
      read: true,
    },
  ]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Current date and week
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(new Date()));

  // Employees data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ray Tanaka",
      position: "Cashier",
      department: "Front End",
      avatar: "RT",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Alberto Burgos",
      position: "Stocker",
      department: "Inventory",
      avatar: "AB",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      position: "Manager",
      department: "Management",
      avatar: "SJ",
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Lilly Georgsen",
      position: "Cashier",
      department: "Front End",
      avatar: "LG",
      color: "bg-yellow-500",
    },
    {
      id: 5,
      name: "Aaron Buxton",
      position: "Stocker",
      department: "Inventory",
      avatar: "AB",
      color: "bg-red-500",
    },
    {
      id: 6,
      name: "Maria Rodriguez",
      position: "Customer Service",
      department: "Front End",
      avatar: "MR",
      color: "bg-indigo-500",
    },
    {
      id: 7,
      name: "John Smith",
      position: "Security",
      department: "Operations",
      avatar: "JS",
      color: "bg-pink-500",
    },
  ]);

  // Departments
  const departments = [
    "Front End",
    "Inventory",
    "Management",
    "Operations",
    "Back End",
  ];

  // Shifts data
  const [shifts, setShifts] = useState([
    {
      id: 1,
      employeeId: 1,
      day: 0,
      start: "09:00",
      end: "17:00",
      department: "Front End",
      position: "Cashier",
    },
    {
      id: 2,
      employeeId: 2,
      day: 0,
      start: "12:00",
      end: "20:00",
      department: "Inventory",
      position: "Stocker",
    },
    {
      id: 3,
      employeeId: 3,
      day: 0,
      start: "08:00",
      end: "16:00",
      department: "Management",
      position: "Manager",
    },
    {
      id: 4,
      employeeId: 4,
      day: 0,
      start: "16:00",
      end: "00:00",
      department: "Front End",
      position: "Cashier",
    },
    {
      id: 5,
      employeeId: 1,
      day: 1,
      start: "09:00",
      end: "17:00",
      department: "Front End",
      position: "Cashier",
    },
    {
      id: 6,
      employeeId: 2,
      day: 1,
      start: "12:00",
      end: "20:00",
      department: "Inventory",
      position: "Stocker",
    },
    {
      id: 7,
      employeeId: 5,
      day: 1,
      start: "16:00",
      end: "00:00",
      department: "Inventory",
      position: "Stocker",
    },
    {
      id: 8,
      employeeId: 6,
      day: 1,
      start: "10:00",
      end: "18:00",
      department: "Front End",
      position: "Customer Service",
    },
    {
      id: 9,
      employeeId: 1,
      day: 2,
      start: "09:00",
      end: "17:00",
      department: "Front End",
      position: "Cashier",
    },
    {
      id: 10,
      employeeId: 3,
      day: 2,
      start: "08:00",
      end: "16:00",
      department: "Management",
      position: "Manager",
    },
    {
      id: 11,
      employeeId: 7,
      day: 2,
      start: "14:00",
      end: "22:00",
      department: "Operations",
      position: "Security",
    },
    {
      id: 12,
      employeeId: 2,
      day: 3,
      start: "12:00",
      end: "20:00",
      department: "Inventory",
      position: "Stocker",
    },
    {
      id: 13,
      employeeId: 4,
      day: 3,
      start: "09:00",
      end: "17:00",
      department: "Front End",
      position: "Cashier",
    },
    {
      id: 14,
      employeeId: 6,
      day: 3,
      start: "10:00",
      end: "18:00",
      department: "Front End",
      position: "Customer Service",
    },
    {
      id: 15,
      employeeId: 1,
      day: 4,
      start: "09:00",
      end: "17:00",
      department: "Front End",
      position: "Cashier",
    },
    {
      id: 16,
      employeeId: 3,
      day: 4,
      start: "08:00",
      end: "16:00",
      department: "Management",
      position: "Manager",
    },
    {
      id: 17,
      employeeId: 5,
      day: 4,
      start: "16:00",
      end: "00:00",
      department: "Inventory",
      position: "Stocker",
    },
    {
      id: 18,
      employeeId: 7,
      day: 4,
      start: "14:00",
      end: "22:00",
      department: "Operations",
      position: "Security",
    },
    {
      id: 19,
      employeeId: 2,
      day: 5,
      start: "10:00",
      end: "18:00",
      department: "Inventory",
      position: "Stocker",
    },
    {
      id: 20,
      employeeId: 4,
      day: 5,
      start: "16:00",
      end: "00:00",
      department: "Front End",
      position: "Cashier",
    },
    {
      id: 21,
      employeeId: 6,
      day: 6,
      start: "10:00",
      end: "18:00",
      department: "Front End",
      position: "Customer Service",
    },
    {
      id: 22,
      employeeId: 7,
      day: 6,
      start: "14:00",
      end: "22:00",
      department: "Operations",
      position: "Security",
    },
  ]);

  // Get all days in a month for shift selection
  const getMonthDaysForShift = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        dayIndex: i - 1, // 0-based index for the shift.day property
      });
    }
    return days;
  };

  // New shift form
  const [newShift, setNewShift] = useState({
    employeeId: "",
    startDay: 0,
    endDay: 0,
    start: "09:00",
    end: "17:00",
    department: "Front End",
    position: "Cashier",
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
  });

  // Filter states
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // New employee form
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "Front End",
    status: "Active",
  });

  // Add view type state
  const [calendarView, setCalendarView] = useState("week"); // "week" or "month"

  // Add state for selected month and year in schedule view
  const [selectedScheduleMonth, setSelectedScheduleMonth] = useState(
    new Date().getMonth()
  );
  const [selectedScheduleYear, setSelectedScheduleYear] = useState(
    new Date().getFullYear()
  );

  // Get all months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get years (current year and next year)
  const years = [new Date().getFullYear(), new Date().getFullYear() + 1];

  // Get days for selected month and year
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === parseInt(month)) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Helper function to get week dates
  function getWeekDates(date) {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const weekStart = new Date(date);
    weekStart.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(weekStart);
      newDate.setDate(weekStart.getDate() + i);
      weekDates.push(newDate);
    }

    return weekDates;
  }

  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
    setCurrentWeek(getWeekDates(newDate));
  };

  // Navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
    setCurrentWeek(getWeekDates(newDate));
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Format day for display
  const formatDay = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // Get employee by ID
  const getEmployee = (id) => {
    return employees.find((emp) => emp.id === id);
  };

  // Handle creating a new shift
  const handleCreateShift = () => {
    if (newShift.employeeId && newShift.startDay <= newShift.endDay) {
      const newShifts = [];
      for (let day = newShift.startDay; day <= newShift.endDay; day++) {
        const newId =
          shifts.length > 0
            ? Math.max(...shifts.map((s) => s.id)) + newShifts.length + 1
            : 1;
        const newShiftObj = {
          ...newShift,
          id: newId,
          day: day,
          employeeId: Number.parseInt(newShift.employeeId),
        };
        newShifts.push(newShiftObj);
      }

      setShifts([...shifts, ...newShifts]);
      setCreateShiftModal(false);
      setNewShift({
        employeeId: "",
        startDay: 0,
        endDay: 0,
        start: "09:00",
        end: "17:00",
        department: "Front End",
        position: "Cashier",
        selectedMonth: new Date().getMonth(),
        selectedYear: new Date().getFullYear(),
      });
    }
  };

  // Handle deleting a shift
  const handleDeleteShift = (shiftId) => {
    setShifts(shifts.filter((shift) => shift.id !== shiftId));
  };

  // Get shifts for a specific day
  const getShiftsForDay = (day) => {
    return shifts.filter((shift) => shift.day === day);
  };

  // Get shifts for a specific employee
  const getShiftsForEmployee = (employeeId) => {
    return shifts.filter((shift) => shift.employeeId === employeeId);
  };

  // Calculate total hours for an employee
  const calculateTotalHours = (employeeId) => {
    const employeeShifts = getShiftsForEmployee(employeeId);
    let totalMinutes = 0;

    employeeShifts.forEach((shift) => {
      const startParts = shift.start.split(":").map(Number);
      const endParts = shift.end.split(":").map(Number);

      const startMinutes = startParts[0] * 60 + startParts[1];
      let endMinutes = endParts[0] * 60 + endParts[1];

      // Handle overnight shifts
      if (endMinutes < startMinutes) {
        endMinutes += 24 * 60;
      }

      totalMinutes += endMinutes - startMinutes;
    });

    return Math.round(totalMinutes / 60);
  };

  // Filter employees based on search and department
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All" || employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  // Handle input change for new shift form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShift((prev) => {
      const updates = {
        ...prev,
        [name]: value,
      };

      // Reset start and end day when month or year changes
      if (name === "selectedMonth" || name === "selectedYear") {
        const days = getDaysInMonth(
          name === "selectedMonth" ? value : prev.selectedMonth,
          name === "selectedYear" ? value : prev.selectedYear
        );
        updates.startDay = "0";
        updates.endDay = "0";
      }

      // Ensure end day is not before start day
      if (name === "startDay" && parseInt(value) > parseInt(prev.endDay)) {
        updates.endDay = value;
      }

      return updates;
    });
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle creating a new employee
  const handleCreateEmployee = () => {
    if (newEmployee.name && newEmployee.position) {
      const newId =
        employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      const newEmployeeObj = {
        id: newId,
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        avatar: newEmployee.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
        color: `bg-${
          ["blue", "green", "purple", "yellow", "red", "indigo", "pink"][
            Math.floor(Math.random() * 7)
          ]
        }-500`,
      };

      setEmployees([...employees, newEmployeeObj]);
      setCreateEmployeeModal(false);
      setNewEmployee({
        name: "",
        position: "",
        department: "Front End",
        status: "Active",
      });
    }
  };

  const handleEmployeeInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  // Format month for display
  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Function to handle month change in schedule view
  const handleScheduleMonthChange = (month) => {
    setSelectedScheduleMonth(parseInt(month));
    const newDate = new Date(selectedScheduleYear, parseInt(month), 1);
    setCurrentDate(newDate);
    setCurrentWeek(getWeekDates(newDate));
  };

  // Function to handle year change in schedule view
  const handleScheduleYearChange = (year) => {
    setSelectedScheduleYear(parseInt(year));
    const newDate = new Date(parseInt(year), selectedScheduleMonth, 1);
    setCurrentDate(newDate);
    setCurrentWeek(getWeekDates(newDate));
  };

  return (
    <div
      className={`flex h-screen bg-gray-10 text-gray-800 ${
        createShiftModal || createEmployeeModal ? "opacity-100" : ""
      }`}
    >
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Shift Management</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView("schedule")}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === "schedule"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setView("employees")}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === "employees"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Employees
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Schedule View */}
          {view === "schedule" && (
            <div className="bg-white rounded-xl shadow-sm">
              {/* Schedule header */}
              <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={goToPreviousWeek}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex items-center space-x-3">
                    <select
                      value={selectedScheduleMonth}
                      onChange={(e) =>
                        handleScheduleMonthChange(e.target.value)
                      }
                      className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedScheduleYear}
                      onChange={(e) => handleScheduleYearChange(e.target.value)}
                      className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={goToNextWeek}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setCalendarView("week")}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        calendarView === "week"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setCalendarView("month")}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        calendarView === "month"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Month
                    </button>
                  </div>

                  <div className="relative">
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
                    >
                      <option value="All">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => setCreateShiftModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center shadow-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shift
                  </button>
                </div>
              </div>

              {/* Calendar grid with fixed first column */}
              <div className="relative">
                <div className="flex">
                  {/* Fixed Employee Column */}
                  <div className="sticky left-0 z-40 bg-white flex-none w-[200px]">
                    {/* Employee Header */}
                    <div className="border-b border-r border-gray-200 h-[72px] flex items-center">
                      <div className="p-4 font-medium text-gray-500">
                        Employee
                      </div>
                    </div>

                    {/* Employee Names Column */}
                    {filteredEmployees.map((employee, index) => (
                      <div
                        key={employee.id}
                        className={`h-[80px] flex items-center border-r border-b border-gray-200 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <div className="p-4 flex items-center w-full">
                          <div
                            className={`w-10 h-10 rounded-full ${employee.color} text-white flex items-center justify-center mr-3 shadow-sm flex-shrink-0`}
                          >
                            {employee.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">
                              {employee.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {employee.position}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Scrollable Content */}
                  <div className="overflow-x-auto flex-1">
                    <div
                      className={`${
                        calendarView === "month"
                          ? "min-w-[3720px]"
                          : "min-w-[840px]"
                      }`}
                    >
                      {/* Days Header */}
                      <div
                        className={`grid ${
                          calendarView === "week"
                            ? "grid-cols-7"
                            : "grid-cols-31"
                        } border-b border-gray-200`}
                      >
                        {calendarView === "week"
                          ? currentWeek.map((date, index) => (
                              <div
                                key={index}
                                className="h-[72px] flex flex-col justify-center items-center border-r border-gray-200"
                              >
                                <div className="font-medium">
                                  {formatDay(date)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatDate(date)}
                                </div>
                              </div>
                            ))
                          : getMonthDaysForShift(currentDate).map(
                              ({ date, dayIndex }) => (
                                <div
                                  key={dayIndex}
                                  className="h-[72px] flex flex-col justify-center items-center border-r border-gray-200"
                                >
                                  <div className="font-medium">
                                    {formatDay(date)}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {formatDate(date)}
                                  </div>
                                </div>
                              )
                            )}
                      </div>

                      {/* Schedule Grid */}
                      {filteredEmployees.map((employee, index) => (
                        <div
                          key={employee.id}
                          className={`grid ${
                            calendarView === "week"
                              ? "grid-cols-7"
                              : "grid-cols-31"
                          } ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } border-b border-gray-200`}
                        >
                          {calendarView === "week"
                            ? [0, 1, 2, 3, 4, 5, 6].map((day) => (
                                <div
                                  key={day}
                                  className="h-[80px] p-3 relative border-r border-gray-200"
                                >
                                  {shifts
                                    .filter(
                                      (shift) =>
                                        shift.employeeId === employee.id &&
                                        shift.day === day
                                    )
                                    .map((shift) => (
                                      <div
                                        key={shift.id}
                                        className={`p-3 rounded-lg mb-2 text-sm shadow-sm ${
                                          shift.department === "Front End"
                                            ? "bg-blue-50"
                                            : shift.department === "Inventory"
                                            ? "bg-green-50"
                                            : shift.department === "Management"
                                            ? "bg-purple-50"
                                            : "bg-red-50"
                                        }`}
                                      >
                                        <div className="flex justify-between items-start">
                                          <span className="font-medium">
                                            {shift.start} - {shift.end}
                                          </span>
                                          <button
                                            onClick={() =>
                                              handleDeleteShift(shift.id)
                                            }
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                          >
                                            <Trash className="h-4 w-4" />
                                          </button>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                          {shift.position}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              ))
                            : getMonthDaysForShift(currentDate).map(
                                ({ date, dayIndex }) => (
                                  <div
                                    key={dayIndex}
                                    className="h-[80px] p-3 relative border-r border-gray-200"
                                  >
                                    {shifts
                                      .filter(
                                        (shift) =>
                                          shift.employeeId === employee.id &&
                                          shift.day === dayIndex
                                      )
                                      .map((shift) => (
                                        <div
                                          key={shift.id}
                                          className={`p-2 rounded-lg mb-1 text-xs shadow-sm ${
                                            shift.department === "Front End"
                                              ? "bg-blue-50"
                                              : shift.department === "Inventory"
                                              ? "bg-green-50"
                                              : shift.department ===
                                                "Management"
                                              ? "bg-purple-50"
                                              : "bg-red-50"
                                          }`}
                                        >
                                          <div className="flex justify-between items-start">
                                            <span className="font-medium">
                                              {shift.start} - {shift.end}
                                            </span>
                                            <button
                                              onClick={() =>
                                                handleDeleteShift(shift.id)
                                              }
                                              className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                              <Trash className="h-3 w-3" />
                                            </button>
                                          </div>
                                          <div className="text-xs text-gray-600 mt-0.5">
                                            {shift.position}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                )
                              )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Employees View */}
          {view === "employees" && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200">
                <h3 className="text-xl font-medium">Employee Directory</h3>

                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="All">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => setCreateEmployeeModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center shadow-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Employee",
                        "Position",
                        "Department",
                        "Weekly Hours",
                        "Status",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr
                        key={employee.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100 transition-colors border-b border-gray-200`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full ${employee.color} text-white flex items-center justify-center mr-3 shadow-sm`}
                            >
                              {employee.avatar}
                            </div>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm text-gray-500">
                                ID: EMP-
                                {employee.id.toString().padStart(4, "0")}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">
                            {calculateTotalHours(employee.id)} hrs
                          </div>
                          <div className="text-sm text-gray-500">
                            {getShiftsForEmployee(employee.id).length} shifts
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-800 mr-4 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors">
                            <Trash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Shift Modal */}
      {createShiftModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setCreateShiftModal(false);
            }
          }}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"></div>
            </div>

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg border-2 border-gray-100 transform transition-all">
              <div className="bg-white px-6 pt-6 pb-4">
                <h3 className="text-2xl leading-6 font-semibold text-gray-900 mb-6">
                  Create New Shift
                </h3>

                <div className="mt-2 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Employee
                    </label>
                    <select
                      name="employeeId"
                      value={newShift.employeeId}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Month
                      </label>
                      <select
                        name="selectedMonth"
                        value={newShift.selectedMonth}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        {months.map((month, index) => (
                          <option key={month} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Year
                      </label>
                      <select
                        name="selectedYear"
                        value={newShift.selectedYear}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Start Day
                      </label>
                      <select
                        name="startDay"
                        value={newShift.startDay}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        {getDaysInMonth(
                          parseInt(newShift.selectedMonth),
                          parseInt(newShift.selectedYear)
                        ).map((date, index) => (
                          <option key={index} value={index}>
                            {formatDay(date)} ({formatDate(date)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        End Day
                      </label>
                      <select
                        name="endDay"
                        value={newShift.endDay}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        {getDaysInMonth(
                          parseInt(newShift.selectedMonth),
                          parseInt(newShift.selectedYear)
                        ).map((date, index) => (
                          <option
                            key={index}
                            value={index}
                            disabled={index < parseInt(newShift.startDay)}
                          >
                            {formatDay(date)} ({formatDate(date)})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="start"
                        value={newShift.start}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="end"
                        value={newShift.end}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={newShift.department}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={newShift.position}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      placeholder="Enter position"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={handleCreateShift}
                  className="w-full sm:w-auto inline-flex justify-center rounded-lg border-0 px-6 py-3 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 transition-all shadow-lg hover:shadow-xl"
                >
                  Create Shift
                </button>
                <button
                  type="button"
                  onClick={() => setCreateShiftModal(false)}
                  className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-lg border-2 border-gray-300 px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Employee Modal */}
      {createEmployeeModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={(e) => {
            // Only close if clicking the outer container
            if (e.target === e.currentTarget) {
              setCreateEmployeeModal(false);
            }
          }}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"></div>
            </div>

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg border-2 border-gray-100 transform transition-all">
              <div className="bg-white px-6 pt-6 pb-4">
                <h3 className="text-2xl leading-6 font-semibold text-gray-900 mb-6">
                  Add New Employee
                </h3>

                <div className="mt-2 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleEmployeeInputChange}
                      className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      placeholder="Enter employee name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={newEmployee.position}
                      onChange={handleEmployeeInputChange}
                      className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      placeholder="Enter position"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={newEmployee.department}
                      onChange={handleEmployeeInputChange}
                      className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={newEmployee.status}
                      onChange={handleEmployeeInputChange}
                      className="w-full border-2 border-gray-200 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={handleCreateEmployee}
                  className="w-full sm:w-auto inline-flex justify-center rounded-lg border-0 px-6 py-3 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 transition-all shadow-lg hover:shadow-xl"
                >
                  Add Employee
                </button>
                <button
                  type="button"
                  onClick={() => setCreateEmployeeModal(false)}
                  className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-lg border-2 border-gray-300 px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
