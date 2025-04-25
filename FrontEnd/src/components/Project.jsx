import React, { useState } from "react";
import { FaDownload, FaArrowLeft, FaArrowRight,FaHome  } from "react-icons/fa";

const Project = () => {
  const projectData = [
    {
      id: 258,
      projectTitle: "Android Application Development",
      clientName: "Cara Stevens",
      startDate: "05/10/2024",
      endDate: "07/25/2024",
      deadline: "08/25/2024",
      noOfMembers: 3,
      priority: "High",
      progress: 80,
      status: "Active",
      members: [{}, {}, {}], // Representing member avatars
    },
    {
      id: 578,
      projectTitle: "PHP Website Redesign",
      clientName: "Sarah Smith",
      startDate: "02/22/2024",
      endDate: "04/12/2024",
      deadline: "05/10/2024",
      noOfMembers: 2,
      priority: "Low",
      progress: 30,
      status: "Deactive",
      members: [{}, {}],
    },
    {
      id: 267,
      projectTitle: "Logo Design for Startup",
      clientName: "John Deo",
      startDate: "01/05/2024",
      endDate: "03/15/2024",
      deadline: "04/24/2024",
      noOfMembers: 3,
      priority: "High",
      progress: 70,
      status: "Active",
      members: [{}, {}, {}],
    },
    {
      id: 114,
      projectTitle: "Chat iOS Application",
      clientName: "Pooja Sharma",
      startDate: "05/17/2024",
      endDate: "08/11/2024",
      deadline: "09/13/2024",
      noOfMembers: 2,
      priority: "Medium",
      progress: 50,
      status: "Active",
      members: [{}, {}],
    },
    {
      id: 109,
      projectTitle: "Nursery School Website",
      clientName: "Ashton Cox",
      startDate: "04/19/2024",
      endDate: "06/28/2024",
      deadline: "06/30/2024",
      noOfMembers: 1,
      priority: "High",
      progress: 20,
      status: "Deactive",
      members: [{}]
    },
    {
      id: 367,
      projectTitle: "Html static template",
      clientName: "Sarah Smith",
      startDate: "05/10/2024",
      endDate: "06/17/2024",
      deadline: "06/24/2024",
      noOfMembers: 2,
      priority: "Medium",
      progress: 40,
      status: "Deactive",
      members: [{}, {}],
    },
    {
      id: 865,
      projectTitle: "Accounting Software UI",
      clientName: "Pooja Sharma",
      startDate: "05/19/2024",
      endDate: "06/20/2024",
      deadline: "07/01/2024",
      noOfMembers: 3,
      priority: "Low",
      progress: 90,
      status: "Active",
      members: [{}, {}, {}],
    },
  ];

  const priorityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Deactive: "bg-red-100 text-red-700",
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 as seen in the image

  // Calculate the total number of pages
  const totalPages = Math.ceil(projectData.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = projectData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination buttons
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div className="min-h-screen bg-gray-100">
         <div className="flex justify-between items-center">
                <h5 className="p-4 text-sm">Project</h5>
                <div className="flex gap-2 items-center">
                  <a href="/dashboard">
                    {" "}
                    <FaHome className="text-lg" />
                  </a>
                  <span className="text-lg">&gt;</span>
                  <span className="text-lg">Home</span>
                  <span className="text-lg">&gt;</span>
                  <span className="text-lg">Project</span>
                </div>
              </div>
      <div className="mx-auto bg-white shadow-md rounded-md">
        <div className="px-6 py-3 flex justify-between items-center border-b border-gray-200">
          <h4 className="mb-0 text-lg text-gray-700 font-semibold">My Projects</h4>
          <FaDownload className="text-gray-500 cursor-pointer" />
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No of Members
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((project) => (
                <tr key={project.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {project.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {project.projectTitle}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {project.clientName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {project.startDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {project.endDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {project.deadline}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      {project.members.map((_, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs mr-1`}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[project.priority]}`}
                    >
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${project.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls below the table */}
        <div className="px-4 py-3 bg-white flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, projectData.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{projectData.length}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <FaArrowLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <FaArrowRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 flex justify-end items-center">
          <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-700">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mt-1 block w-auto rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <div className="ml-4 text-sm text-gray-700">
            {/* Corrected the display of the range */}
            {currentPage * itemsPerPage > projectData.length
              ? `${(currentPage - 1) * itemsPerPage + 1} - ${projectData.length} of ${projectData.length}`
              : `${(currentPage - 1) * itemsPerPage + 1} - ${currentPage * itemsPerPage} of ${projectData.length}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;