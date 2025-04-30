import React, { useState } from "react";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaSearch,
  FaDownload,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
} from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl";
import * as XLSX from "xlsx";
import { CgSortAz } from "react-icons/cg";

const initialTasks = [
  {
    taskNumber: "TASK-01",
    project: "PHP Web...",
    client: "Cara Stev...",
    status: "Open",
    priority: "Medium",
    taskType: "Development",
    executor: "Cara Stev...",
    taskDate: "2023-03-22",
  },
  {
    taskNumber: "TASK-14",
    project: "IOS App",
    client: "Airi Satou",
    status: "Open",
    priority: "Medium",
    taskType: "Bug",
    executor: "Airi Satou",
    taskDate: "2023-10-12",
  },
  {
    taskNumber: "TASK-25",
    project: "ERP System",
    client: "Angelica",
    status: "Closed",
    priority: "High",
    taskType: "Error",
    executor: "Angelica",
    taskDate: "2023-01-14",
  },
  {
    taskNumber: "TASK-17",
    project: "Angular App",
    client: "Ashton Cox",
    status: "Closed",
    priority: "Low",
    taskType: "Bug",
    executor: "John Doe",
    taskDate: "2023-04-17",
  },
  {
    taskNumber: "TASK-16",
    project: "PHP Web...",
    client: "Airi Satou",
    status: "Open",
    priority: "Medium",
    taskType: "Development",
    executor: "Ashton Cox",
    taskDate: "2023-05-20",
  },
];

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColors = {
  Open: "bg-green-100 text-green-700",
  Closed: "bg-red-100 text-red-700",
};

const columnOptions = {
  taskNumber: "Task No",
  project: "Project",
  client: "Client",
  status: "Status",
  priority: "Priority",
  taskType: "Task Type",
  executor: "Executor",
  taskDate: "Date",
};

