import { useState, useMemo } from "react";
import { Dialog } from "@headlessui/react";
import { SlHome } from "react-icons/sl";
import { Building, Clock, Calendar, User } from "lucide-react";
import {
  Pencil,
  Trash2,
  PlusCircle,
  Download,
  RefreshCcw,
  Filter
} from "lucide-react";
import * as XLSX from "xlsx";

const initialLeaveData = Array.from({ length: 30 }, (_, i) => ({
  empId: `EMP${String(i + 1).padStart(3, "0")}`,
  name: i % 2 === 0 ? "Janeh" : "Mark",
  department: i % 2 === 0 ? "Finance" : "HR",
  leaveType: i % 3 === 0 ? "Medical Leave" : i % 3 === 1 ? "Casual Leave" : "Annual Leave",
  leaveFrom: "01/10/2018",
  leaveTo: "01/14/2018",
  numDays: i % 5 + 1,
  duration: i % 2 === 0 ? "Full-day" : "Half-day",
  status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected",
  reason: i % 2 === 0 ? "High" : "Personal",
  requestedOn: "01/05/2018",
  approvedBy: i % 3 === 0 ? "Tom Johnson" : "—",
  approvalDate: i % 3 === 0 ? "01/07/2018" : "—",
}));

const statusColors = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-purple-100 text-purple-700",
  Rejected: "bg-orange-100 text-orange-700",
};

