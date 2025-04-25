import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const employees = [
  { name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Robert Lee", avatar: "https://i.pravatar.cc/40?img=3" },
];

// Generate random attendance ('P', 'A', 'L') or '-' on weekends
const generateAttendance = (year, month) => {
  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = dayjs(`${year}-${month}-${i + 1}`);
    if (day.day() === 0 || day.day() === 6) return "-"; // Sunday or Saturday
    const status = ["P", "A", "L"];
    return status[Math.floor(Math.random() * status.length)];
  });
};

const AttendanceSheet = () => {
  const currentDate = dayjs();
  const [month, setMonth] = useState(currentDate.format("MM"));
  const [year, setYear] = useState(currentDate.format("YYYY"));
  const [attendanceData, setAttendanceData] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    // Update days and attendance data whenever the month or year changes
    const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
    const updatedDays = Array.from({ length: daysInMonth }, (_, i) => {
      const date = dayjs(`${year}-${month}-${i + 1}`);
      return {
        day: i + 1,
        isWeekend: date.day() === 0 || date.day() === 6,
      };
    });

    const updatedAttendanceData = employees.map((emp) => ({
      ...emp,
      attendance: generateAttendance(year, month),
    }));

    setDays(updatedDays);
    setAttendanceData(updatedAttendanceData);
  }, [month, year]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen overflow-auto">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        {/* Month and Year Display */}
        <h1 className="text-xl font-bold">
          Employee Attendance - {dayjs(`${year}-${month}`).format("MMMM YYYY")}
        </h1>

        {/* Blueprint for P, A, L */}
        <div className="flex items-center gap-8">
          <div className="text-sm font-semibold text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-center">P</span> - Present
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full text-center">A</span> - Absent
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full text-center">L</span> - Leave
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-gray-100 text-gray-700 rounded-full text-center">-</span> - Weekend
            </div>
          </div>
        </div>
      </div>

      {/* Month and Year Selection Dropdowns */}
      <div className="flex justify-end gap-4 mb-4">
        {/* Month Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="month" className="font-semibold text-sm">Select Month:</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const m = dayjs().month(i).format("MM");
              return (
                <option key={m} value={m}>
                  {dayjs().month(i).format("MMMM")}
                </option>
              );
            })}
          </select>
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-semibold text-sm">Select Year:</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const y = currentDate.year() - 2 + i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded overflow-auto">
        <table className="min-w-[1000px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Employee</th>
              {days.map(({ day }) => (
                <th key={day} className="p-2 border text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((emp, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{idx + 1}</td>
                <td className="border p-2 flex items-center gap-2">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-6 h-6 rounded-full"
                  />
                  {emp.name}
                </td>
                {emp.attendance.map((status, i) => (
                  <td
                    key={i}
                    className={`border text-center p-1 ${
                      status === "-"
                        ? "text-gray-400 font-semibold"
                        : "font-medium"
                    }`}
                  >
                    {status !== "-" ? (
                      <span
                        className={`inline-block w-6 h-6 leading-6 text-xs rounded-full ${
                          status === "P"
                            ? "bg-green-100 text-green-700"
                            : status === "A"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {status}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;
