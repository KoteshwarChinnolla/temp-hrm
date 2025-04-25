import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaSync,
  FaFileExcel,
  FaChevronDown,
  FaSortUp,
  FaSortDown,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const initialDepartmentData = [
  {
    id: 1,
    departmentName: "Human Resources",
    headOfDepartment: "John Smith",
    phone: "+91 9876543210",
    email: "hr@company.com",
    employeeCapacity: 50,
    establishedYear: "2015",
    totalEmployees: 45,
  },
  {
    id: 2,
    departmentName: "Information Technology",
    headOfDepartment: "Sarah Johnson",
    phone: "+91 9876543211",
    email: "it@company.com",
    employeeCapacity: 100,
    establishedYear: "2010",
    totalEmployees: 95,
  },
  {
    id: 3,
    departmentName: "Finance",
    headOfDepartment: "Michael Brown",
    phone: "+91 9876543212",
    email: "finance@company.com",
    employeeCapacity: 30,
    establishedYear: "2012",
    totalEmployees: 28,
  },
  {
    id: 4,
    departmentName: "Marketing",
    headOfDepartment: "Emily Davis",
    phone: "+91 9876543213",
    email: "marketing@company.com",
    employeeCapacity: 40,
    establishedYear: "2013",
    totalEmployees: 35,
  },
  {
    id: 5,
    departmentName: "Operations",
    headOfDepartment: "David Wilson",
    phone: "+91 9876543214",
    email: "operations@company.com",
    employeeCapacity: 60,
    establishedYear: "2011",
    totalEmployees: 55,
  },
  {
    id: 6,
    departmentName: "Research & Development",
    headOfDepartment: "Robert Chen",
    phone: "+91 9876543215",
    email: "rnd@company.com",
    employeeCapacity: 45,
    establishedYear: "2014",
    totalEmployees: 40,
  },
  {
    id: 7,
    departmentName: "Customer Service",
    headOfDepartment: "Lisa Anderson",
    phone: "+91 9876543216",
    email: "cs@company.com",
    employeeCapacity: 35,
    establishedYear: "2016",
    totalEmployees: 32,
  },
  {
    id: 8,
    departmentName: "Quality Assurance",
    headOfDepartment: "James Wilson",
    phone: "+91 9876543217",
    email: "qa@company.com",
    employeeCapacity: 25,
    establishedYear: "2013",
    totalEmployees: 22,
  },
  {
    id: 9,
    departmentName: "Legal",
    headOfDepartment: "Patricia Lee",
    phone: "+91 9876543218",
    email: "legal@company.com",
    employeeCapacity: 15,
    establishedYear: "2012",
    totalEmployees: 12,
  },
  {
    id: 10,
    departmentName: "Public Relations",
    headOfDepartment: "Thomas Moore",
    phone: "+91 9876543219",
    email: "pr@company.com",
    employeeCapacity: 20,
    establishedYear: "2014",
    totalEmployees: 18,
  },
  {
    id: 11,
    departmentName: "Supply Chain",
    headOfDepartment: "Jennifer Taylor",
    phone: "+91 9876543220",
    email: "supply@company.com",
    employeeCapacity: 40,
    establishedYear: "2011",
    totalEmployees: 38,
  },
  {
    id: 12,
    departmentName: "Training & Development",
    headOfDepartment: "William Clark",
    phone: "+91 9876543221",
    email: "training@company.com",
    employeeCapacity: 30,
    establishedYear: "2015",
    totalEmployees: 25,
  },
  {
    id: 13,
    departmentName: "Security",
    headOfDepartment: "Nancy Martinez",
    phone: "+91 9876543222",
    email: "security@company.com",
    employeeCapacity: 25,
    establishedYear: "2013",
    totalEmployees: 22,
  },
  {
    id: 14,
    departmentName: "Facilities Management",
    headOfDepartment: "Charles Rodriguez",
    phone: "+91 9876543223",
    email: "facilities@company.com",
    employeeCapacity: 20,
    establishedYear: "2012",
    totalEmployees: 18,
  },
  {
    id: 15,
    departmentName: "Business Development",
    headOfDepartment: "Karen White",
    phone: "+91 9876543224",
    email: "bizdev@company.com",
    employeeCapacity: 30,
    establishedYear: "2014",
    totalEmployees: 28,
  },
];