export default function LeaveRequests() {
  const [leaveList, setLeaveList] = useState(initialLeaveData);
  const [page, setPage] = useState(0);
  // const itemsPerPage = 10;
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //for modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  //for bottom alert of approve
  const [toast, setToast] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000); // hide after 3s
  };
  



  const filteredData = useMemo(() => {
    return leaveList.filter((leave) =>
      Object.values(leave).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, leaveList]);

  const paginatedData = filteredData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(leaveList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Requests");
    XLSX.writeFile(workbook, "leave_requests.xlsx");
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleDelete = (indexToDelete) => {
    const globalIndex = page * itemsPerPage + indexToDelete;
    const updated = leaveList.filter((_, i) => i !== globalIndex);
    setLeaveList(updated);

    const maxPage = Math.ceil(updated.length / itemsPerPage);
    if (page + 1 > maxPage) {
      setPage((prev) => Math.max(prev - 1, 0));
    }
  };

  const [visibleColumns, setVisibleColumns] = useState({
    empId: true,
    name: true,
    department: true,
    leaveType: true,
    leaveFrom: true,
    leaveTo: true,
    numDays: true,
    duration: true,
    status: true,
    reason: true,
    requestedOn: true,
    approvedBy: true,
    approvalDate: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const openModal = (leave) => {
    setSelectedRequest(leave);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="ml-3 p-4 bg-[#ecf0f4] min-h-screen font-sans">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Leave Requests</h1>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <SlHome size={20} />
          <span className="mx-1">›</span>
          <span>Leaves</span>
          <span className="mx-1">›</span>
          <span className="font-medium text-gray-700">Leave Requests</span>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm">
        {/* Header Bar */}
        <div >
          <div className="bg-[#dae1f3] px-4 py-3  flex items-center justify-between  rounded-t-md">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Leave Requests</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 text-sm border border-gray-300 rounded shadow-sm bg-white text-gray-600"
                />
                <span className="absolute left-2 top-1.5 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.15z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex gap-6 items-center justify-end w-72 mr-3">
              <div className="relative">
                <button title="Filter" onClick={() => setShowColumnMenu(!showColumnMenu)}>
                  <Filter className="w-5 h-5 text-gray-600" />
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

              
              <button
                title="Refresh"
                onClick={handleRefresh}
                className={`transition-transform transform duration-500 ${refreshing ? "rotate-[135deg] translate-x-2 -translate-y-2" : "rotate-0"}`}
              >
                <RefreshCcw className="w-5 h-5 text-gray-600" />
              </button>
              <button title="Download" onClick={handleDownload}>
                <Download className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Scrollable Table */}
          <div className={`overflow-x-auto transition-all duration-500 max-h-screen ${refreshing ? "opacity-50 translate-x-2 -translate-y-2" : "opacity-100"}`}>
            <table className="min-w-screen text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
                <tr>
                  {visibleColumns.empId && <th className="p-3">Employee ID</th>}
                  {visibleColumns.name && <th className="p-3">Name</th>}
                  {visibleColumns.department && <th className="p-3">Department</th>}
                  {visibleColumns.leaveType && <th className="p-3">Leave Type</th>}
                  {visibleColumns.leaveFrom && <th className="p-3">Leave From</th>}
                  {visibleColumns.leaveTo && <th className="p-3">Leave To</th>}
                  {visibleColumns.numDays && <th className="p-3"># of Days</th>}
                  {visibleColumns.duration && <th className="p-3">Duration</th>}
                  {visibleColumns.status && <th className="p-3">Status</th>}
                  {visibleColumns.reason && <th className="p-3">Reason</th>}
                  {visibleColumns.requestedOn && <th className="p-3">Requested On</th>}
                  {visibleColumns.approvedBy && <th className="p-3">Approved By</th>}
                  {visibleColumns.approvalDate && <th className="p-3">Approval Date</th>}
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((leave, index) => (
                  <tr key={index}
                  
                    onClick={() => openModal(leave)} className="border-b border-gray-200 hover:bg-gray-200 text-gray-700">
                    {visibleColumns.empId && <td className="p-3">{leave.empId}</td>}
                    {visibleColumns.name && <td className="p-3">{leave.name}</td>}
                    {visibleColumns.department && <td className="p-3">{leave.department}</td>}
                    {visibleColumns.leaveType && <td className="p-3">{leave.leaveType}</td>}
                    {visibleColumns.leaveFrom && <td className="p-3">{leave.leaveFrom}</td>}
                    {visibleColumns.leaveTo && <td className="p-3">{leave.leaveTo}</td>}
                    {visibleColumns.numDays && <td className="p-3">{leave.numDays}</td>}
                    {visibleColumns.duration && <td className="p-3">{leave.duration}</td>}
                    {visibleColumns.status && (
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[leave.status]}`}>
                          {leave.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.reason && <td className="p-3">{leave.reason}</td>}
                    {visibleColumns.requestedOn && <td className="p-3">{leave.requestedOn}</td>}
                    {visibleColumns.approvedBy && <td className="p-3">{leave.approvedBy}</td>}
                    {visibleColumns.approvalDate && <td className="p-3">{leave.approvalDate}</td>}
                    <td className="p-3 flex items-center">
                      <button title="Delete" onClick={() => handleDelete(index)}>
                        <Trash2 className="w-4 h-4 text-orange-500 ml-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer with Pagination */}
        {/* Footer with Pagination and Page Size Selector */}
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label htmlFor="pageSize" className="font-medium">Items per page:</label>
            <select
              id="pageSize"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={itemsPerPage}
              onChange={(e) => {
                setPage(0); // Reset to first page when size changes
                setItemsPerPage(Number(e.target.value));
              }}
            >
              {[5, 10, 25, 100].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4">
              {filteredData.length === 0 ? 0 : page * itemsPerPage + 1}–{Math.min((page + 1) * itemsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <button
              className="px-2 text-sm text-gray-500"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              &lt;
            </button>
            <button
              className="px-2 text-sm text-gray-500"
              onClick={() => setPage((prev) =>
                prev + 1 < Math.ceil(filteredData.length / itemsPerPage) ? prev + 1 : prev
              )}
              disabled={page + 1 >= Math.ceil(filteredData.length / itemsPerPage)}
            >
              &gt;
            </button>
          </div>
        </div>

      </div>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                Leave Details
              </h2>
              <button onClick={closeModal} className="text-gray-500 text-xl">&times;</button>
            </div>
            <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span>{selectedRequest?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5" />
                <span>Department: {selectedRequest?.department}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>{selectedRequest?.leaveType}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>From date: {selectedRequest?.leaveFrom}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>To date: {selectedRequest?.leaveTo}</span>
              </div>
            </div>
            <div className="flex gap-4 justify-end pt-4">
              <button className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                  onClick={() => {
                    showToast("Leave Request Approved ! ", "success");
                    closeModal();
                  }}>Approve</button>
              <button className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                  onClick={() => {
                    showToast("Leave Request Rejected ! ", "error");
                    closeModal();
                  }}>Reject</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {toast.message && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-l shadow-lg text-white text-sm font-medium z-50 transition-all
          ${toast.type === "success" ? "bg-green-500 opacity-90" : "bg-red-500 opacity-90"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
