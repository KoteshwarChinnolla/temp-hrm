import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSync, FaFileExcel } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeManagement = () => {
  const initialEmployees = [
    // your employee list remains unchanged...
    {
      id: 1,
      name: "Manasa Sunkari",
      role: "Developer",
      department: "Associate Software Engineer",
      mobile: "1234567890",
      joiningDate: "2022-01-15",
      email: "manasa@gmail.com",
      gender: "Female",
      address: "123 Main St, City, Country",
      status: "Active",
      location: "Office",
      image: "",
      degree: "B.Tech in Computer Science",
      salary: "80000",
      lastPromotionDate: "2023-06-20",
    },
    {
      id: 2,
      name: "Arjun Mehta",
      role: "Backend Developer",
      department: "Development",
      mobile: "9876543211",
      joiningDate: "2021-03-22",
      email: "arjun.mehta@example.com",
      gender: "Male",
      address: "321 River Rd, City, Country",
      status: "Active",
      location: "Office",
      image: "",
      degree: "M.Tech in Computer Engineering",
      salary: "90000",
      lastPromotionDate: "2023-08-10",
    },
    {
      id: 3,
      name: "Priya Desai",
      role: "QA Engineer",
      department: "Quality Assurance",
      mobile: "8765432109",
      joiningDate: "2020-10-11",
      email: "priya.desai@example.com",
      gender: "Female",
      address: "12 Palm St, City, Country",
      status: "On Leave",
      location: "Work from Home",
      image: "",
      degree: "B.Tech in Information Technology",
      salary: "75000",
      lastPromotionDate: "2022-12-05",
    },
    {
      id: 4,
      name: "Ravi Kumar",
      role: "System Administrator",
      department: "IT",
      mobile: "7654321098",
      joiningDate: "2019-07-05",
      email: "ravi.kumar@example.com",
      gender: "Male",
      address: "88 Hillside Blvd, City, Country",
      status: "Active",
      location: "Office",
      image: "",
      degree: "B.Sc in Information Systems",
      salary: "78000",
      lastPromotionDate: "2023-03-25",
    },
    {
      id: 5,
      name: "Sara Ali",
      role: "Business Analyst",
      department: "Business",
      mobile: "6543210987",
      joiningDate: "2022-02-17",
      email: "sara.ali@example.com",
      gender: "Female",
      address: "77 Meadow Ln, City, Country",
      status: "Active",
      location: "Home",
      image: "",
      degree: "MBA in Business Analytics",
      salary: "88000",
      lastPromotionDate: "2024-01-12",
    },
    {
      id: 6,
      name: "Nikhil Verma",
      role: "DevOps Engineer",
      department: "Infrastructure",
      mobile: "5432109876",
      joiningDate: "2021-06-28",
      email: "nikhil.verma@example.com",
      gender: "Male",
      address: "40 Tech Park Ave, City, Country",
      status: "Active",
      location: "Office",
      image: "",
      degree: "B.E in Electronics and Communication",
      salary: "85000",
      lastPromotionDate: "2023-11-03",
    },
    {
      id: 7,
      name: "Meera Shah",
      role: "Content Strategist",
      department: "Marketing",
      mobile: "4321098765",
      joiningDate: "2020-08-19",
      email: "meera.shah@example.com",
      gender: "Female",
      address: "90 Rosewood St, City, Country",
      status: "Inactive",
      location: "Home",
      image: "",
      degree: "MA in Communications",
      salary: "70000",
      lastPromotionDate: "2022-10-21",
    },
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (id) => {
    const emp = employees.find((e) => e.id === id);
    setFormData({ ...emp });
    setImageFile(null);
    setEditEmployee(id);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedFormData = {
      ...formData,
      image: imageFile ? URL.createObjectURL(imageFile) : formData.image,
    };
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === formData.id ? updatedFormData : emp))
    );
    setIsModalOpen(false);
    setEditEmployee(null);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleAdd = () => {
    setFormData({});
    setImageFile(null);
    setIsAddModalOpen(true);
  };

  const handleAddEmployee = () => {
    const newEmployee = {
      id: employees.length + 1,
      ...formData,
      image: imageFile ? URL.createObjectURL(imageFile) : "",
    };
    setEmployees([...employees, newEmployee]);
    setIsAddModalOpen(false);
    setFormData({});
    setImageFile(null);
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Name,Role,Department,Mobile,Joining Date,Email,Gender,Address,Status,Location,Degree,Salary,Last Promotion Date",
        ...employees.map((e) =>
          `${e.name},${e.role},${e.department},${e.mobile},${e.joiningDate},${e.email},${e.gender},${e.address},${e.status},${e.location},${e.degree},${e.salary},${e.lastPromotionDate}`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employee_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEmployees = employees.filter((emp) =>
    Object.values(emp).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          All Employees
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search 🔍"
            className="border p-2 rounded w-full sm:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <FaPlus /> Add
            </button>
            <button
              onClick={handleDownload}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <FaFileExcel /> Export
            </button>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <FaSync /> Reset
            </button>
          </div>
        </div>

        {/* Updated Grid for Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEmployees.length ? (
            filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white border rounded-lg shadow-lg p-4 text-center flex flex-col items-center"
              >
                <img
                  src={emp.image || "https://via.placeholder.com/150"}
                  alt={emp.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-blue-100"
                />
                <h3 className="text-lg font-semibold">{emp.name}</h3>
                <p className="text-sm text-gray-500">{emp.role}</p>
                <p className="text-xs text-gray-400 mb-2">{emp.department}</p>
                <div className="text-sm text-gray-600 w-full text-left">
                  <p><strong>Mobile:</strong> {emp.mobile}</p>
                  <p><strong>Email:</strong> <span className="break-words">{emp.email}</span></p>
                </div>
                <div className="flex justify-center flex-wrap gap-2 mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      emp.gender === "Female" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {emp.gender}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">{emp.status}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">{emp.location}</span>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => handleEdit(emp.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No employees found.</p>
          )}
        </div>

        {/* Modal for Editing and Adding Employees */}
        {(isModalOpen || isAddModalOpen) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
              <h2 className="text-xl font-bold mb-4">
                {isAddModalOpen ? "Add" : "Edit"} Employee
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full"
                  />
                </div>
                {[
                  { name: "name", label: "Name" },
                  { name: "role", label: "Role" },
                  { name: "department", label: "Department" },
                  { name: "mobile", label: "Mobile" },
                  { name: "email", label: "Email" },
                  { name: "degree", label: "Degree" },
                  { name: "salary", label: "Salary", type: "number" },
                ].map(({ name, label, type = "text" }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name] || ""}
                      onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                      className="border px-3 py-2 rounded w-full"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="border px-3 py-2 rounded w-full"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <textarea
                    name="address"
                    value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Joining Date</label>
                  <DatePicker
                    selected={formData.joiningDate ? new Date(formData.joiningDate) : null}
                    onChange={(date) => setFormData({ ...formData, joiningDate: date })}
                    className="border px-3 py-2 rounded w-full"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Promotion Date</label>
                  <DatePicker
                    selected={formData.lastPromotionDate ? new Date(formData.lastPromotionDate) : null}
                    onChange={(date) => setFormData({ ...formData, lastPromotionDate: date })}
                    className="border px-3 py-2 rounded w-full"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsAddModalOpen(false);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={isAddModalOpen ? handleAddEmployee : handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {isAddModalOpen ? "Add" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;