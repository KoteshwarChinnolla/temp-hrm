import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    password: '',
    rePassword: '',
    department: '',
    address: '',
    dob: '',
    education: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    if (name === 'password' || name === 'rePassword') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setError('Passwords do not match');
      return;
    }

    const submittedData = { ...formData };

    console.log('Form Submitted:', submittedData);

    setSuccess(true);

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      phone: '',
      password: '',
      rePassword: '',
      department: '',
      address: '',
      dob: '',
      education: '',
      image: null,
    });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Employee</h2>

        {error && (
          <div className="mb-4 text-red-600 text-center font-medium bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-700 text-center font-medium bg-green-100 p-2 rounded">
            Employee added successfully!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="input"
            required
          />
          <input
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="input"
            required
          />
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            placeholder="Email"
            className="input"
            required
          />

          <select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            className="input"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Phone Number</label>
            <PhoneInput
              country={'in'}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              inputClass="!w-full !h-12 !pl-14 !border !border-gray-300 !rounded-md"
              specialLabel=""
              enableSearch
            />
          </div>

          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            placeholder="Password"
            className="input"
            required
          />
          <input
            name="rePassword"
            onChange={handleChange}
            value={formData.rePassword}
            type="password"
            placeholder="Re-enter Password"
            className="input"
            required
          />

          <select
            name="department"
            onChange={handleChange}
            value={formData.department}
            className="input"
            required
          >
            <option value="">Select Department</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="HR">HR</option>
            <option value="Designing">Designing</option>
            <option value="Marketing">Marketing</option>
          </select>

          <input
            name="education"
            onChange={handleChange}
            value={formData.education}
            type="text"
            placeholder="Education"
            className="input"
            required
          />
        </div>

        <textarea
          name="address"
          onChange={handleChange}
          value={formData.address}
          placeholder="Address"
          className="input w-full mt-4"
          rows="3"
          required
        />

        <div className="mt-4">
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            name="dob"
            onChange={handleChange}
            value={formData.dob}
            type="date"
            className="input w-full"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;