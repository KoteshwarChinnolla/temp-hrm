import React, { useState, useEffect } from "react";
import {
  FaDownload,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaSearch,
} from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl";

const Project = () => {
  const defaultData = [
    {
      id: 1,
      name: "Hospital Admin",
      teamLead: "Keerthana",
      team: "Keerthana, John Deo",
      priority: "High",
      startDate: "2024-05-04",
      deadline: "2024-07-10",
      status: "Ongoing",
    },
    {
      id: 2,
      name: "Job Portal",
      teamLead: "John Deo",
      team: "John Deo, Sarah",
      priority: "Medium",
      startDate: "2024-02-01",
      deadline: "2024-04-05",
      status: "Completed",
    },
  ];

  const [projectsData, setProjectsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    teamLead: "",
    team: "",
    priority: "Low",
    startDate: "",
    deadline: "",
    status: "Ongoing",
  });

  useEffect(() => {
    const stored = localStorage.getItem("projectsData");
    if (stored) {
      setProjectsData(JSON.parse(stored));
    } else {
      setProjectsData(defaultData);
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("projectsData", JSON.stringify(data));
  };

  const filteredProjects = projectsData.filter((project) => {
    const searchableString = Object.values(project).join(" ").toLowerCase();
    return searchableString.includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentItems = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPriorityClass = (priority) => {
    const colors = {
      High: "bg-red-100 text-red-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Low: "bg-green-100 text-green-700",
    };
    return `rounded-full px-2 py-1 text-xs inline-block ${colors[priority]}`;
  };

  const getStatusClass = (status) => {
    const colors = {
      Ongoing: "bg-blue-100 text-blue-700",
      Completed: "bg-green-100 text-green-700",
      "On Hold": "bg-yellow-100 text-yellow-700",
    };
    return `rounded-full px-2 py-1 text-xs inline-block ${colors[status]}`;
  };

  const isValidName = (text) => /^[A-Za-z\s]{2,}$/.test(text.trim());
  const isValidTeam = (teamString) => {
    const members = teamString.split(",").map((m) => m.trim());
    return members.every((name) => /^[A-Za-z\s]{2,}$/.test(name));
  };

  const handleAddProject = () => {
    const { name, teamLead, team, startDate, deadline } = newProject;

    if (!isValidName(name)) {
      alert("Project name must have at least 2 letters and only letters/spaces.");
      return;
    }
    if (!isValidName(teamLead)) {
      alert("Team lead name must have at least 2 letters and only letters/spaces.");
      return;
    }
    if (!isValidTeam(team)) {
      alert("Team must contain valid names separated by commas.");
      return;
    }
    if (new Date(deadline) <= new Date(startDate)) {
      alert("Deadline must be after Start Date.");
      return;
    }

    const newProj = {
      id: Date.now(),
      ...newProject,
    };

    const updatedData = [newProj, ...projectsData];
    setProjectsData(updatedData);
    saveToStorage(updatedData);

    setShowModal(false);
    setNewProject({
      name: "",
      teamLead: "",
      team: "",
      priority: "Low",
      startDate: "",
      deadline: "",
      status: "Ongoing",
    });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projectsData.filter((proj) => proj.id !== id);
      setProjectsData(updatedProjects);
      saveToStorage(updatedProjects);
    }
  };

  const handleRefresh = () => {
    const stored = localStorage.getItem("projectsData");
    if (stored) {
      setProjectsData(JSON.parse(stored));
    }
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const headers = ["Project Name", "Team Lead", "Team", "Priority", "Start Date", "Deadline", "Status"];
    const csvRows = [
      headers.join(","),
      ...projectsData.map((proj) =>
        [proj.name, proj.teamLead, proj.team, proj.priority, proj.startDate, proj.deadline, proj.status].join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="flex flex-wrap justify-between items-center py-4">
        <h1 className="text-2xl md:text-4xl font-semibold" style={{ fontFamily: "Times New Roman" }}>
          Projects
        </h1>
        <div className="flex gap-2 items-center text-sm md:text-base flex-wrap">
          <FaHome />
          <span>&gt;</span>
          <span>Home</span>
          <span>&gt;</span>
          <span>Projects</span>
        </div>
      </div>

      <div className="bg-[#D9E1F2] shadow-md rounded-md overflow-x-auto">
        <div className="px-4 py-2.5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-5 items-center flex-wrap">
            <p className="text-lg text-gray-600 font-bold">Projects</p>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded shadow-sm">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-sm bg-transparent p-1"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FcPlus size={24} className="cursor-pointer" onClick={() => setShowModal(true)} />
            <SlRefresh size={20} className="cursor-pointer" onClick={handleRefresh} />
            <FaDownload className="text-gray-700 cursor-pointer" onClick={handleDownload} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white">
            <thead className="text-black border-b border-gray-300">
              <tr>
                <th className="text-left px-4 py-3">Project Name</th>
                <th className="text-left px-4 py-3">Team Lead</th>
                <th className="text-left px-4 py-3">Team</th>
                <th className="text-left px-4 py-3">Priority</th>
                <th className="text-left px-4 py-3">Start Date</th>
                <th className="text-left px-4 py-3">Deadline</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((project, index) => (
                <tr key={project.id} className={`${index % 2 === 0 ? "bg-gray-100" : ""} hover:bg-gray-50`}>
                  <td className="px-4 py-3">{project.name}</td>
                  <td className="px-4 py-3">{project.teamLead}</td>
                  <td className="px-4 py-3">{project.team}</td>
                  <td className="px-4 py-3">
                    <span className={getPriorityClass(project.priority)}>{project.priority}</span>
                  </td>
                  <td className="px-4 py-3">{project.startDate}</td>
                  <td className="px-4 py-3">{project.deadline}</td>
                  <td className="px-4 py-3">
                    <span className={getStatusClass(project.status)}>{project.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-wrap justify-between items-center px-4 py-3 bg-white gap-4">
          <div className="flex items-center">
            <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-300 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-600 disabled:text-gray-300"
            >
              <FaArrowLeft />
            </button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-600 disabled:text-gray-300"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/20">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 className="text-xl font-bold mb-4">Add Project</h2>
      {["name", "teamLead", "team"].map((field) => (
        <input
          key={field}
          type="text"
          placeholder={field.replace(/([A-Z])/g, " $1")}
          value={newProject[field]}
          onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
      ))}
      <input
        type="date"
        value={newProject.startDate}
        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="date"
        value={newProject.deadline}
        onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <select
        value={newProject.priority}
        onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select
        value={newProject.status}
        onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      >
        <option>Ongoing</option>
        <option>Completed</option>
        <option>On Hold</option>
      </select>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleAddProject}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Project;