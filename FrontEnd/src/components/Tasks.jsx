import React, { useState } from 'react';
import { FaPencilAlt, FaTrashAlt, FaPlus, FaSyncAlt, FaFileDownload } from 'react-icons/fa'; // For Edit, Delete, Add, Refresh, Download icons

const taskData = [
  {
    taskNumber: 'TASK-01',
    project: 'PHP Web...',
    client: 'Cara Stev...',
    status: 'Open',
    priority: 'Medium',
    taskType: 'Developm...',
    executor: 'Cara Stev...',
    taskDate: '03/22/20..',
    // ... other properties
  },
  {
    taskNumber: 'TASK-14',
    project: 'IOS App',
    client: 'Airi Satou',
    status: 'Open',
    priority: 'Medium',
    taskType: 'Bug',
    executor: 'Airi Satou',
    taskDate: '10/12/20..',
    // ... other properties
  },
  {
    taskNumber: 'TASK-25',
    project: 'ERP Syste...',
    client: 'Angelica ...',
    status: 'Closed',
    priority: 'High',
    taskType: 'Error',
    executor: 'Angelica ...',
    taskDate: '01/14/20..',
    // ... other properties
  },
  {
    taskNumber: 'TASK-17',
    project: 'Angular A...',
    client: 'Ashton Cox',
    status: 'Closed',
    priority: 'Low',
    taskType: 'Bug',
    executor: 'John Doe',
    taskDate: '04/17/20..',
    // ... other properties
  },
  {
    taskNumber: 'TASK-16',
    project: 'PHP Web...',
    client: 'Airi Satou',
    status: 'Open',
    priority: 'Medium',
    taskType: 'Developm...',
    executor: 'Ashton Cox',
    taskDate: '05/20/20..',
    // ... other properties
  },
  // ... more task objects
];

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

const statusColors = {
  Open: 'bg-green-100 text-green-700',
  Closed: 'bg-red-100 text-red-700',
  // Add more status colors as needed
};

const MyTasksTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default as seen in the image
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = taskData.filter(task =>
    Object.values(task).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset page when items per page changes
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page when search term changes
  };

  const handleAddTask = () => {
    // Implement your add task functionality here
    console.log('Add task clicked');
  };

  const handleRefreshTasks = () => {
    // Implement your refresh tasks functionality here
    console.log('Refresh tasks clicked');
  };

  const handleDownloadTasks = () => {
    // Implement your download tasks functionality here
    console.log('Download tasks clicked');
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTasks.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto bg-white shadow-md rounded-md">
      <div className="px-6 py-3 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700">My Tasks</h2>
        <div className="flex items-center gap-4 space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-2 py-1"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 focus:outline-none focus:shadow-outline"
            style={{ borderRadius: '30%' }}
            onClick={handleAddTask}
          >
             <span className="hidden sm:inline-block"> <FaPlus /> </span>
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline"
            onClick={handleRefreshTasks}
          >
            <FaSyncAlt />
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none focus:shadow-outline"
            onClick={handleDownloadTasks}
          >
            <FaFileDownload />
          </button>
          {/* You would likely have filter controls here */}
          {/* <div>
            {/* Add filter icons/controls here }
          </div> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" /> {/* For selecting all tasks */}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Executor
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTasks.map((task) => (
              <tr key={task.taskNumber}>
                <td className="px-4 py-2 whitespace-nowrap">
                  <input type="checkbox" /> {/* For selecting individual tasks */}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {task.taskNumber}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {task.project}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {task.client}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {task.taskType}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {task.executor}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {task.taskDate}
                </td>
                <td className="flex gap-1 px-4 py-2 whitespace-nowrap text-sm">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    <FaPencilAlt />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-white flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredTasks.length / itemsPerPage) || filteredTasks.length === 0}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstTask + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastTask, filteredTasks.length)}</span> of{' '}
              <span className="font-medium">{filteredTasks.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                {/* Left arrow icon */}
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  aria-current={currentPage === number ? 'page' : undefined}
                  className={`${
                    currentPage === number ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredTasks.length / itemsPerPage) || filteredTasks.length === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                {/* Right arrow icon */}
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
        {/* Items per page dropdown */}
        <div className="mt-2 sm:mt-0 flex items-center justify-end">
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
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MyTasksTable;