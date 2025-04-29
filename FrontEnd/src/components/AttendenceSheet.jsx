import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const employees = [
  { name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Robert Lee", avatar: "https://i.pravatar.cc/40?img=3" },
];

// Removed "A" from here
const generateAttendance = (year, month) => {
  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = dayjs(`${year}-${month}-${i + 1}`);
    if (day.day() === 0 || day.day() === 6) return "-";
    const status = ["P", "L"]; // Only Present and Leave
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

  const calculateStats = (attendance) => {
    const workingDays = attendance.filter((day) => day !== "-").length;
    const presentDays = attendance.filter((day) => day === "P").length;
    const leaveDays = attendance.filter((day) => day === "L").length;
    return { workingDays, presentDays, leaveDays };
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
        <h1 className="text-xl font-bold">
          Employee Attendance - {dayjs(`${year}-${month}`).format("MMMM YYYY")}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700">
          {/* Only Present, Leave, and Weekend badges */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full text-center text-xs font-bold">
              P
            </span>{" "}
            Present
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full text-center text-xs font-bold">
              L
            </span>{" "}
            Leave
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-gray-100 text-gray-700 rounded-full text-center text-xs font-bold">
              -
            </span>{" "}
            Weekend
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-end mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="month" className="font-medium text-sm">
            Select Month:
          </label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
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

        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-medium text-sm">
            Select Year:
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
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

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg overflow-auto">
        <table className="min-w-[800px] w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-gray-200 sticky top-0 z-10">
              <th className="border px-2 py-2">#</th>
              <th className="border px-2 py-2 text-left">Employee</th>
              <th className="border px-2 py-2">Working Days</th>
              <th className="border px-2 py-2">Present</th>
              <th className="border px-2 py-2">Leaves</th>
              {days.map(({ day }) => (
                <th key={day} className="border px-2 py-1">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((emp, idx) => {
              const { workingDays, presentDays, leaveDays } = calculateStats(emp.attendance);

              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{idx + 1}</td>
                  <td className="border px-2 py-1 text-left flex items-center gap-2">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-6 h-6 rounded-full"
                    />
                    {emp.name}
                  </td>
                  <td className="border px-2 py-1">{workingDays}</td>
                  <td className="border px-2 py-1 text-green-600 font-bold">{presentDays}</td>
                  <td className="border px-2 py-1 text-yellow-600 font-bold">{leaveDays}</td>

                  {emp.attendance.map((status, i) => (
                    <td
                      key={i}
                      className={`border px-1 py-1 ${
                        status === "-" ? "text-gray-400 font-semibold" : "font-semibold"
                      }`}
                    >
                      {status !== "-" ? (
                        <span
                          className={`inline-block w-6 h-6 leading-6 text-xs rounded-full ${
                            status === "P"
                              ? "bg-green-100 text-green-700"
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;