const Departments = () => {
  const [departmentData, setDepartmentData] = useState(initialDepartmentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showColumns, setShowColumns] = useState({
    phone: true,
    email: true,
    employeeCapacity: true,
    establishedYear: true,
    totalEmployees: true,
  });
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    headOfDepartment: "",
    phone: "",
    email: "",
    employeeCapacity: "",
    establishedYear: "",
    totalEmployees: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredData = departmentData.filter(
    (item) =>
      item.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalDepartments = filteredData.length;
  const totalCapacity = filteredData.reduce(
    (sum, dept) => sum + dept.employeeCapacity,
    0
  );
  const totalCurrentEmployees = filteredData.reduce(
    (sum, dept) => sum + dept.totalEmployees,
    0
  );

  const handleEdit = (item) => {
    setEditForm(item);
    setEditModal(item.id);
  };

  const handleSave = () => {
    setDepartmentData((prev) =>
      prev.map((p) => (p.id === editForm.id ? editForm : p))
    );
    setEditModal(null);
  };

  const handleDelete = (item) => setConfirmDelete(item);
  const confirmDeleteDepartment = () => {
    setDepartmentData((prev) => prev.filter((p) => p.id !== confirmDelete.id));
    setConfirmDelete(null);
  };
  const cancelDelete = () => setConfirmDelete(null);

  const handleAddDepartment = () => {
    const newId = Math.max(...departmentData.map((d) => d.id)) + 1;
    setDepartmentData((prev) => [...prev, { ...newDepartment, id: newId }]);
    setAddModal(false);
    setNewDepartment({
      departmentName: "",
      headOfDepartment: "",
      phone: "",
      email: "",
      employeeCapacity: "",
      establishedYear: "",
      totalEmployees: "",
    });
  };

  const handleRefresh = () => {
    setDepartmentData(initialDepartmentData);
    setSearchTerm("");
  };

  const handleDownloadExcel = () => {
    // Create CSV content
    const headers = [
      "Department Name",
      "Head of Department",
      "Phone",
      "Email",
      "Employee Capacity",
      "Established Year",
      "Total Employees",
    ].join(",");

    const rows = departmentData
      .map((dept) =>
        [
          dept.departmentName,
          dept.headOfDepartment,
          dept.phone,
          dept.email,
          dept.employeeCapacity,
          dept.establishedYear,
          dept.totalEmployees,
        ].join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "departments.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleColumn = (column) => {
    setShowColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const columnOptions = [
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "employeeCapacity", label: "Employee Capacity" },
    { key: "establishedYear", label: "Established Year" },
    { key: "totalEmployees", label: "Total Employees" },
  ];

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (sortConfig.key === "establishedYear") {
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key].localeCompare(b[sortConfig.key])
          : b[sortConfig.key].localeCompare(a[sortConfig.key]);
      } else {
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSortUp className="opacity-0 group-hover:opacity-100" />;
    }
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="min-h-screen bg-[#ecf0f4] from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            All Departments
          </span>
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Departments
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {totalDepartments}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Capacity
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {totalCapacity}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Current Employees
                </p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {totalCurrentEmployees}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search + Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAddModal(true)}
                className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 gap-2"
              >
                <FaPlus size={16} />
                <span>Add Department</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                  className="p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2 border border-gray-200"
                >
                  <FaEye size={16} />
                  <span>Columns</span>
                  <FaChevronDown size={12} />
                </button>
                {showColumnDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                    <div className="p-2">
                      <div className="text-sm font-medium text-gray-700 px-3 py-2">
                        Visible Columns
                      </div>
                      {columnOptions.map((option) => (
                        <label
                          key={option.key}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={showColumns[option.key]}
                            onChange={() => toggleColumn(option.key)}
                            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleRefresh}
                className="p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
                title="Refresh"
              >
                <FaSync size={16} />
              </button>
              <button
                onClick={handleDownloadExcel}
                className="p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200"
                title="Download Excel"
              >
                <FaFileExcel size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-auto rounded-lg border border-gray-100">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Head of Department
                  </th>
                  {showColumns.phone && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                  )}
                  {showColumns.email && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  )}
                  {showColumns.employeeCapacity && (
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                      onClick={() => handleSort("employeeCapacity")}
                    >
                      <div className="flex items-center gap-1">
                        Employee Capacity
                        {getSortIcon("employeeCapacity")}
                      </div>
                    </th>
                  )}
                  {showColumns.establishedYear && (
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                      onClick={() => handleSort("establishedYear")}
                    >
                      <div className="flex items-center gap-1">
                        Established Year
                        {getSortIcon("establishedYear")}
                      </div>
                    </th>
                  )}
                  {showColumns.totalEmployees && (
                    <th
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                      onClick={() => handleSort("totalEmployees")}
                    >
                      <div className="flex items-center gap-1">
                        Total Employees
                        {getSortIcon("totalEmployees")}
                      </div>
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {getSortedData(filteredData).map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.departmentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.headOfDepartment}
                    </td>
                    {showColumns.phone && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-blue-500" />
                          <span className="truncate max-w-[120px]">
                            {item.phone.length > 15
                              ? `${item.phone.substring(0, 15)}...`
                              : item.phone}
                          </span>
                        </div>
                      </td>
                    )}
                    {showColumns.email && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-blue-500" />
                          <span className="truncate max-w-[200px]">
                            {item.email}
                          </span>
                        </div>
                      </td>
                    )}
                    {showColumns.employeeCapacity && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.employeeCapacity}
                      </td>
                    )}
                    {showColumns.establishedYear && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.establishedYear}
                      </td>
                    )}
                    {showColumns.totalEmployees && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.totalEmployees}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Department Modal */}
      {addModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"></div>
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Add New Department
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newDepartment.departmentName}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    departmentName: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Department Name"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Head of Department"
              />
              <input
                type="text"
                value={newDepartment.phone}
                onChange={(e) =>
                  setNewDepartment({ ...newDepartment, phone: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Phone"
              />
              <input
                type="email"
                value={newDepartment.email}
                onChange={(e) =>
                  setNewDepartment({ ...newDepartment, email: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Total Employees"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleAddDepartment}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Department
              </button>
              <button
                onClick={() => setAddModal(false)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Department
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editForm.departmentName}
                onChange={(e) =>
                  setEditForm({ ...editForm, departmentName: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Department Name"
              />
              <input
                type="text"
                value={editForm.headOfDepartment}
                onChange={(e) =>
                  setEditForm({ ...editForm, headOfDepartment: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Head of Department"
              />
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Phone"
              />
              <input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Email"
              />
              <input
                type="number"
                value={editForm.employeeCapacity}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    employeeCapacity: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Employee Capacity"
              />
              <input
                type="text"
                value={editForm.establishedYear}
                onChange={(e) =>
                  setEditForm({ ...editForm, establishedYear: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Established Year"
              />
              <input
                type="number"
                value={editForm.totalEmployees}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    totalEmployees: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Total Employees"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditModal(null)}
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Department
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete {confirmDelete.departmentName}?
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDeleteDepartment}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;