import React, {  useMemo } from "react";
import Table from './Table';
const initialDepartmentData = Array.from({ length: 30 }, (_, i) => ({
  depId: `DEP${String(i + 1).padStart(3, "0")}`,
  departmentName: [
    "HR", "IT", "Finance", "Marketing", "Operations"
  ][i % 5],
  headOfDepartment: [
    "John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson"
  ][i % 5],
  phone: `98765432${(10 + i).toString().padStart(2, "0")}`,
  email: [
    "hr@company.com", "it@company.com", "finance@company.com", "marketing@company.com", "ops@company.com"
  ][i % 5],
  employeeCapacity: [25, 50, 75, 100, 35][i % 5],
  establishedYear: (2010 + i % 10).toString(),
  totalEmployees: [20, 40, 60, 80, 30][i % 5],
}));

const departmentColumns=[
  { key: "depId", name: "DEPARTMENT ID" },
  { key: "departmentName", name: "DEPARTMENT NAME" },
  { key: "headOfDepartment", name: "HEAD OF THE DEPARTMENT" },
  { key: "phone", name: "PHONE" },
  { key: "email", name: "EMAIL" },
  { key: "employeeCapacity", name: "EMPLOYEE CAPACITY" },
  { key: "establishedYear", name: "ESTABLISHED YEAR" },
  { key: "totalEmployees", name: "TOTAL EMPLOYEES" },
  
];
const Departments = () => {
  const memoizedRows = useMemo(() => initialDepartmentData, [initialDepartmentData]);
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
                <p className="text-sm font-medium text-gray-500">
                  Total Departments
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  15
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
                  33
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
                  22
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
        <Table rows={memoizedRows} columns={departmentColumns} title='Departments' isDepartment={true}/>
      </div>      
    </div>
  );
};
export default Departments;