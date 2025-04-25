import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from './assets/bg2.jpg';
import logo from './assets/anasol_logo11.png';

const Login = ({ setRole }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setName(role === 'Admin' ? 'admin' : 'employee');
    setPassword(role === 'Admin' ? 'admin' : 'employee');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) return;
    setRole(selectedRole); // Set the role in App.jsx

    if (selectedRole === 'Admin') {
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-4 pr-200"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 ps-25">
        <img src={logo} alt="Anasol Logo" className="w-40 h-auto" />
        <div className="text-left">
      <h1 className="text-xl font-bold text-blacktracking-wide mb-1">ANASOL</h1>
       <p className="text-xl font-bold text-black tracking-wide mb-1">CONSULTANCY</p>
       <p className="text-xl font-bold text-black tracking-wide mb-1">SERVICES</p>
       <p className="text-xl font-bold text-black tracking-wide mb-1">SINCE 2016</p>
      </div>

      </div>
      

      {/* Role Buttons */}
      <div className="mb-4 flex space-x-4 z-10 mt-35">
        <button
          onClick={() => handleRoleSelect('Admin')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${
            selectedRole === 'Admin'
              ? 'bg-blue-600 text-white'
              : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => handleRoleSelect('Employee')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition duration-300 ${
            selectedRole === 'Employee'
              ? 'bg-blue-600 text-white'
              : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          Employee
        </button>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {selectedRole ? `${selectedRole} Login` : 'Select a Role'}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
