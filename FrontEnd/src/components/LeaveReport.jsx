import React, { useState } from 'react';
import { Home } from 'lucide-react';
// import { IoFilterSharp } from "react-icons/io5";
// import { MdOutlineRefresh } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

// Page Header
const PageHeader = () => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 rounded-xl mb-6 font-sans">
    <h1 className="text-2xl font-bold text-gray-800">Leave Report</h1>
    <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0 space-x-2">
      <Home className="w-4 h-4 text-gray-400" />
      <span>{'>'}</span>
      <span>Reports</span>
      <span>{'>'}</span>
      <span className="text-gray-700 font-medium">Leave Report</span>
    </div>
  </div>
);

// Search Bar
const SearchBar = ({ searchTerm, onSearchChange, onDownload, onRefresh }) => (
  <div className="bg-[#dae1f3] rounded-t-md shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <h2 className="text-md font-semibold text-gray-800">Search Employees</h2>
      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-700"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
      </div>
    </div>
    <div className="flex items-center gap-4 text-gray-500 text-xl">
      {/* <button className="hover:text-blue-600 transition-colors px-2 cursor-pointer">
        <IoFilterSharp />
      </button> */}
      {/* <button onClick={onRefresh} className="hover:text-blue-600 transition-colors px-2 cursor-pointer">
        <MdOutlineRefresh />
      </button> */}
      <button onClick={onDownload} className="hover:text-blue-600 transition-colors px-6 cursor-pointer">
        <FiDownload />
      </button>
    </div>
  </div>
);

// Leave Table Row
const LeaveRow = ({ name, date, department, type, days, remaining, total, taken, carry, photo }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100 font-sans">
    <td className="p-3 flex items-center gap-3 whitespace-nowrap">
      {/* <img src={photo} alt={name} className="w-10 h-10 rounded-full object-cover border " /> */}
      <span className="text-gray- text-center font-medium ">{name}</span>
    </td>
    <td className="p-4 text-center text-gray-600">{date}</td>
    <td className="p-4 text-center text-gray-600">{department}</td>
    <td className="p-4 text-center text-gray-600">{type}</td>
    <td className="p-4 text-center">{days}</td>
    <td className="p-4 text-center">{remaining}</td>
    <td className="p-4 text-center">{total}</td>
    <td className="p-4 text-center">{taken}</td>
    <td className="p-4 text-center">{carry}</td>
  </tr>
);

// Leave Table
const LeaveTable = ({ data }) => (
  <div className="bg-white shadow-sm overflow-x-auto font-sans">
    <table className="min-w-full table-auto text-sm text-left">
      <thead className="text-gray-700 tracking-wide border-b border-gray-200">
        <tr>
          <th className="pl-8">Name</th>
          <th className="p-4 text-center">Date</th>
          <th className="p-4 text-center">Department</th>
          <th className="p-4 text-center">Leave Type</th>
          <th className="p-4 text-center">Number of Days</th>
          <th className="p-4 text-center">Remaining Leaves</th>
          <th className="p-4 text-center">Total Leaves</th>
          <th className="p-4 text-center">Total Taken</th>
          <th className="p-4 text-center">Carry Over</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((entry, index) => <LeaveRow key={index} {...entry} />)
        ) : (
          <tr>
            <td colSpan="9" className="p-6 text-center text-gray-500">No results found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Main Component
const LeaveReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const leaveData = [
    {
      name: "John Deo", date: "02/12/2024", department: "Testing", type: "Medical Leave",
      days: "05", remaining: "06", total: "20", taken: "4", carry: "5",
      photo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Jane Smith", date: "03/14/2024", department: "Development", type: "Casual Leave",
      days: "02", remaining: "10", total: "20", taken: "5", carry: "3",
      photo: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Aisha Khan", date: "03/22/2024", department: "Marketing", type: "Annual Leave",
      days: "05", remaining: "12", total: "25", taken: "10", carry: "4",
      photo: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      name: "Daniel Lee", date: "04/10/2024", department: "Sales", type: "Casual Leave",
      days: "01", remaining: "08", total: "18", taken: "6", carry: "2",
      photo: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      name: "Maria Garcia", date: "03/30/2024", department: "Human Resources", type: "Medical Leave",
      days: "04", remaining: "05", total: "20", taken: "10", carry: "5",
      photo: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
      name: "Liam Johnson", date: "04/05/2024", department: "Finance", type: "Casual Leave",
      days: "02", remaining: "09", total: "22", taken: "7", carry: "3",
      photo: "https://randomuser.me/api/portraits/men/8.jpg"
    },
    {
      name: "Emily Carter", date: "04/15/2024", department: "Design", type: "Annual Leave",
      days: "03", remaining: "11", total: "20", taken: "6", carry: "3",
      photo: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      name: "Michael Nguyen", date: "04/18/2024", department: "Engineering", type: "Sick Leave",
      days: "02", remaining: "08", total: "18", taken: "7", carry: "2",
      photo: "https://randomuser.me/api/portraits/men/14.jpg"
    },
    {
      name: "Priya Verma", date: "04/11/2024", department: "Customer Support", type: "Casual Leave",
      days: "01", remaining: "10", total: "20", taken: "5", carry: "4",
      photo: "https://randomuser.me/api/portraits/women/15.jpg"
    },
    {
      name: "Robert Miles", date: "04/20/2024", department: "IT", type: "Medical Leave",
      days: "04", remaining: "06", total: "18", taken: "8", carry: "1",
      photo: "https://randomuser.me/api/portraits/men/19.jpg"
    }
  ];

  const filteredData = leaveData.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleDownload = () => {
    const headers = ['Name', 'Date', 'Department', 'Leave Type', 'Days', 'Remaining', 'Total', 'Taken', 'Carry'];
    const rows = filteredData.map(entry =>
      [entry.name, entry.date, entry.department, entry.type, entry.days, entry.remaining, entry.total, entry.taken, entry.carry]
    );
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leave_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-[#ecf0f4] min-h-screen font-sans">
      <PageHeader />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDownload={handleDownload}
        onRefresh={handleRefresh}
      />
      <LeaveTable data={paginatedData} />
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 text-sm text-gray-700 mt-2">
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
          >
            {[5, 10, 15, 20].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span>
            {totalItems === 0
              ? "0"
              : `${startIndex + 1} – ${Math.min(endIndex, totalItems)} of ${totalItems}`}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveReport;