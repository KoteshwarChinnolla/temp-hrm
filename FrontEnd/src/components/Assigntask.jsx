import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
const AssignTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [editIndex, setEditIndex] = useState(null);

  const employeeList = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams'];

  const handleAddOrEditTask = () => {
    if (!employeeName || !taskTitle || !taskDescription || !dueDate) return;

    const newTask = {
      employeeName,
      taskTitle,
      taskDescription,
      priority,
      dueDate,
      status,
    };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setEmployeeName('');
    setTaskTitle('');
    setTaskDescription('');
    setPriority('Medium');
    setDueDate('');
    setStatus('Pending');
  };

  const handleEdit = (index) => {
    const task = tasks[index];
    setEditIndex(index);
    setEmployeeName(task.employeeName);
    setTaskTitle(task.taskTitle);
    setTaskDescription(task.taskDescription);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setStatus(task.status);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEmployeeName('');
      setTaskTitle('');
      setTaskDescription('');
      setPriority('Medium');
      setDueDate('');
      setStatus('Pending');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">Assign Task to Team Members</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <select
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select Employee</option>
            {employeeList.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          onClick={handleAddOrEditTask}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded"
        >
          {editIndex !== null ? 'Update Task' : 'Assign Task'}
        </button>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse mt-4">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Employee Name</th>
                <th className="py-2 px-4 border">Task Title</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Due Date</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">No tasks assigned yet.</td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{task.employeeName}</td>
                    <td className="py-2 px-4 border">{task.taskTitle}</td>
                    <td className="py-2 px-4 border">{task.taskDescription}</td>
                   
                    <td className="py-2 px-4 border">{task.dueDate}</td>
                    <td className="py-2 px-4 border">{task.status}</td>
                    <td className="py-2 px-4 border text-center space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-500 hover:underline"
                      >
                        <MdOutlineEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:underline"
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskPage;
