import React, { useMemo, useState } from "react";
import Table from './Table';

const initialDepartmentData = Array.from({ length: 30 }, (_, i) => ({
  depId: `DEP${String(i + 1).padStart(3, "0")}`,
  departmentName: ["HR", "IT", "Finance", "Marketing", "Operations"][i % 5],
  headOfDepartment: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson"][i % 5],
  phone: `98765432${(10 + i).toString().padStart(2, "0")}`,
  email: ["hr@company.com", "it@company.com", "finance@company.com", "marketing@company.com", "ops@company.com"][i % 5],
  employeeCapacity: [25, 50, 75, 100, 35][i % 5],
  establishedYear: (2010 + i % 10).toString(),
  totalEmployees: [20, 40, 60, 80, 30][i % 5], // Keeping Total Employees as it is
  teamMembers: Array.from({ length: [25, 50, 75, 100, 35][i % 5] }, (_, j) => ({
    name: `Employee ${j + 1}`,
    email: `employee${j + 1}@example.com`,
    phone: `98765${String(1000 + j).slice(-4)}`
  })),
}));

const departmentColumns = [
  { key: "depId", name: "DEPARTMENT ID" },
  { key: "departmentName", name: "DEPARTMENT NAME" },
  { key: "headOfDepartment", name: "HEAD OF THE DEPARTMENT" },
  { key: "phone", name: "PHONE" },
  { key: "email", name: "EMAIL" },
  { key: "employeeCapacity", name: "EMPLOYEE CAPACITY" },
  { key: "establishedYear", name: "ESTABLISHED YEAR" },
  { key: "totalEmployees", name: "TOTAL EMPLOYEES" },
  { key: "actions", name: "ACTIONS" }, // View Team button
];

const Departments = () => {
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const memoizedRows = useMemo(() => {
    return initialDepartmentData.map((dep) => ({
      ...dep,
      actions: (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          onClick={() => {
            setSelectedTeam(dep.teamMembers);
            setIsModalOpen(true);
          }}
        >
          View Team
        </button>
      ),
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#ecf0f4] from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
          All Departments
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Departments</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">15</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">{/* Red Icon */}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                <p className="text-2xl font-bold text-green-600 mt-1">33</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">{/* Green Icon */}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-200 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Current Employees</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">22</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">{/* Yellow Icon */}</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table rows={memoizedRows} columns={departmentColumns} title="Departments" isDepartment={true} />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Team Members</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTeam.map((member, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{member.name}</td>
                      <td className="py-2">{member.email}</td>
                      <td className="py-2">{member.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
