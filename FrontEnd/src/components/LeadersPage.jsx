import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const initialContacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'test@email.com',
    role: 'Project Manager',
    mobile: '1234567890',
    department: 'Java',
    project: 'Hoapital Management',
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'test@email.com',
    role: 'Team Leader',
    mobile: '1234567890',
    department: 'Designing',
    project: 'Android Shopping App',
    image: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Rajesh',
    email: 'test@email.com',
    role: 'Team Leader',
    mobile: '1234567890',
    department: 'Marketing',
    project: 'School Website',
    image: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Jay Soni',
    email: 'test@email.com',
    role: 'Project Manager',
    mobile: '1234567890',
    department: 'Java',
    project: 'IOS chating app',
    image: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    name: 'Rajesh',
    email: 'test@email.com',
    role: 'Team Leader',
    mobile: '1234567890',
    department: 'Accounting',
    project: 'Java software',
    image: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 6,
    name: 'John Doe',
    email: 'test@email.com',
    role: 'Team Leader',
    mobile: '1234567890',
    department: 'Developing',
    project: 'Bootstrap template',
    image: 'https://i.pravatar.cc/150?img=6'
  },
  {
    id: 7,
    name: 'Cara Stevens',
    email: 'test@email.com',
    role: 'Project Manager',
    mobile: '1234567890',
    department: 'Tesing',
    project: 'PHP website',
    image: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: 8,
    name: 'Jay Soni',
    email: 'test@email.com',
    role: 'Team Leader',
    mobile: '1234567890',
    department: 'Tesing',
    project: 'Dating Website',
    image: 'https://i.pravatar.cc/150?img=8'
  },
  {
    id: 9,
    name: 'Angelica Ramos',
    email: 'test@email.com',
    role: 'Project Manager',
    mobile: '1234567890',
    department: 'Java',
    project: 'Vagitable shop app',
    image: 'https://i.pravatar.cc/150?img=9'
  },
  // ... (your contacts array remains the same)
];

export default function LeadersPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "", mobile: "", department: "", project: "" });
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.toLowerCase()) ||
    contact.department.toLowerCase().includes(search.toLowerCase()) ||
    contact.project.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddOrEditContact = () => {
    if (editIndex !== null) {
      const updated = [...contacts];
      updated[editIndex] = { ...updated[editIndex], ...form };
      setContacts(updated);
    } else {
      setContacts([
        ...contacts,
        { ...form, id: contacts.length + 1, image: `https://i.pravatar.cc/150?img=${contacts.length + 1}` },
      ]);
    }
    setForm({ name: "", email: "", role: "", mobile: "", department: "", project: "" });
    setEditIndex(null);
    setOpen(false);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setSelectedContacts(selectedContacts.filter(cid => cid !== id));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(contacts[index]);
    setOpen(true);
  };

  const toggleSelectContact = (id) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const selectAll = (checked) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map(c => c.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const deleteSelected = () => {
    setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Leaders</h1>
          <div className="flex items-center gap-2">
            {selectedContacts.length > 0 && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={deleteSelected}
              >
                Delete Selected
              </button>
            )}
            <button
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
              onClick={() => { setForm({ name: "", email: "", role: "", mobile: "", department: "", project: "" }); setEditIndex(null); setOpen(true); }}
            >
              +
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl">
            <thead>
              <tr className="text-left text-gray-700 uppercase text-sm bg-gray-100 border-b">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={(e) => selectAll(e.target.checked)}
                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                  />
                </th>
                <th className="p-3">Employee Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Department</th>
                <th className="p-3">Project</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={contact.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => toggleSelectContact(contact.id)}
                    />
                  </td>
                  <td className="p-3 flex items-center gap-3">
                    <img src={contact.image} alt={contact.name} className="w-9 h-9 rounded-full border" />
                    <span className="font-medium text-gray-800">{contact.name}</span>
                  </td>
                  <td className="p-3 text-red-600">{contact.email}</td>
                  <td className="p-3">{contact.role}</td>
                  <td className="p-3 text-green-600">📞 {contact.mobile}</td>
                  <td className="p-3">{contact.department}</td>
                  <td className="p-3 truncate max-w-[160px]">{contact.project}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700" title="Edit">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDeleteContact(contact.id)} className="text-red-500 hover:text-red-700" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              {form.image && <img src={form.image} className="w-12 h-12 rounded-full" alt="avatar" />}
              <div>
                <h2 className="text-2xl font-bold mb-1 text-gray-800">{editIndex !== null ? `Edit Contact` : 'Add New Contact'}</h2>
                <p className="text-sm text-gray-500">Fill out the details below.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Project" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setOpen(false); setEditIndex(null); }} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Cancel</button>
              <button onClick={handleAddOrEditContact} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
