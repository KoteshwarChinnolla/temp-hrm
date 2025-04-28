"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import newLogo from "./assets/Anasol_logo11.png";

const Login = ({ setRole }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setName(role === "Admin" ? "admin" : "employee");
    setPassword(role === "Admin" ? "admin" : "employee");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRole(selectedRole);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Logo */}
      <div className="absolute top-8 left-8 z-10">
        <img src={newLogo} alt="Anasol Logo" className="w-16 h-16 object-contain drop-shadow-lg" />
      </div>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl backdrop-blur-lg bg-white/80 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
        
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-10 text-white relative">
          {/* Moving Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-24 left-24 w-24 h-24 bg-blue-400 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-24 right-24 w-20 h-20 bg-purple-400 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-light italic">Hello,</h2>
            <h2 className="text-6xl font-extrabold leading-tight mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">Welcome!</h2>
            <p className="mt-4 text-lg">Sign in to access your dashboard.</p>
          </div>

          <div className="relative z-10 text-sm opacity-80">
            <p className="mt-6 font-semibold">ANASOL CONSULTANCY SERVICES</p>
            <p>Since 2016</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white">
          <div className="max-w-md mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 tracking-tight leading-tight">
            Login to Your Account
          </h2>


            {/* Role Selection */}
            <div className="flex gap-4 justify-center">
              {["Admin", "Employee"].map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedRole === role
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Email or Username"
                  className="w-full border-b-2 border-gray-300 py-3 px-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border-b-2 border-gray-300 py-3 px-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="text-purple-500 rounded focus:ring-purple-500"
                  />
                  Remember me
                </label>
                <a href="#" className="text-purple-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!selectedRole || isLoading}
                className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-2 text-white transition-all ${
                  !selectedRole || isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg"
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    LOGIN
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx="true">{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
