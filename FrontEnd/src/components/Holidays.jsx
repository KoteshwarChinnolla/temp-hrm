import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdOutlineFileDownload  } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";

const HolidayDashboard = () => {
  const [holidays, setHolidays] = useState([
    {
      name: "New Year",
      shift: "All Shifts",
      date: "2021-12-31",
      type: "National",
      createdBy: "Admin",
      creationDate: "2021-11-01",
      status: "Approved",
      details: "Holiday for the celebration of New Year",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    shift: "All Shifts",
    date: "",
    type: "",
    createdBy: "Admin",
    creationDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    details: "",
  });

  const [filterYear, setFilterYear] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");

  const handleAddClick = () => {
    setShowForm(true);
    setEditIndex(null);
    setNewHoliday({
      name: "",
      shift: "All Shifts",
      date: "",
      type: "",
      createdBy: "Admin",
      creationDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      details: "",
    });
  };

  const handleDownload = () => {
    const csv = holidays.map(h =>
      `${h.name},${h.shift},${h.date},${h.type},${h.createdBy},${h.creationDate},${h.status},${h.details}`
    ).join("\n");
    const blob = new Blob(
      [`Holiday Name,Shift,Date,Holiday Type,Created By,Creation Date,Approval Status,Details\n${csv}`],
      { type: "text/csv" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "holidays.csv";
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...holidays];
    if (editIndex !== null) {
      updatedList[editIndex] = newHoliday;
      setHolidays(updatedList);
    } else {
      setHolidays([...holidays, newHoliday]);
    }
    setShowForm(false);
    setEditIndex(null);
  };

  const handleRemove = (index) => {
    const updated = holidays.filter((_, i) => i !== index);
    setHolidays(updated);
  };

  const handleEdit = (index) => {
    setNewHoliday(holidays[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const getYears = () => {
    const years = holidays.map(h => new Date(h.date).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const getMonths = () => {
    return [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  };

  const filteredHolidays = holidays.filter(h => {
    const holidayDate = new Date(h.date);
    const matchYear = filterYear === "All" || holidayDate.getFullYear().toString() === filterYear;
    const matchMonth = filterMonth === "All" || holidayDate.toLocaleString("default", { month: "long" }) === filterMonth;
    return matchYear && matchMonth;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="text-3xl font-extrabold mb-6 text-gray-800">Holiday Manager</div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">All Holidays</h2>
        <div className="flex space-x-2">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="p-2 border rounded-md text-sm"
          >
            <option value="All">All Years</option>
            {getYears().map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="p-2 border rounded-md text-sm"
          >
            <option value="All">All Months</option>
            {getMonths().map((month, idx) => (
              <option key={idx} value={month}>{month}</option>
            ))}
          </select>
          <button
            onClick={handleAddClick}
            className="  px-3 py-2 rounded-xl shadow-md  transition-all"
          >
            <FaRegPlusSquare />
          </button>
          <button
            onClick={handleDownload}
            className="  px-3 py-2 rounded-xl shadow-md  transition-all"
          >
            <MdOutlineFileDownload />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 text-sm font-semibold">
            <tr>
              {["Holiday Name", "Shift", "Date", "Type", "Created By", "Creation Date", "Status", "Details", "Actions"].map((head, i) => (
                <th key={i} className="px-5 py-3">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredHolidays.map((h, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-5 py-3">{h.name}</td>
                <td className="px-5 py-3">{h.shift}</td>
                <td className="px-5 py-3">{h.date}</td>
                <td className="px-5 py-3">{h.type}</td>
                <td className="px-5 py-3">{h.createdBy}</td>
                <td className="px-5 py-3">{h.creationDate}</td>
                <td className="px-5 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                    h.status === "Approved"
                      ? "bg-green-500"
                      : h.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-400"
                  }`}>
                    {h.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {h.details.length > 30 ? `${h.details.slice(0, 30)}...` : h.details}
                </td>
                <td className="px-5 py-3 space-x-2">
                  <button onClick={() => handleEdit(i)} className="text-blue-600 hover:underline "><FiEdit className="w-5 h-5"/></button>
                  <button onClick={() => handleRemove(i)} className="text-red-600 hover:underline"><MdDelete className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              {editIndex !== null ? "Edit Holiday" : "Add Holiday"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Holiday Name"
                value={newHoliday.name}
                onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                required
              />
              <select
                value={newHoliday.shift}
                onChange={(e) => setNewHoliday({ ...newHoliday, shift: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
              >
                <option>All Shifts</option>
                <option>Day Shifts</option>
                <option>Night Shifts</option>
              </select>
              <input
                type="date"
                value={newHoliday.date}
                onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                required
              />
              <input
                type="text"
                placeholder="Holiday Type"
                value={newHoliday.type}
                onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                required
              />
              <select
                value={newHoliday.status}
                onChange={(e) => setNewHoliday({ ...newHoliday, status: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
              <textarea
                placeholder="Holiday Details"
                value={newHoliday.details}
                onChange={(e) => setNewHoliday({ ...newHoliday, details: e.target.value })}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md text-sm resize-y"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayDashboard;