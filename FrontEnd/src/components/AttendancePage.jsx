import React, { useState } from "react";
import { FaDownload, FaArrowLeft, FaArrowRight,FaHome  } from "react-icons/fa";

const AttendancePage = () => {
  const attendanceData = [
    { date: "2025-04-01", checkIn: "9:00", break: 30 ,hours:3,status: "Present", checkO: "10:30" },
    {
      date: "2025-04-02",
      checkIn: "9:00",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-02",
      checkIn: "8:30",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-03",
      checkIn: "9:00",
      status: "Present",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-04",
      checkIn: "9:30",
      status: "Present",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-05",
      checkIn: "9:00",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-05",
      checkIn: "9:10",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-05",
      checkIn: "9:00",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-05",
      checkIn: "9:00",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-05",
      checkIn: "9:00",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-05",
      checkIn: "9:00",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-05",
      checkIn: "9:00",
      status: "Absent",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
  ];

  const getStatusColor = (status) => {
    return status === "Present"
      ? "bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs inline-block"
      : "bg-red-100 text-red-600 rounded-full px-2 py-1 text-xs inline-block";
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate the total number of pages
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = attendanceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination buttons
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center">
        <h5 className="p-4 text-sm">Attendance</h5>
        <div className="flex gap-2 items-center">
          <a href="/dashboard">
            {" "}
            <FaHome className="text-lg" />
          </a>
          <span className="text-lg">&gt;</span>
          <span className="text-lg">Home</span>
          <span className="text-lg">&gt;</span>
          <span className="text-lg">Attendance</span>
        </div>
      </div>
      <div className="mx-auto bg-[#D9E1F2] shadow-md">
        <div className="mx-auto bg-[#D9E1F2] shadow-md">
          <div className="px-6 py-2.5 flex justify-between items-center">
            <p className="mb-0 text-lg text-gray-500 font-bold">Attendances</p>
            <FaDownload />
          </div>
        </div>

        <table className="w-full bg-white">
          <thead
            className="text-sm text-black "
            style={{ borderBottom: "1px solid #D1D5DB" }}
          >
            <tr>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Check In</th>
              <th className="text-left px-4 py-2">Break</th>
              <th className="text-left px-4 py-2">Check Out</th>
              <th className="text-left px-4 py-2">Hours Worked</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((entry, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 text-sm ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
                style={{ borderBottom: "1px solid #D1D5DB" }}
              >
                <td className="px-4 py-2">{entry.date}</td>
                <td className="px-4 py-2">{entry.checkIn}</td>
                <td className="px-4 py-2">{entry.break}</td>
                <td className="px-4 py-2">{entry.checkO}</td>
                <td className="px-4 py-2">{entry.hours}</td>
                <td className="px-4 py-2 font-medium flex justify-center items-center">
                  <button
                    className={`text-xs ${getStatusColor(entry.status)}`}
                    style={{ borderRadius: "5px" }}
                  >
                    {entry.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls inside table */}
        <div className="flex justify-end bg-white items-center px-6 py-4">
          <div className="px-6 py-4">
            <label htmlFor="itemsPerPage" className="mr-2">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-1 border border-gray-300 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <button onClick={prevPage} disabled={currentPage === 1}>
            <FaArrowLeft className="mr-2" />
          </button>

          <span className="mr-4">
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
