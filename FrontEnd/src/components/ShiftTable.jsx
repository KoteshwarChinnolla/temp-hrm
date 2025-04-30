import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FiSearch, FiFilter, FiRefreshCcw, FiDownload, FiEdit, FiTrash } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

const ShiftTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shifts, setShifts] = useState([
    {
      name: 'John Doe',
      photo: 'https://i.pravatar.cc/40?u=john',
      startTime: '09:00',
      endTime: '17:00',
      shiftType: 'Morning',
      shiftDate: '2025-04-22',
      breakStart: '13:00',
      breakEnd: '13:30',
      totalHours: '8 hrs',
      status: 'Scheduled',
      assignedBy: 'Admin',
      overtime: '0',
      category: 'Full-Time',
    },
    {
      name: 'Jane Smith',
      photo: 'https://i.pravatar.cc/40?u=jane',
      startTime: '14:00',
      endTime: '22:00',
      shiftType: 'Evening',
      shiftDate: '2025-04-22',
      breakStart: '18:00',
      breakEnd: '18:30',
      totalHours: '8 hrs',
      status: 'Completed',
      assignedBy: 'Manager',
      overtime: '1 hr',
      category: 'Part-Time',
    },
    {
      name: 'Michael Lee',
      photo: 'https://i.pravatar.cc/40?u=michael',
      startTime: '22:00',
      endTime: '06:00',
      shiftType: 'Night',
      shiftDate: '2025-04-23',
      breakStart: '02:00',
      breakEnd: '02:30',
      totalHours: '8 hrs',
      status: 'Scheduled',
      assignedBy: 'Supervisor',
      overtime: '0',
      category: 'Full-Time',
    },
    {
      name: 'Emily Johnson',
      photo: 'https://i.pravatar.cc/40?u=emily',
      startTime: '08:00',
      endTime: '16:00',
      shiftType: 'Morning',
      shiftDate: '2025-04-23',
      breakStart: '12:00',
      breakEnd: '12:30',
      totalHours: '8 hrs',
      status: 'Scheduled',
      assignedBy: 'Admin',
      overtime: '30 mins',
      category: 'Part-Time',
    },
    {
      name: 'Chris Martin',
      photo: 'https://i.pravatar.cc/40?u=chris',
      startTime: '10:00',
      endTime: '18:00',
      shiftType: 'Morning',
      shiftDate: '2025-04-22',
      breakStart: '14:00',
      breakEnd: '14:30',
      totalHours: '8 hrs',
      status: 'Cancelled',
      assignedBy: 'HR',
      overtime: '0',
      category: 'Full-Time',
    },
    {
      name: 'Sophia Turner',
      photo: 'https://i.pravatar.cc/40?u=sophia',
      startTime: '15:00',
      endTime: '23:00',
      shiftType: 'Evening',
      shiftDate: '2025-04-24',
      breakStart: '19:00',
      breakEnd: '19:30',
      totalHours: '8 hrs',
      status: 'Scheduled',
      assignedBy: 'Manager',
      overtime: '1 hr',
      category: 'Full-Time',
    },
    {
      name: 'David Kim',
      photo: 'https://i.pravatar.cc/40?u=david',
      startTime: '07:00',
      endTime: '15:00',
      shiftType: 'Morning',
      shiftDate: '2025-04-25',
      breakStart: '11:00',
      breakEnd: '11:30',
      totalHours: '8 hrs',
      status: 'Completed',
      assignedBy: 'Admin',
      overtime: '0',
      category: 'Full-Time',
    },
    {
      name: 'Ava Brown',
      photo: 'https://i.pravatar.cc/40?u=ava',
      startTime: '13:00',
      endTime: '21:00',
      shiftType: 'Evening',
      shiftDate: '2025-04-25',
      breakStart: '17:00',
      breakEnd: '17:30',
      totalHours: '8 hrs',
      status: 'Scheduled',
      assignedBy: 'HR',
      overtime: '2 hrs',
      category: 'Part-Time',
    },
    {
      name: 'Liam Wilson',
      photo: 'https://i.pravatar.cc/40?u=liam',
      startTime: '23:00',
      endTime: '07:00',
      shiftType: 'Night',
      shiftDate: '2025-04-26',
      breakStart: '03:00',
      breakEnd: '03:30',
      totalHours: '8 hrs',
      status: 'Completed',
      assignedBy: 'Supervisor',
      overtime: '0',
      category: 'Full-Time',
    }
  ]);
  
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({ status: '', shiftType: '', category: '' });

  const [editIndex, setEditIndex] = useState(null);
  const [modalData, setModalData] = useState({
    // Modal data state
    name: '',
    photo: '',
    startTime: '',
    endTime: '',
    shiftType: '',
    shiftDate: '',
    breakStart: '',
    breakEnd: '',
    totalHours: '',
    status: '',
    assignedBy: '',
    overtime: '',
    category: '',
  });


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index = null) => {
    if (index !== null) {
      setModalData(shifts[index]);
      setEditIndex(index);
    } else {
      setModalData({
        name: '',
        photo: '',
        startTime: '',
        endTime: '',
        shiftType: '',
        shiftDate: '',
        breakStart: '',
        breakEnd: '',
        totalHours: '',
        status: '',
        assignedBy: '',
        overtime: '',
        category: '',
      });
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedShifts = [...shifts];
      updatedShifts[editIndex] = modalData;
      setShifts(updatedShifts);
    } else {
      setShifts([...shifts, modalData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updated = shifts.filter((_, i) => i !== index);
    setShifts(updated);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setModalData({ ...modalData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔍 Search Function
  const filteredShifts = shifts.filter((shift) =>
    Object.values(shift).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).filter((shift) => {
    const matchesStatus = filterConfig.status ? shift.status === filterConfig.status : true;
    const matchesShiftType = filterConfig.shiftType ? shift.shiftType === filterConfig.shiftType : true;
    const matchesCategory = filterConfig.category ? shift.category === filterConfig.category : true;
    return matchesStatus && matchesShiftType && matchesCategory;
  });

  // 🔽 Sorting Function
  const sortedShifts = [...filteredShifts].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getBadgeClass = (type) => {
    switch (type) {
      case 'Morning': return 'bg-green-100 text-green-800';
      case 'Evening': return 'bg-blue-100 text-blue-800';
      case 'Night': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExport = () => {
    const excelData = sortedShifts.map(({ photo, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shifts');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'shifts.xlsx');
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-blue-100 p-3 rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Employee Shift</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-md border bg-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <FiFilter className="text-xl cursor-pointer" />
          <AiOutlinePlus className="text-xl text-green-600 cursor-pointer" onClick={() => openModal()} />
          <FiRefreshCcw className="text-xl cursor-pointer" onClick={() => setSearchTerm('')} />
          <FiDownload className="text-xl text-blue-600 cursor-pointer" onClick={handleExport} />
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <select
          value={filterConfig.status}
          onChange={(e) => setFilterConfig({ ...filterConfig, status: e.target.value })}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={filterConfig.shiftType}
          onChange={(e) => setFilterConfig({ ...filterConfig, shiftType: e.target.value })}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Shift Type</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>

        <select
          value={filterConfig.category}
          onChange={(e) => setFilterConfig({ ...filterConfig, category: e.target.value })}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Category</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
        </select>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {editIndex !== null ? 'Edit Shift' : 'Add Shift'}
            </h3>
            <form onSubmit={handleSave}>
              {Object.keys(modalData).map((key) => (
                <div className="mb-4" key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </label>
                  {key === 'photo' ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full p-2 border rounded-md"
                    />
                  ) : ['shiftType', 'status', 'category'].includes(key) ? (
                    <select
                      id={key}
                      value={modalData[key]}
                      onChange={(e) => setModalData({ ...modalData, [key]: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select</option>
                      {key === 'shiftType' && ['Morning', 'Evening', 'Night'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      {key === 'status' && ['Scheduled', 'Completed', 'Cancelled'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      {key === 'category' && ['Full-Time', 'Part-Time'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : ['shiftDate'].includes(key) ? (
                    <input
                      type="date"
                      id={key}
                      value={modalData[key]}
                      onChange={(e) => setModalData({ ...modalData, [key]: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  ) : ['startTime', 'endTime', 'breakStart', 'breakEnd'].includes(key) ? (
                    <input
                      type="time"
                      id={key}
                      value={modalData[key]}
                      onChange={(e) => setModalData({ ...modalData, [key]: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  ) : (
                    <input
                      type="text"
                      id={key}
                      value={modalData[key]}
                      onChange={(e) => setModalData({ ...modalData, [key]: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {editIndex !== null ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md shadow">
          <thead className="bg-gray-100 text-sm text-left">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('startTime')}>Start Time</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('endTime')}>End Time</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('shiftType')}>Shift Type</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('shiftDate')}>Shift Date</th>
              <th className="px-4 py-2">Break Start</th>
              <th className="px-4 py-2">Break End</th>
              <th className="px-4 py-2">Total Hours</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
              <th className="px-4 py-2">Assigned By</th>
              <th className="px-4 py-2">Overtime</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedShifts.map((shift, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="px-4 py-2 flex items-center gap-2">
                  {shift.photo && <img src={shift.photo} alt="avatar" className="w-6 h-6 rounded-full" />}
                  {shift.name}
                </td>
                <td className="px-4 py-2">{shift.startTime}</td>
                <td className="px-4 py-2">{shift.endTime}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${getBadgeClass(shift.shiftType)}`}>
                    {shift.shiftType}
                  </span>
                </td>
                <td className="px-4 py-2">{shift.shiftDate}</td>
                <td className="px-4 py-2">{shift.breakStart}</td>
                <td className="px-4 py-2">{shift.breakEnd}</td>
                <td className="px-4 py-2">{shift.totalHours}</td>
                <td className="px-4 py-2">{shift.status}</td>
                <td className="px-4 py-2">{shift.assignedBy}</td>
                <td className="px-4 py-2">{shift.overtime}</td>
                <td className="px-4 py-2">{shift.category}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => openModal(index)} className="text-yellow-600">
                    <FiEdit className="text-xl" />
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-600">
                    <FiTrash className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftTable;