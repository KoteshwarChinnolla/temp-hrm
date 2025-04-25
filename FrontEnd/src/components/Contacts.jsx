import { useState } from "react";
import {
  Mail, Phone, MapPin, Pencil, Trash2, Search, Plus,
  Calendar, User, AtSign, Smartphone, FileText
} from "lucide-react";

const initialContacts = [
  {
    name: "John Deo",
    email: "test@email.com",
    birthDate: "02/25/2018",
    phone: "1234567890",
    address: "God creature is sixth was abundantly and sea gathered i",
    notes: "Fowl darkness our sixth heaven. In image lights fourth a hath don't Abundantly they're, image you're . God creature is sixth was abundantly and sea gathered i the two let upon days.Very make fly saying light don't. Forth, replenish likeness.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Sarah Smith",
    email: "test@email.com",
    birthDate: "04/14/1985",
    phone: "1234567890",
    address: "Celeste Slater 606-3727 Ullamcorper. Street Roseville NH 11523",
    notes: "Passionate about travel and photography and Loves painting, yoga, and spontaneous road trips.",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
    {
    name: "Edna Gilbert",
    email: "test@email.com",
    birthDate: "11/08/1983",
    phone: "1234567890",
    address: "Hiroko Potter P.O. Box 887 2508 Dolor. Av. Muskegon KY 12482",
    notes: "Enjoys gardening and classic literature.",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    name: "Shelia Osterberg",
    email: "test@email.com",
    birthDate: "05/20/1988",
    phone: "1234567890",
    address: "881 Beechwood St. Kalamazoo MI 40783",
    notes: "Loves hiking and outdoor adventures.",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    name: "Barbara Garland",
    email: "test@email.com",
    birthDate: "04/18/1987",
    phone: "1234567890",
    address: "107 Ashley Ave Lakewood NJ 08701",
    notes: "Avid reader and tech enthusiast.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Marie Brodsky",
    email: "test@email.com",
    birthDate: "11/08/1983",
    phone: "1234567890",
    address: "D-178/2, Ttc Industrial Area, Navi Mumbai",
    notes: "Loves cooking and yoga.",
    avatar: "https://i.pravatar.cc/150?img=6"
  },
  {
    name: "Kara Thompson",
    email: "test@email.com",
    birthDate: "04/18/1987",
    phone: "1234567890",
    address: "H-6, 1st Fl., Omkar, Nehru Nagar, Mumbai",
    notes: "Speaks 4 languages and enjoys running.",
    avatar: "https://i.pravatar.cc/150?img=7"
  },
  {
    name: "Joseph Nye",
    email: "test@email.com",
    birthDate: "05/20/1987",
    phone: "1234567890",
    address: "26, 2nd Flr, Nariman Bldg, Fort, Mumbai",
    notes: "History buff and political science nerd.",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    name: "Ricardo Wendler",
    email: "test@email.com",
    birthDate: "04/14/1985",
    phone: "1234567890",
    address: "1st Floor P.O. Box No 306, Marine Lines",
    notes: "Music producer and gamer.",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

function Contacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editContactIndex, setEditContactIndex] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '', email: '', phone: '', birthDate: '', address: '', notes: '',
    avatar: 'https://i.pravatar.cc/150?img=11'
  });

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (indexToDelete) => {
    setContacts(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email || !newContact.phone || !newContact.birthDate) return;
    setContacts(prev => [...prev, newContact]);
    setNewContact({ name: '', email: '', phone: '', birthDate: '', address: '', notes: '', avatar: 'https://i.pravatar.cc/150?img=11' });
    setShowAddModal(false);
  };

  const handleEditSave = () => {
    const updated = [...contacts];
    updated[editContactIndex] = editContact;
    setContacts(updated);
    setEditContact(null);
    setEditContactIndex(null);
  };

  const handleAvatarUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditContact(prev => ({ ...prev, avatar: reader.result }));
        } else {
          setNewContact(prev => ({ ...prev, avatar: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-blue-100 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Contacts</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-blue-600">
            <button
              className="p-2 hover:bg-blue-100 rounded-full transition"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
  <table className="min-w-full table-fixed">
    <thead className="bg-gray-50">
      <tr>
        <th className="w-6"></th>
        <th className="text-left px-4 py-2 w-[16%]">Name</th>
        <th className="text-left px-4 py-2 w-[20%]">Email</th>
        <th className="text-left px-4 py-2 w-[14%]">Birth Date</th>
        <th className="text-left px-4 py-2 w-[14%]">Mobile</th>
        <th className="text-left px-4 py-2 w-[26%]">Address</th>
        <th className="text-left px-4 py-2 w-[10%]">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredContacts.map((contact, index) => (
        <tr
          key={index}
          className="hover:bg-gray-100 cursor-pointer text-sm"
          onClick={() => setSelectedContact(contact)}
        >
          <td className="px-2"><input type="checkbox" /></td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{contact.name}</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1 text-red-500">
              <Mail className="w-4 h-4" /> <span>{contact.email}</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1 text-gray-700">
              <Calendar className="w-4 h-4 text-gray-500" /> <span>{contact.birthDate}</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1 text-green-600">
              <Phone className="w-4 h-4" /> <span>{contact.phone}</span>
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1 text-blue-500">
              <MapPin className="w-4 h-4" /> <span>{contact.address.substring(0, 40)}...</span>
            </div>
          </td>
          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2">
              <Pencil
                className="w-4 h-4 text-purple-500 cursor-pointer"
                onClick={() => {
                  setEditContactIndex(index);
                  setEditContact(contact);
                }}
              />
              <Trash2
                className="w-4 h-4 text-orange-500 cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        <div className="p-4 border-t flex justify-between items-center">
          <span className="text-sm">
            Items per page: <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>20</option>
            </select>
          </span>
          <span className="text-sm">1 – {contacts.length} of {contacts.length}</span>
        </div>
      </div>

      {/* existing UI code... */}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] relative">
            <button className="absolute top-4 right-6 text-xl text-gray-500" onClick={() => setShowAddModal(false)}>✕</button>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-semibold">New Contact</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input className="pl-10 w-full border rounded-lg py-2" placeholder="Name*" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} />
              </div>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 text-gray-400" />
                <input className="pl-10 w-full border rounded-lg py-2" placeholder="Email*" value={newContact.email} onChange={e => setNewContact({ ...newContact, email: e.target.value })} />
              </div>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 text-gray-400" />
                <input className="pl-10 w-full border rounded-lg py-2" placeholder="Mobile*" value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" />
                <input type="date" className="pl-10 w-full border rounded-lg py-2" placeholder="Birth date*" value={newContact.birthDate} onChange={e => setNewContact({ ...newContact, birthDate: e.target.value })} />
              </div>
              <div className="col-span-2">
                <textarea className="w-full border rounded-lg p-2" rows="2" placeholder="Address" value={newContact.address} onChange={e => setNewContact({ ...newContact, address: e.target.value })} />
              </div>
              {/* ... other input fields ... */}
            
              <div className="col-span-2">
                <textarea className="w-full border rounded-lg p-2" rows="2" placeholder="Note" value={newContact.notes} onChange={e => setNewContact({ ...newContact, notes: e.target.value })} />
              </div>
              <div className="col-span-2 flex items-center gap-4">
                <img src={newContact.avatar} alt="Avatar preview" className="w-12 h-12 rounded-full border" />
                <label className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer text-sm text-gray-700">
                  Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button className="bg-gray-300 px-4 py-2 rounded-full" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={handleAddContact}>Save</button>
            </div>
          </div>
        </div>
      )}

      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl relative space-y-4">
            <button className="absolute top-3 right-3 text-gray-500" onClick={() => setSelectedContact(null)}>✕</button>
            <div className="flex items-center gap-3 mb-4">
              <img src={selectedContact.avatar} alt={selectedContact.name} className="w-12 h-12 rounded-full" />
              <h3 className="text-2xl font-semibold">{selectedContact.name}</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {selectedContact.email}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {selectedContact.phone}</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedContact.birthDate}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedContact.address}</div>
            
              <div className="pt-2 border-t"><strong>Notes:</strong><p className="whitespace-pre-wrap mt-1 text-yellow-700">{selectedContact.notes}</p></div>
            </div>
          </div>
        </div>
      )}

      {editContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] relative">
            <button className="absolute top-4 right-6 text-xl text-gray-500" onClick={() => { setEditContact(null); setEditContactIndex(null); }}>✕</button>
            <div className="flex items-center gap-3 mb-6">
              <img src={editContact.avatar} alt="Edit Contact" className="w-10 h-10 rounded-full" />
              <h3 className="text-xl font-semibold">Edit Contact</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border rounded-lg p-2" placeholder="Name*" value={editContact.name} onChange={e => setEditContact({ ...editContact, name: e.target.value })} />
              <input className="border rounded-lg p-2" placeholder="Email*" value={editContact.email} onChange={e => setEditContact({ ...editContact, email: e.target.value })} />
              <input className="border rounded-lg p-2" placeholder="Phone*" value={editContact.phone} onChange={e => setEditContact({ ...editContact, phone: e.target.value })} />
              <input type="date" className="border rounded-lg p-2" value={editContact.birthDate} onChange={e => setEditContact({ ...editContact, birthDate: e.target.value })} />
              <textarea className="col-span-2 border rounded-lg p-2" rows="2" placeholder="Address" value={editContact.address} onChange={e => setEditContact({ ...editContact, address: e.target.value })} />
              
              <textarea className="col-span-2 border rounded-lg p-2" rows="2" placeholder="Notes" value={editContact.notes} onChange={e => setEditContact({ ...editContact, notes: e.target.value })} />
              <div className="col-span-2 flex items-center gap-4">
                <img src={editContact.avatar} alt="Avatar preview" className="w-12 h-12 rounded-full border" />
                <label className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer text-sm text-gray-700">
                  Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleAvatarUpload(e, true)} />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button className="bg-gray-300 px-4 py-2 rounded-full" onClick={() => { setEditContact(null); setEditContactIndex(null); }}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;