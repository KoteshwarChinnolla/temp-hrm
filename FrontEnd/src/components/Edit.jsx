import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

function Edit() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    department: "",
    education: "",
    address: "",
    dob: "",
    image: null,
  });

  const [passwordError, setPasswordError] = useState("");
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (name === "confirmPassword" || name === "password") {
      const pwd = name === "password" ? value : formData.password;
      const confirmPwd = name === "confirmPassword" ? value : formData.confirmPassword;

      if (pwd !== confirmPwd) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mobile: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setNotification("Employee details saved successfully!");

    setTimeout(() => {
      setNotification("");
    }, 3000);

    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Edit Employee</h2>

        {notification && (
          <div className="bg-green-500 text-white p-3 rounded-lg shadow-md mb-4">
            <p>{notification}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded" required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" required />
            <PhoneInput
              country={'in'}
              value={formData.mobile}
              onChange={handlePhoneChange}
              inputProps={{ name: 'mobile', required: true }}
              inputClass="!w-full !h-[42px] !text-sm"
              containerClass="!w-full"
            />
            <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select name="department" value={formData.department} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Department</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="designing">Designing</option>
            </select>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 rounded" required />
            <input type="password" name="confirmPassword" placeholder="Re-enter Password" value={formData.confirmPassword} onChange={handleChange} className="border p-2 rounded" required />
          </div>

          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <textarea name="education" placeholder="Education" value={formData.education} onChange={handleChange} className="border p-2 rounded w-full" required />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded w-full" required />

          <div className="mt-4">
            <label htmlFor="dob" className="block font-medium text-sm text-gray-700">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded w-full" required />
          </div>

          <input type="file" name="image" onChange={handleChange} className="border p-2 rounded w-full" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Save Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;