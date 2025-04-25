
import React from "react";
import { FaSearch, FaPlus, FaSync, FaDownload, FaEdit, FaTrash,FaHome  } from "react-icons/fa";

const leavesData = [
  {
    applicationDate: "02/22/2019",
    fromDate: "02/22/2019",
    toDate: "02/26/2019",
    halfDay: "Yes",
    leaveType: "Casual Leave",
    status: "Approved",
    reason: "Lorem Ipsum...",
  },
  {
    applicationDate: "02/17/2019",
    fromDate: "02/22/2019",
    toDate: "02/26/2019",
    halfDay: "Yes",
    leaveType: "Sick Leave",
    status: "Rejected",
    reason: "Lorem Ipsum...",
  },
  {
    applicationDate: "02/12/2019",
    fromDate: "02/12/2019",
    toDate: "02/26/2019",
    halfDay: "No",
    leaveType: "Sick Leave",
    status: "Rejected",
    reason: "Lorem Ipsum...",
  },
  {
    applicationDate: "05/11/2019",
    fromDate: "03/17/2019",
    toDate: "03/26/2019",
    halfDay: "No",
    leaveType: "Casual Leave",
    status: "Pending",
    reason: "Lorem Ipsum...",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-600";
    case "Rejected":
      return "bg-orange-100 text-orange-600";
    case "Pending":
      return "bg-purple-100 text-purple-600";
    default:
      return "";
  }
};

const Leaves = () => {
  return (
    <div className="p-6">
        <div className="flex justify-between items-center">
                <h5 className="p-4 text-sm">My Leaves</h5>
                <div className="flex gap-2 items-center">
                  <a href="/dashboard">
                    {" "}
                    <FaHome className="text-lg" />
                  </a>
                  <span className="text-lg">&gt;</span>
                  <span className="text-lg">Home</span>
                  <span className="text-lg">&gt;</span>
                  <span className="text-lg">My Leaves</span>
                </div>
              </div>

      {/* Search + Toolbar */}
      <div className="flex flex-wrap items-center justify-between bg-gray-100 p-4 rounded-t-md">
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded shadow-sm">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <FaPlus className="cursor-pointer hover:text-purple-600" />
          <FaSync className="cursor-pointer hover:text-purple-600" />
          <FaDownload className="cursor-pointer hover:text-purple-600" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-b-md shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3">Application Date</th>
              <th className="p-3">From Date</th>
              <th className="p-3">To Date</th>
              <th className="p-3">Half Day</th>
              <th className="p-3">Leave Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leavesData.map((leave, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">{leave.applicationDate}</td>
                <td className="p-3">{leave.fromDate}</td>
                <td className="p-3">{leave.toDate}</td>
                <td className="p-3">{leave.halfDay}</td>
                <td className="p-3">{leave.leaveType}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(leave.status)}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3 flex gap-3 text-sm">
                  <FaEdit className="text-purple-600 cursor-pointer" />
                  <FaTrash className="text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
        <div className="flex items-center gap-2">
          Items per page:
          <select className="border rounded px-2 py-1">
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div>
          1 – {leavesData.length} of {leavesData.length}
        </div>
      </div>
    </div>
  );
};

export default Leaves;
