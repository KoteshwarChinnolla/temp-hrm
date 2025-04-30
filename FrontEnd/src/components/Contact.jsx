import React from 'react';

const Contact = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Team Lead',
      email: 'johndoe@company.com',
      phone: '+1234567890',
    },
    {
      name: 'Jane Smith',
      role: 'Frontend Developer',
      email: 'janesmith@company.com',
      phone: '+1234567891',
    },
    {
      name: 'Tom Lee',
      role: 'UI/UX Designer',
      email: 'tomlee@company.com',
      phone: '+1234567892',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-4 sm:p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">Team Contacts</h1>

        <p className="mb-8 text-gray-600 text-center text-sm sm:text-base">
          Reach out to your team directly via email or phone.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="mb-4">
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {member.name} <span className="text-sm text-gray-500 block sm:inline">({member.role})</span>
                </p>
                <p className="text-sm text-gray-600 break-all">{member.email}</p>
                <p className="text-sm text-gray-600">{member.phone}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-2">
                <a
                  href={`mailto:${member.email}`}
                  className="w-full sm:w-auto text-center text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  Email
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="w-full sm:w-auto text-center text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
                >
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;