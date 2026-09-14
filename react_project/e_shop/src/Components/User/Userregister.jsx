import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Django registration endpoint
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      });

      console.log("Registration Successful:", response.data);
      
      // Registration ke baad user ko login page par redirect kar dein
      navigate("/user");
      
    } catch (error) {
      console.log("Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f18] text-slate-100 font-sans flex items-center justify-center p-4">
      {/* Background ambient glow effect */}
      <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none translate-x-32 translate-y-32"></div>

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Logo / Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 items-center justify-center text-white font-bold text-xl shadow-xl shadow-purple-500/20 mb-3">
            L
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create an Account
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Join LuxeMarket to start shopping and tracking your orders
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-[#131625] border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Username Field (Mandatory) */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Username <span className="text-pink-500">*</span>
              </label>
              <div className="flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-2.5 focus-within:border-purple-500 transition">
                <span className="text-slate-400 mr-3">👤</span>
                <input
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-slate-200 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-2.5 focus-within:border-purple-500 transition">
                <span className="text-slate-400 mr-3">✉️</span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-slate-200 placeholder-slate-500"
                />
              </div>
            </div>

            {/* First Name & Last Name (Grid layout) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  First Name
                </label>
                <div className="flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-purple-500 transition">
                  <input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-transparent outline-none w-full text-sm text-slate-200 placeholder-slate-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Last Name
                </label>
                <div className="flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-3 py-2.5 focus-within:border-purple-500 transition">
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-transparent outline-none w-full text-sm text-slate-200 placeholder-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* Password Field (Mandatory) */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Password <span className="text-pink-500">*</span>
              </label>
              <div className="flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-2.5 focus-within:border-purple-500 transition">
                <span className="text-slate-400 mr-3">🔒</span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-slate-200 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-600/25 hover:opacity-95 transition active:scale-[0.99] mt-2"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Footer info / Login link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/user" className="text-purple-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;