const MyTasksTable = () => {
  const [taskData, setTaskData] = useState(initialTasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState({
    taskNumber: true,
    project: true,
    client: true,
    status: true,
    priority: true,
    taskType: true,
    executor: true,
    taskDate: true,
  });

  const [newTask, setNewTask] = useState({
    taskNumber: "",
    project: "",
    client: "",
    status: "Open",
    priority: "Medium",
    taskType: "Development",
    executor: "",
    taskDate: "",
  });

  const toggleColumnVisibility = (key) => {
    setColumnVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDelete = (taskNumberToDelete) => {
    setTaskData((prevData) =>
      prevData.filter((task) => task.taskNumber !== taskNumberToDelete)
    );
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(taskData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MyTasks");
    XLSX.writeFile(workbook, "my_tasks.xlsx");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTasks = taskData.filter((task) =>
    Object.values(task).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField] || "";
    const bVal = b[sortField] || "";
    return sortDirection === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTasks = [...taskData];
      updatedTasks[editIndex] = newTask;
      setTaskData(updatedTasks);
    } else {
      setTaskData((prev) => [...prev, newTask]);
    }
    setShowForm(false);
    setEditIndex(null);
    setNewTask({
      taskNumber: "",
      project: "",
      client: "",
      status: "Open",
      priority: "Medium",
      taskType: "Development",
      executor: "",
      taskDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl font-serif">My Tasks</h1>
        <div className="flex gap-2 items-center">
          <a href="/dashboard">
            <FaHome className="text-lg" />
          </a>
          <span className="text-lg">&gt;</span>
          <span className="text-lg">Home</span>
          <span className="text-lg">&gt;</span>
          <span className="text-lg">My Tasks</span>
        </div>
      </div>

      <div className="mx-auto bg-[#D9E1F2] shadow-md">
        <div className="px-6 py-2.5 flex justify-between items-center relative">
          <div className="flex gap-5 items-center">
            <p className="text-lg text-gray-500 font-bold">Tasks</p>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded shadow-sm">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="outline-none text-sm bg-transparent p-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 relative">
            <div className="relative group">
              <button
                onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="px-2 py-1"
              >
                <CgSortAz
                  size={35}
                  className="cursor-pointer hover:bg-gray-400 rounded-2xl"
                />
              </button>
              {!showColumnMenu && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                  Show/Hide Column
                </div>
              )}
              {showColumnMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow rounded p-4 z-10">
                  {Object.entries(columnOptions).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={columnVisibility[key]}
                        onChange={() => toggleColumnVisibility(key)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <FcPlus
              size={30}
              className="cursor-pointer"
              onClick={() => {
                setNewTask({
                  taskNumber: "",
                  project: "",
                  client: "",
                  status: "Open",
                  priority: "Medium",
                  taskType: "Development",
                  executor: "",
                  taskDate: "",
                });
                setEditIndex(null);
                setShowForm(true);
              }}
            />
            <SlRefresh
              size={25}
              className="cursor-pointer hover:bg-gray-400 rounded-3xl"
              onClick={() => {
                setTaskData(initialTasks);
                setCurrentPage(1);
                setSearchTerm("");
                setSortField(null);
                setSortDirection("asc");
              }}
              
            />
           <div className="relative group">
                           <button
                             onClick={handleDownloadExcel}
                             className="px-2 py-1 hover:bg-gray-400 rounded-2xl"
                           >
                             <FaDownload
                               size={20}
                               className="cursor-pointer text-gray-700"
                             />
                           </button>
           
                           {/* Tooltip - only show when hovered */}
                           {!showColumnMenu && (
                             <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
                               Download
                             </div>
                           )}
                         </div>
          </div>
        </div>

        <table className="w-full bg-white">
          <thead className="text-sm text-black border-b border-gray-300">
            <tr>
              {Object.entries(columnOptions).map(([key, label]) =>
                columnVisibility[key] ? (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="text-left px-4 py-2 cursor-pointer select-none"
                  >
                    {label} {sortField === key && (sortDirection === "asc" ? "▲" : "▼")}
                  </th>
                ) : null
              )}
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 text-sm ${index % 2 === 0 ? "bg-gray-100" : ""}`}
              >
                {Object.keys(columnOptions).map((key) =>
                  columnVisibility[key] ? (
                    <td key={key} className="px-4 py-2">
                      {key === "status" ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task[key]]}`}>
                          {task[key]}
                        </span>
                      ) : key === "priority" ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task[key]]}`}>
                          {task[key]}
                        </span>
                      ) : (
                        task[key]
                      )}
                    </td>
                  ) : null
                )}
                <td className="px-4 py-5.5 flex gap-4">
                  <FaPencilAlt
                    className="text-blue-500 cursor-pointer"
                    onClick={() => {
                      setNewTask(task);
                      setEditIndex(index);
                      setShowForm(true);
                    }}
                  />
                  <FaTrashAlt
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(task.taskNumber)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end bg-white items-center px-6 py-4">
          <div className="px-6 py-4">
            <label htmlFor="itemsPerPage" className="mr-2">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-2 border border-gray-300 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            <FaArrowLeft className="mr-2" />
          </button>
          <span className="mr-4">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[900px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold font-serif">
                {editIndex !== null ? "Edit Task" : "Add New Task"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-600 text-5xl">×</button>
            </div>
            <form className="grid grid-cols-2 w-full gap-4 p-4" onSubmit={handleFormSubmit}>
              {Object.entries(newTask).map(([key, value]) => {
                if (key === "status" || key === "priority" || key === "taskType") {
                  const options = {
                    status: ["Open", "Closed"],
                    priority: ["High", "Medium", "Low"],
                    taskType: ["Development", "Bug", "Error"],
                  };
                  return (
                    <select key={key} name={key} value={value} onChange={handleInputChange} className="border p-5 rounded" required>
                      {options[key].map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  );
                } else if (key === "taskDate") {
                  return (
                    <input key={key} type="date" name={key} value={value} onChange={handleInputChange} className="border p-5 rounded" required />
                  );
                } else {
                  return (
                    <input key={key} name={key} value={value} onChange={handleInputChange} className="border p-5 rounded" placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)}*`} required />
                  );
                }
              })}
              <div className="col-span-2 flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasksTable;