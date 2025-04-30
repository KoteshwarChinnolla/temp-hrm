import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { User, Building, Clock, Calendar,Plus,Filter, RefreshCcw, Download, Trash2 } from "lucide-react";
import {FaEdit,FaRegCalendarTimes, FaRegCalendarCheck } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { LiaCalendarDaySolid } from "react-icons/lia";
import { GrStatusUnknown } from "react-icons/gr";

const Table = ({ columns, rows=[],title,DialogOpen,isDepartment,TeamLead }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => {
      acc[column.key] = true;
      return acc;
    }, {})
  );

  const[confirmDelete,setConfirmDelete]=useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState(rows);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const [deleteIndex, setDeleteIndex] = useState(null);

  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    depId:"",
    departmentName: "",
    headOfDepartment: "",
    phone: "",
    email: "",
    employeeCapacity: "",
    establishedYear: "",
    totalEmployees: "",
  }); // Add more fields as needed

  const [isEdit,setisEdit]=useState(false);


  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleDelete = (indexInPage) => {
    const indexInFilteredData = page * itemsPerPage + indexInPage;
    const updatedRows = [...filteredData];
    updatedRows.splice(indexInFilteredData, 1);
    setFilteredData(updatedRows);
    setConfirmDelete(false);
  };
  

  const handleDownload = () => {
    const visibleKeys = Object.keys(visibleColumns).filter((key) => visibleColumns[key]);
    const csvContent = [
      visibleKeys.map((colKey) =>
        columns.find((col) => col.key === colKey)?.name|| colKey
      ).join(','),
      ...filteredData.map((row) =>
        visibleKeys.map((key) => `"${row[key] ?? ''}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const filtered = rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchQuery, rows]);

  const paginatedData = filteredData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const statusColors = {
    Approved: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Rejected: "bg-red-100 text-red-600",
  };

  
  return (
    <div className="p-1 md:p-3 bg-[#ecf0f4] min-h-screen font-sans">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-7 ">{title}</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        <div className="bg-[#dae1f3] px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 rounded-t-md">
          <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-sm border border-gray-300 rounded shadow-sm bg-white text-gray-600 w-full"
              />
              <span className="absolute left-2 top-1.5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.15z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto flex gap-4 items-center justify-end">
            <div className="relative">
              <button title="Filter" onClick={() => setShowColumnMenu(!showColumnMenu)}>
                <Filter className="w-5 h-5 text-gray-600 mt-1" />
              </button>
              {showColumnMenu && (
                <div className="absolute right-0 -left-4 top-8 bg-gray-100 shadow-xl border border-gray-200 rounded-xl z-50 w-60 max-h-72 overflow-y-auto text-sm hover:bg-gray-50">
                  <div className="px-4 py-3 font-semibold text-gray-800 border-b border-gray-200">
                    Show/Hide Columns
                  </div>
                  {Object.keys(visibleColumns).map((key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={visibleColumns[key]}
                        onChange={() => toggleColumn(key)}
                      />
                      <span className="text-gray-700">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {isDepartment && (
              <button
                className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-100"
                onClick={() => {
                  setIsAddDepartmentOpen(true);
                }}
              >
                <Plus className="w-4 h-4" />
              </button>
            )}

            <button
              title="Refresh"
              onClick={handleRefresh}
              className={`transition-transform transform duration-500 ${
                refreshing ? "rotate-[135deg] translate-x-2 -translate-y-2" : "rotate-0"
              }`}
            >
              <RefreshCcw className="w-5 h-5 text-gray-600" />
            </button>
            <button title="Download" onClick={handleDownload}>
              <Download className="w-5 h-5 text-blue-500" />
            </button>
          </div>
      </div>

        <div className={`overflow-x-auto transition-all duration-500 max-h-screen ${refreshing ? "opacity-50 translate-x-2 -translate-y-2" : "opacity-100"}`}>
          <table className="min-w-screen text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
            <tr>
              {columns.map(
                (col) => visibleColumns[col.key] && <th key={col.key} className="p-3">{col.name}</th>
              )}
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((leave, index) => (
              <tr
                key={index}
                onClick={() => openModal(leave)}
                className="border-b border-gray-200 hover:bg-gray-200 text-gray-700"
              >
                {columns.map(
                  (col) =>
                    visibleColumns[col.key] && (
                      <td key={col.key} className="p-3">
                        {(col.key === "status" || col.key === "teamLeadStatus") ? (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              statusColors[leave[col.key]] || "bg-gray-300 text-gray-800"
                            }`}
                          >
                            {leave[col.key]}
                          </span>
                        ) : (
                          leave[col.key]
                        )}
                      </td>
                    )
                )}
                <td className="p-3 flex items-center">
                  {isDepartment && (
                    <button
                      onClick={() => {
                        setIsAddDepartmentOpen(true);
                        setisEdit(true);
                        setNewDepartment(leave);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <FaEdit size={16} />
                    </button>
                  )}
                  <button
                    title="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete(true);
                      setDeleteIndex(index);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-orange-500 ml-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          </table>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label htmlFor="pageSize" className="font-medium">Items per page:</label>
            <select
              id="pageSize"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={itemsPerPage}
              onChange={(e) => {
                setPage(0);
                setItemsPerPage(Number(e.target.value));
              }}
            >
              {[5, 10, 25, 100].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="ml-2 flex items-center">
            <span className="text-sm text-gray-500 mr-4">
              {filteredData.length === 0 ? 0 : page * itemsPerPage + 1}–{Math.min((page + 1) * itemsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <button
              className="px-2 text-sm text-gray-500"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >&lt;</button>
            <button
              className="px-2 text-sm text-gray-500"
              onClick={() => setPage((prev) =>
                prev + 1 < Math.ceil(filteredData.length / itemsPerPage) ? prev + 1 : prev
              )}
              disabled={page + 1 >= Math.ceil(filteredData.length / itemsPerPage)}
            >&gt;</button>
          </div>
        </div>
      </div>
      {DialogOpen && (
          <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <img src="https://i.pravatar.cc/40" alt="Profile" className="w-8 h-8 rounded-full" />
                    Leave Details
                  </h2>
                  <button onClick={closeModal} className="text-gray-500 text-xl" aria-label="Close dialog">&times;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Name:</span>
                    <span>{selectedRequest?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5" />
                    <span className="font-medium">Department:</span>
                    <span>{selectedRequest?.department}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Leave Type: </span>
                    <span>{selectedRequest?.leaveType}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TbFileDescription className="w-5 h-5" />
                    <span className="font-medium">Reason:</span>
                    <span>{selectedRequest?.reason || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">From date: </span>
                    <span>{selectedRequest?.leaveFrom}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">To date: </span>
                    <span>{selectedRequest?.leaveTo}</span>
                  </div> 
                  <div className="flex items-center gap-3">
                    <FaRegCalendarTimes className="w-5 h-5" />
                    <span className="font-medium">Leaves Remaining:</span>
                    <span>{selectedRequest?.leavesRemaining}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRegCalendarCheck className="w-5 h-5" />
                    <span className="font-medium">Leaves Taken:</span>
                    <span>{selectedRequest?.leavesTaken}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <LiaCalendarDaySolid className="w-5 h-5" />
                    <span className="font-medium">Days Requested:</span>
                    <span>{selectedRequest?.numDays}</span>
                  </div>
                  {
                    TeamLead==false &&(
                      <div className="flex items-center gap-3">
                    <GrStatusUnknown className="w-5 h-5" />
                    <span className="font-medium">Team Lead Approval:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[selectedRequest?.teamLeadStatus] || "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {selectedRequest?.teamLeadStatus || "—"}
                    </span>
                  </div>
                    )
                  }
                </div>

                <div className="flex gap-4 justify-end pt-4">
                  <button className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                    onClick={() => {
                      showToast("Leave Request Approved!", "success");
                      closeModal();
                    }}>
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                    onClick={() => {
                      showToast("Leave Request Rejected!", "error");
                      closeModal();
                    }}>
                    Reject
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
      )}


      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"></div>
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-[500px] relative z-10">
            <h2 className="text-2xl font-semibold text-[#1f2937] mb-6 text-center">
              Confirm Delete
            </h2>
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">
              Confirm Permanent Deletion ?
              </p>
              <p className="text-gray-500 text-sm">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleDelete(deleteIndex)}
                className="px-8 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={()=>setConfirmDelete(false)}
                className="px-8 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddDepartmentOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"></div>
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] p-6 sm:p-8 overflow-hidden relative z-10 flex flex-col">
            <h2 className="text-2xl font-semibold text-[#1f2937] mb-2 sm:mb-4 shrink-0">
            {isEdit ? "Edit Department"  : "Add New Department"}
            </h2>
            <div className="overflow-y-auto pr-2 space-y-4 flex-grow">
            <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (isEdit) {
                    const updatedRows = filteredData.map((row) =>
                      row.depId === newDepartment.depId ? newDepartment : row
                    );
                    setFilteredData(updatedRows);
                  } else {
                    const newId = `DEP${Math.floor(Math.random() * 10000)}`; // You can generate this however you want
                    const updatedRows = [...filteredData, { ...newDepartment, depId: newId }];
                    setFilteredData(updatedRows);
                  }

                  // Reset modal state
                  setNewDepartment({
                    depId: "",
                    departmentName: "",
                    headOfDepartment: "",
                    phone: "",
                    email: "",
                    employeeCapacity: "",
                    establishedYear: "",
                    totalEmployees: "",
                  });
                  setIsAddDepartmentOpen(false);
                  setisEdit(false);
                }}
                className="space-y-4"
              >

                {isEdit && 
                (
                  <input 
                  type="text"
                  value={newDepartment.depId}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, depId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Department ID"
                  required
                />
                )}
                <input
                  type="text"
                  value={newDepartment.departmentName}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      departmentName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Department Name"
                  required
                />
                <input
                  type="text"
                  value={newDepartment.headOfDepartment}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      headOfDepartment: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Head of Department"
                />
                <input
                  type="text"
                  value={newDepartment.phone}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Phone"
                />
                <input
                  type="email"
                  value={newDepartment.email}
                  onChange={(e) =>
                    setNewDepartment({ ...newDepartment, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Email"
                />
                <input
                  type="number"
                  value={newDepartment.employeeCapacity}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      employeeCapacity: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Employee Capacity"
                />
                <input
                  type="text"
                  value={newDepartment.establishedYear}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      establishedYear: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Established Year"
                />
                <input
                  type="number"
                  value={newDepartment.totalEmployees}
                  onChange={(e) =>
                    setNewDepartment({
                      ...newDepartment,
                      totalEmployees: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-600 text-sm outline-none focus:border-gray-400"
                  placeholder="Total Employees"
                />
                <div className="flex justify-end gap-3 mt-6 pb-2 sticky bottom-0 bg-white pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    {isEdit ? "Update "  : "Add Department"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setNewDepartment({
                      depId: "",
                      departmentName: "",
                      headOfDepartment: "",
                      phone: "",
                      email: "",
                      employeeCapacity: "",
                      establishedYear: "",
                      totalEmployees: "",
                    });setIsAddDepartmentOpen(false); setisEdit(false);}}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {toast.message && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-l shadow-lg text-white text-sm font-medium z-50 transition-all
          ${toast.type === "success" ? "bg-green-500 opacity-90" : "bg-red-500 opacity-90"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Table;