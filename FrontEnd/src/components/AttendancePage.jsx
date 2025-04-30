import React, { useState } from "react";
import { CgSortAz } from "react-icons/cg";
import {
  FaDownload,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaSearch,
} from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AttendancePage = () => {
  const attendanceData = [
    {
      date: "2025-04-01",
      checkI: "4:00",
      status: "Present",
      checkO: "10:30",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-02",
      checkI: "4:00",
      status: "Absent",
      checkO: "10:35",
      hours: 2,
      break: 20,
    },
    {
      date: "2025-04-03",
      checkI: "4:00",
      status: "Present",
      checkO: "10:45",
      hours: 3,
      break: 25,
    },
    {
      date: "2025-04-04",
      checkI: "4:00",
      status: "Present",
      checkO: "11:00",
      hours: 4,
      break: 15,
    },
    {
      date: "2025-04-05",
      checkI: "4:00",
      status: "Absent",
      checkO: "10:25",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-06",
      checkI: "4:00",
      status: "Present",
      checkO: "10:50",
      hours: 3,
      break: 20,
    },
    {
      date: "2025-04-07",
      checkI: "4:00",
      status: "Present",
      checkO: "10:40",
      hours: 2,
      break: 10,
    },
    {
      date: "2025-04-08",
      checkI: "4:00",
      status: "Absent",
      checkO: "10:15",
      hours: 3,
      break: 30,
    },
    {
      date: "2025-04-09",
      checkI: "4:00",
      status: "Present",
      checkO: "11:05",
      hours: 3,
      break: 25,
    },
    {
      date: "2025-04-10",
      checkI: "4:00",
      status: "Present",
      checkO: "10:20",
      hours: 4,
      break: 30,
    },
  ];

  const exportToExcel = () => {
    const dataToExport = filteredData.map((attendance) => ({
      Date: attendance.date,
      checkI: attendance.checkI,
      Status: attendance.status,
      CheckOut: attendance.checkO,
      Hours: attendance.hours,
      Break: attendance.break,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "attendances");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "attendances.xlsx");
  };
  const handleRefresh = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    return status === "Present"
      ? "bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs inline-block"
      : "bg-red-100 text-red-600 rounded-full px-2 py-1 text-xs inline-block";
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({
    date: true,
    checkI: true,
    break: true,
    checkO: true,
    hours: true,
    status: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const filteredData = attendanceData.filter((entry) => {
    const values = Object.values(entry).join(" ").toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4">
        <h1
          className="py-4 text-3xl md:text-4xl"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Attendance
        </h1>
        <div className="flex flex-wrap gap-2 items-center text-sm md:text-lg">
          <a href="/dashboard">
            <FaHome className="text-base md:text-lg" />
          </a>
          <span>&gt;</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>Attendance</span>
        </div>
      </div>

      {/* Main container */}
      <div className="mx-2 md:mx-auto bg-[#D9E1F2] shadow-md overflow-x-auto">
        <div className="px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Left controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <p className="text-gray-500 text-lg font-bold">Attendances</p>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded shadow-sm w-full sm:w-auto">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none text-sm bg-transparent p-2 w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Right controls */}
          <div className="relative flex items-center gap-4 flex-wrap sm:flex-nowrap">
            {/* Column Toggle */}
            <div className="relative group">
              <button
                onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="px-2 py-1"
              >
                <CgSortAz
                  size={30}
                  className="cursor-pointer hover:bg-gray-400 rounded-2xl"
                />
              </button>
              {!showColumnMenu && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                  Show/Hide Column
                </div>
              )}
            </div>

            {/* Column Menu */}
            {showColumnMenu && (
              <div className="absolute right-0 sm:right-14 top-10 bg-white flex flex-col gap-4 shadow rounded p-5 z-10">
                {Object.keys(columnVisibility).map((col) => (
                  <label key={col} className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={columnVisibility[col]}
                      onChange={() => toggleColumnVisibility(col)}
                    />
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </label>
                ))}
              </div>
            )}

            {/* Refresh */}
            <div className="relative group">
              <button className="px-2 py-1 hover:bg-gray-400 rounded-2xl">
                <SlRefresh size={20} className="cursor-pointer" />
              </button>
              {!showColumnMenu && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                  Refresh
                </div>
              )}
            </div>

            {/* Download */}
            <div className="relative group">
             
              
              <button
                onClick={exportToExcel}
                className="px-2 py-1 hover:bg-gray-400 rounded-2xl"
              >
                <FaDownload
                  size={20}
                  className="cursor-pointer text-gray-700"
                />
              </button>
              {!showColumnMenu && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                  Download
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-sm">
            <thead className="text-black border-b border-gray-300">
              <tr>
                {columnVisibility.date && (
                  <th className="text-left px-4 py-3">Date</th>
                )}
                {columnVisibility.checkI && (
                  <th className="text-left px-4 py-2">Check In</th>
                )}
                {columnVisibility.break && (
                  <th className="text-left px-4 py-2">Break</th>
                )}
                {columnVisibility.checkO && (
                  <th className="text-left px-4 py-2">Check Out</th>
                )}
                {columnVisibility.hours && (
                  <th className="text-left px-4 py-2">Hours Worked</th>
                )}
                {columnVisibility.status && (
                  <th className="text-left px-4 py-2">Status</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((entry, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-100" : ""
                  }`}
                >
                  {columnVisibility.date && (
                    <td className="px-4 py-3">{entry.date}</td>
                  )}
                  {columnVisibility.checkI && (
                    <td className="px-4 py-2">{entry.checkI}</td>
                  )}
                  {columnVisibility.break && (
                    <td className="px-4 py-2">{entry.break}</td>
                  )}
                  {columnVisibility.checkO && (
                    <td className="px-4 py-2">{entry.checkO}</td>
                  )}
                  {columnVisibility.hours && (
                    <td className="px-12 py-2">{entry.hours}</td>
                  )}
                  {columnVisibility.status && (
                    <td className="px-2 py-2">
                      <span
                        className={`${getStatusColor(entry.status)}`}
                        style={{ borderRadius: "5px" }}
                      >
                        {entry.status}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 bg-white text-sm">
          <div className="flex items-center mb-2 sm:mb-0">
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

          <div className="flex items-center gap-4">
            <button onClick={prevPage} disabled={currentPage === 1}>
              <FaArrowLeft className="cursor-pointer" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              <FaArrowRight className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;