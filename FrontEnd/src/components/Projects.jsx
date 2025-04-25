import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const initialProjects = {
  "New Projects": [
    {
      title: "ERP System",
      tasks: "12 open tasks",
      tag: { label: "Testing", color: "bg-green-500" },
      description:
        "All the Lorem Ipsum generators on the Internet tend to repeat necessary making this the first true generator on the internet",
      created: "Jan 11, 2020",
      leader: "Jens Brincker",
      priority: "Low",
      deadline: "Apr 17, 2021",
      comments: 10,
      bugs: 5,
      teamCount: 4,
      progress: 67,
    },
  ],
  Running: [
    {
      title: "Shopping Application",
      tasks: "22 open tasks",
      tag: { label: "Android", color: "bg-red-600" },
      description:
        "There are many variations of passages of Lorem Ipsum available,but suffered alteration in some form,by injected humour",
      created: "Aug 25, 2021",
      leader: "Jay Soni",
      priority: "High",
      deadline: "Mar 13, 2024",
      comments: 14,
      bugs: 10,
      teamCount: 4,
      progress: 55,
    },
  ],
  "On Hold": [
    {
      title: "J&K Sons Website",
      tasks: "9 open tasks",
      tag: { label: "Testing", color: "bg-green-500" },
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. it has roots in a piece of classical Latin literature from 45Bc",
      created: "Sep 12, 2020",
      leader: "Mark Hay",
      priority: "Low",
      deadline: "Feb 18, 2022",
      comments: 12,
      bugs: 8,
      teamCount: 4,
      progress: 70,
    },
  ],
  Finished: [
    {
      title: "Video Streaming App",
      tasks: "27 open tasks",
      tag: { label: "iPhone", color: "bg-black text-white" },
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. it has roots in a piece of classical Latin literature from 45 BC",
      created: "Jun 22, 2019",
      leader: "Airi Satou",
      priority: "High",
      deadline: "Apr 13, 2023",
      comments: 7,
      bugs: 4,
      teamCount: 4,
      progress: 100,
    },
  ],
};

const AllProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [editIndex, setEditIndex] = useState({});
  const [dropdown, setDropdown] = useState({});
  const [editData, setEditData] = useState({});

  const handleEdit = (status, index) => {
    setEditIndex({ status, index });
    setEditData(projects[status][index]);
    setDropdown({});
  };

  const handleSave = () => {
    const updated = { ...projects };
    updated[editIndex.status][editIndex.index] = editData;
    setProjects(updated);
    setEditIndex({});
  };

  const handleDelete = (status, index) => {
    const updated = { ...projects };
    updated[status].splice(index, 1);
    setProjects(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(projects).map(([status, cards]) => (
          <div key={status}>
            <h3 className="text-lg font-semibold mb-3">{status}</h3>
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl p-4 mb-4 border relative"
              >
                {editIndex.status === status && editIndex.index === i ? (
                  <div className="space-y-2">
                    <input className="w-full border p-1 rounded" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Project Title" />
                    <input className="w-full border p-1 rounded" value={editData.tag.label} onChange={(e) => setEditData({ ...editData, tag: { ...editData.tag, label: e.target.value } })} placeholder="Status" />
                    <input className="w-full border p-1 rounded" value={editData.leader} onChange={(e) => setEditData({ ...editData, leader: e.target.value })} placeholder="Team Leader" />
                    <input className="w-full border p-1 rounded" value={editData.deadline} onChange={(e) => setEditData({ ...editData, deadline: e.target.value })} placeholder="Deadline" />
                    <input className="w-full border p-1 rounded" value={editData.priority} onChange={(e) => setEditData({ ...editData, priority: e.target.value })} placeholder="Priority" />
                    <input className="w-full border p-1 rounded" value={editData.created} onChange={(e) => setEditData({ ...editData, created: e.target.value })} placeholder="Created Date" />
                    <input className="w-full border p-1 rounded" type="number" value={editData.progress} onChange={(e) => setEditData({ ...editData, progress: parseInt(e.target.value) })} placeholder="Progress" />
                    <textarea className="w-full border p-1 rounded" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Description" />
                    <div className="flex justify-end gap-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                      <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setEditIndex({})}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{card.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${card.tag.color}`}>
                          {card.tag.label}
                        </span>
                      </div>
                      <div className="relative">
                        <button onClick={() => setDropdown({ status, index: i })}><BsThreeDotsVertical /></button>
                        {dropdown.status === status && dropdown.index === i && (
                          <div className="absolute right-0 top-6 bg-white border rounded shadow text-sm z-10">
                            <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={() => handleEdit(status, i)}>Edit Project</button>
                            <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-red-500" onClick={() => handleDelete(status, i)}>Delete Project</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{card.tasks}</p>
                    <p className="text-sm text-gray-700 mb-2">{card.description}</p>

                    <div className="text-xs text-gray-500 space-y-1 mb-2">
                      <p><strong>Created:</strong> {card.created}</p>
                      <p><strong>Team Leader:</strong> {card.leader}</p>
                      <p>
                        <strong>Priority:</strong>{" "}
                        <span className={`font-semibold ${card.priority === "High" ? "text-red-500" : "text-green-500"}`}>
                          {card.priority}
                        </span>
                      </p>
                      <p><strong>Deadline:</strong> {card.deadline}</p>
                      <p><strong>Comments:</strong> {card.comments}</p>
                      <p><strong>Bug:</strong> {card.bugs}</p>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <strong>Team:</strong>
                      <img src="https://i.pravatar.cc/24?img=1" alt="avatar" className="rounded-full w-6 h-6" />
                      <img src="https://i.pravatar.cc/24?img=2" alt="avatar" className="rounded-full w-6 h-6" />
                      <img src="https://i.pravatar.cc/24?img=3" alt="avatar" className="rounded-full w-6 h-6" />
                      <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 text-gray-600">+{card.teamCount}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${card.progress}%` }}></div>
                    </div>
                    <p className="text-right text-xs text-blue-600 mt-1">Progress {card.progress}%</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;