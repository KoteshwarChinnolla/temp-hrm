import React, { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaSyncAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import * as XLSX from "xlsx"; // Importing the xlsx library
import { IoMdDownload } from "react-icons/io";

const initialData = [
  {
    name: "John Deo",
    avatar: "https://i.pravatar.cc/40?img=1",
    firstIn: "10:30",
    break: "01:15",
    lastOut: "19:37",
    hours: "08:02",
    status: "present",
    shift: "Night Shift",
  },
  {
    name: "Sarah Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    firstIn: "10:32",
    break: "01:00",
    lastOut: "19:30",
    hours: "08:10",
    status: "absent",
    shift: "Day Shift",
  },
  {
    name: "Olivia Wilson",
    avatar: "https://i.pravatar.cc/40?img=6",
    firstIn: "09:10",
    break: "00:50",
    lastOut: "18:00",
    hours: "07:30",
    status: "present",
    shift: "Day Shift",
  },
  {
    name: "William Taylor",
    avatar: "https://i.pravatar.cc/40?img=7",
    firstIn: "08:45",
    break: "01:00",
    lastOut: "17:30",
    hours: "07:45",
    status: "present",
    shift: "Morning Shift",
  },
  {
    name: "Sophia Anderson",
    avatar: "https://i.pravatar.cc/40?img=8",
    firstIn: "10:00",
    break: "00:45",
    lastOut: "19:00",
    hours: "08:15",
    status: "present",
    shift: "Day Shift",
  },
  {
    name: "Benjamin Martinez",
    avatar: "https://i.pravatar.cc/40?img=9",
    firstIn: "09:30",
    break: "00:30",
    lastOut: "18:30",
    hours: "08:30",
    status: "present",
    shift: "Day Shift",
  },
  {
    name: "Ava Thomas",
    avatar: "https://i.pravatar.cc/40?img=10",
    firstIn: "12:00",
    break: "01:00",
    lastOut: "20:30",
    hours: "07:30",
    status: "late",
    shift: "Evening Shift",
  },
  {
    name: "Liam Garcia",
    avatar: "https://i.pravatar.cc/40?img=11",
    firstIn: "00:00",
    break: "00:00",
    lastOut: "00:00",
    hours: "00:00",
    status: "absent",
    shift: "Night Shift",
  },
];

const TodayAttendence = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    firstIn: "",
    break: "",
    lastOut: "",
    status: "present",
    shift: "Day Shift",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({
    avatar: true,
    name: true,
    firstIn: true,
    break: true,
    lastOut: true,
    hours: true,
    status: true,
    shift: true,
  });
  const [showColumnSidebar, setShowColumnSidebar] = useState(false);

  const handleAddClick = () => {
    setFormVisible(true);
    setEditIndex(null);
    setFormData({
      name: "",
      avatar: "",
      firstIn: "",
      break: "",
      lastOut: "",
      status: "present",
      shift: "Day Shift",
    });
  };

  const handleEditClick = (index) => {
    setFormVisible(true);
    setEditIndex(index);
    setFormData({ ...data[index] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
    } else {
      setData([...data, formData]);
    }
    setFormVisible(false);
    setFormData({
      name: "",
      avatar: "",
      firstIn: "",
      break: "",
      lastOut: "",
      status: "present",
      shift: "Day Shift",
    });
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const handleColumnVisibilityChange = (e) => {
    setColumnVisibility({
      ...columnVisibility,
      [e.target.name]: e.target.checked,
    });
  };

  const handleCloseFilterSidebar = () => {
    setShowColumnSidebar(false);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Data");

    // Save the file
    XLSX.writeFile(wb, "attendance_data.xlsx");
  };

  const filteredData = data.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Today Attendance</h1>

        <div className="bg-white p-6 rounded-xl shadow-md">
          {/* Header */}
          <div className="flex flex-row items-start gap-2 mb-6">
            <h2 className="text-xl font-semibold">Attendance</h2>
           
            <div className="relative w-full sm:w-1/6">
        <input
       type="text"
         placeholder="Search"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         className="border rounded px-4 py-2 w-full pl-10"
       />
       <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
</div>

            <IoIosAddCircleOutline
              className="text-xl ml-auto cursor-pointer"
              onClick={handleAddClick}
            />
            <FaSyncAlt
              className="text-1xl ml-2 cursor-pointer"
              onClick={handleRefresh}
            />
            <button
              onClick={handleDownload}
              className="text-lg ml-4 text-gray-700 cursor-pointer"
            >
              <IoMdDownload className="w-5 h-5"/>
            </button>
            <button
              onClick={() => setShowColumnSidebar(!showColumnSidebar)}
              className="text-lg ml-4 text-gray-700 cursor-pointer"
            >
              <IoFilterOutline className="w-5 h-5" />
            </button>
          </div>

          {/* Table */}
          <table className="w-full table-auto text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                {columnVisibility.avatar && <th className="p-3">Avatar</th>}
                {columnVisibility.name && <th className="p-3">Employee Name</th>}
                {columnVisibility.firstIn && <th className="p-3">First In</th>}
                {columnVisibility.break && <th className="p-3">Break</th>}
                {columnVisibility.lastOut && <th className="p-3">Last Out</th>}
                {columnVisibility.hours && <th className="p-3">Total Hours</th>}
                {columnVisibility.status && <th className="p-3">Status</th>}
                {columnVisibility.shift && <th className="p-3">Shift</th>}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((emp, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  {columnVisibility.avatar && (
                    <td className="p-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                  )}
                  {columnVisibility.name && <td className="p-3">{emp.name}</td>}
                  {columnVisibility.firstIn && <td className="p-3">{emp.firstIn}</td>}
                  {columnVisibility.break && <td className="p-3">{emp.break}</td>}
                  {columnVisibility.lastOut && <td className="p-3">{emp.lastOut}</td>}
                  {columnVisibility.hours && <td className="p-3">{emp.hours}</td>}
                  {columnVisibility.status && (
                    <td className="p-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          emp.status === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                  )}
                  {columnVisibility.shift && <td className="p-3">{emp.shift}</td>}
                  <td className="p-3 flex gap-3">
                    <FaEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEditClick(idx)}
                    />
                    <FaTrash className="text-red-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Form Modal */}
      {formVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full sm:w-[450px] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Employee Attendance" : "Add Employee Attendance"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Upload Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setFormData({ ...formData, avatar: imageUrl });
                    }
                  }}
                  className="w-full border rounded px-3 py-2"
                />
                {formData.avatar && (
                  <img
                    src={formData.avatar}
                    alt="Avatar Preview"
                    className="w-12 h-12 rounded-full mt-2"
                  />
                )}
              </div>

              {/* Other Form Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">First In</label>
                <input
                  type="time"
                  name="firstIn"
                  value={formData.firstIn}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Break Time</label>
                <input
                  type="time"
                  name="break"
                  value={formData.break}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Last Out</label>
                <input
                  type="time"
                  name="lastOut"
                  value={formData.lastOut}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Shift</label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="Day Shift">Day Shift</option>
                  <option value="Night Shift">Night Shift</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editIndex !== null ? "Save Changes" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar for Column Visibility */}
      {showColumnSidebar && (
        <div className="absolute top-20 right-10 w-56 bg-white border rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm mb-2 text-gray-700">Filter Columns</h3>
            <FaTimes
              className="text-sm cursor-pointer"
              onClick={handleCloseFilterSidebar}
            />
          </div>
          <div className="space-y-2">
            {Object.keys(columnVisibility).map((col) => (
              <div key={col} className="flex items-center">
                <input
                  type="checkbox"
                  name={col}
                  checked={columnVisibility[col]}
                  onChange={handleColumnVisibilityChange}
                  className="mr-2"
                />
                <label className="text-sm">{col.replace(/([A-Z])/g, " $1")}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayAttendence;
