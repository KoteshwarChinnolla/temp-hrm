import React, { useState } from 'react';
import {
  FaFilePdf,
  FaFileWord,
  FaImage,
} from 'react-icons/fa';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState("messages");

  const messagesData = [
    {
      user: 'Airi Satou',
      action: 'posted message on',
      target: 'Ashton Cox',
      time: '2h ago',
      content: 'Lorem Ipsum is simply dummy text of the printing...',
    },
    {
      user: 'Cara Stevens',
      action: 'added 1 photo on',
      target: 'Ashton Cox',
      time: '3h ago',
    },
    {
      user: 'Angelica Ramos',
      action: 'started following',
      target: 'Ashton Cox',
      time: '5h ago',
      likes: true,
    },
  ];

  const activityData = [
    {
      activity: 'Client meeting completed',
      time: 'Today, 11:45 AM',
    },
    {
      activity: 'Design phase completed',
      time: 'Yesterday, 4:30 PM',
    },
    {
      activity: 'Frontend code pushed to repo',
      time: '3 days ago, 9:10 AM',
    },
    {
      activity: 'Testing phase started',
      time: '4 days ago, 1:25 PM',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Top Details */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="flex justify-between items-start">
            <div>
               <b className="text-2x1 font-bold text-black-500">Project Details</b>
              <h2 className="text-2xl font-bold text-orange-500">Wordpress Website</h2>
              <div className="mt-2">
                <span className="text-sm font-medium">Status:</span>
                <span className="ml-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">Active</span>
              </div>
              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p><b>Created by:</b> <span className="font-medium">Jayesh Patel</span></p>
                <p><b>Messages:</b> 277</p>
                <p><b>Commits:</b> 175</p>
                <p><b>Version:</b> v2.5.2</p>
                <p className="flex items-center gap-2">
                  Project Status:
                  <div className="w-40 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-full w-[60%]" />
                  </div>
                  <span className="text-xs">60% completed</span>
                </p>
              </div>
            </div>
            <div className="text-sm text-right text-gray-600 space-y-1">
              <p><b>Last Updated:</b> 22-08-2021 12:15:57</p>
              <p><b>Created:</b> 17-05-2020</p>
              <p><b>Deadline:</b> 22-09-2021</p>
              <p className="flex items-center gap-1"><b>Team:</b>
                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/women/1.jpg" />
                <img className="w-6 h-6 rounded-full -ml-2" src="https://randomuser.me/api/portraits/men/2.jpg" />
                <img className="w-6 h-6 rounded-full -ml-2" src="https://randomuser.me/api/portraits/women/3.jpg" />
                <span className="ml-2 text-blue-500 text-xs">+4</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Tab Buttons */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 p-3 text-sm font-medium ${activeTab === 'messages' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 p-3 text-sm font-medium ${activeTab === 'activity' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Last Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 space-y-4 text-sm text-gray-700">
            {activeTab === 'messages' && messagesData.map((msg, i) => (
              <div key={i}>
                <p>
                  <strong>{msg.user}</strong> {msg.action} <strong>{msg.target}</strong>
                  <span className="float-right text-gray-400">{msg.time}</span>
                </p>
                {msg.content && <p className="bg-gray-100 p-2 mt-2 rounded">{msg.content}</p>}
                {msg.likes && (
                  <div className="flex gap-3 mt-1">
                    <span className="text-blue-600 cursor-pointer">👍 Like</span>
                    <span className="text-red-500 cursor-pointer">❤️ Love</span>
                  </div>
                )}
              </div>
            ))}

            {activeTab === 'activity' && activityData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>{item.activity}</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold mb-2">Project description</h3>
          <p className="text-sm text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold mb-2">Client Details</h3>
          <p><strong>Client:</strong> xyz pvt.ltd</p>
          <p><strong>Date:</strong> 25.07.2021</p>
          <p><strong>Contact Person:</strong> John Doe</p>
          <p><strong>Country:</strong> USA</p>
          <p><strong>Budget:</strong> $500</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold mb-2">Project tags</h3>
          <div className="flex flex-wrap gap-2">
            {["Angular", "Typescript", "SCSS", "Git", "Admin", "Project", "Photoshop", "Material"].map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-200 font-medium text-gray-700">{tag}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold mb-2">Project files</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-red-600"><FaFilePdf /> Project_document.pdf <span className="ml-auto text-gray-500">Size: 4.3Mb</span></li>
            <li className="flex items-center gap-2 text-blue-600"><FaFileWord /> error_log_478558.docx <span className="ml-auto text-gray-500">Size: 2.7Mb</span></li>
            <li className="flex items-center gap-2 text-green-600"><FaImage /> screenshots.jpeg <span className="ml-auto text-gray-500">Size: 2.0Mb</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;