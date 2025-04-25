import React, { useState } from 'react';
import { Pencil, Trash, RefreshCw, Plus, Download, Phone, Mail } from 'lucide-react';

const initialData = [
  { id: 589, name: 'Sarah Smith', mobile: '123544...', email: 'sarah.s...', eDate: '02/12/2018', expDate: '02/12/2018', country: 'India', amount: '$142', status: 'Accepted' },
  { id: 784, name: 'John Doe', mobile: '123456...', email: 'john.do...', eDate: '02/12/2018', expDate: '02/12/2018', country: 'USA', amount: '$872', status: 'Declined' },
  { id: 658, name: 'Airi Satou', mobile: '234567...', email: 'airi.sat...', eDate: '02/12/2018', expDate: '02/12/2018', country: 'Australia', amount: '$1542', status: 'Accepted' },
  { id: 285, name: 'Angelica Ramos', mobile: '345678...', email: 'angelica.r...', eDate: '02/12/2018', expDate: '02/12/2018', country: 'Sri Lanka', amount: '$9574', status: 'Declined' },
  { id: 458, name: 'Ashton Cox', mobile: '456789...', email: 'ashton.c...', eDate: '02/12/2018', expDate: '02/12/2018', country: 'India', amount: '$10000', status: 'Sent' },
  { id: 958, name: 'Cara Stevens', mobile: '567890...', email: 'cara.stev...', eDate: '02/12/2018', expDate: '02/12/2018', country: 'Bangladesh', amount: '$578', status: 'Sent' },
  { id: 257, name: 'Jacob Ryan', mobile: '678901...', email: 'jacob.rya...', eDate: '02/12/2018', expDate: '02/12/2018', country: 'Sri Lanka', amount: '$479', status: 'Expired' },
];

const statusColor = {
  Accepted: 'bg-green-100 text-green-800',
  Declined: 'bg-orange-100 text-orange-800',
  Sent: 'bg-purple-100 text-purple-800',
  Expired: 'bg-red-100 text-red-800',
};

const EstimatesTable = () => {
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [selected, setSelected] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEstimate, setCurrentEstimate] = useState(null);
  const [newEstimate, setNewEstimate] = useState({
    name: '',
    mobile: '',
    email: '',
    eDate: '',
    expDate: '',
    country: '',
    amount: '',
    status: '',
  });

  const filteredData = initialData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAll = () => {
    if (selected.length === filteredData.length) setSelected([]);
    else setSelected(filteredData.map((i) => i.id));
  };

  const toggleCheckbox = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddClick = () => {
    setIsAdding(!isAdding);
    setIsEditing(false);
    setCurrentEstimate(null);
    setNewEstimate({
      name: '',
      mobile: '',
      email: '',
      eDate: '',
      expDate: '',
      country: '',
      amount: '',
      status: '',
    });
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setIsAdding(false);
    setCurrentEstimate(item);
    setNewEstimate({ ...item });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEstimate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing && currentEstimate) {
      // Update the estimate
      const updatedData = initialData.map((item) =>
        item.id === currentEstimate.id ? { ...currentEstimate, ...newEstimate } : item
      );
      console.log(updatedData);
    } else {
      // Add a new estimate
      initialData.push({ ...newEstimate, id: Date.now() });
    }

    // Reset form and states after saving
    setIsEditing(false);
    setIsAdding(false);
    setCurrentEstimate(null);
    setNewEstimate({
      name: '',
      mobile: '',
      email: '',
      eDate: '',
      expDate: '',
      country: '',
      amount: '',
      status: '',
    });
  };

  const handleDownload = () => {
    const headers = [
      'E.ID', 'Client Name', 'Mobile', 'Email', 'E.Date', 'Expiration Date', 'Country', 'Amount', 'Status'
    ];
    const rows = initialData.map(item => [
      item.id, item.name, item.mobile, item.email, item.eDate, item.expDate, item.country, item.amount, item.status
    ]);
    
    const csvContent = [
      headers.join(','), // header row
      ...rows.map(row => row.join(',')) // data rows
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'estimates_data.csv'; // Set the filename
    link.click();
  };

  return (
    <div className="p-4">
      <div className="bg-blue-100 px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-t-md space-y-2 sm:space-y-0">
        <h1 className="text-lg font-semibold">All Estimates</h1>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm"
          />
          <button onClick={handleAddClick} className="flex items-center gap-1 bg-white border rounded-md px-3 py-1 text-sm hover:bg-gray-100">
            <Plus size={16} /> Add
          </button>
          <button className="flex items-center gap-1 bg-white border rounded-md px-3 py-1 text-sm hover:bg-gray-100">
            <RefreshCw size={16} /> Refresh
          </button>
          <button onClick={handleDownload} className="flex items-center gap-1 bg-white border rounded-md px-3 py-1 text-sm hover:bg-gray-100">
            <Download size={16} /> Download
          </button>
        </div>
      </div>

      {/* Add or Edit Form */}
      {(isAdding || isEditing) && (
        <div className="mt-4 bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">{isEditing ? 'Edit Estimate' : 'Add New Estimate'}</h2>
          <form onSubmit={handleSave}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm">Client Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEstimate.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Mobile</label>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <input
                    type="text"
                    name="mobile"
                    value={newEstimate.mobile}
                    onChange={handleChange}
                    className="w-full border px-3 py-1 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm">Email</label>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <input
                    type="email"
                    name="email"
                    value={newEstimate.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-1 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm">Expiration Date</label>
                <input
                  type="date"
                  name="expDate"
                  value={newEstimate.expDate}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Country</label>
                <input
                  type="text"
                  name="country"
                  value={newEstimate.country}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={newEstimate.amount}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm">Status</label>
                <select
                  name="status"
                  value={newEstimate.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded-md"
                >
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                  <option value="Sent">Sent</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
                {isEditing ? 'Save Changes' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {!isAdding && !isEditing && (
        <div className="overflow-auto max-h-[500px] border-x border-b">
          <table className="min-w-full text-sm text-left divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th className="px-4 py-2">E.ID</th>
                <th className="px-4 py-2">Client Name</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">E.Date</th>
                <th className="px-4 py-2">Expiration Date</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleCheckbox(item.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.mobile}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.eDate}</td>
                  <td className="px-4 py-2">{item.expDate}</td>
                  <td className="px-4 py-2">{item.country}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-md ${statusColor[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
  {deleteConfirmId === item.id ? (
    <>
      <button
        onClick={() => {
          // Delete logic here
          const index = initialData.findIndex(i => i.id === item.id);
          if (index !== -1) {
            initialData.splice(index, 1); // remove from array
          }
          setDeleteConfirmId(null); // reset
        }}
        className="text-red-600 hover:text-red-800 mr-2"
      >
        Delete
      </button>
      <button
        onClick={() => setDeleteConfirmId(null)}
        className="text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleEditClick(item)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={() => setDeleteConfirmId(item.id)}
        className="text-red-600 hover:text-red-800 ml-2"
      >
        <Trash size={16} />
      </button>
    </>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EstimatesTable;