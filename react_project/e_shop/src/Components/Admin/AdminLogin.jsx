import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginuser } from "../../Features/authSlice";


function AdminLogin() {
  const [logindata ,setLogindata]=useState({username:"",password:""})
  const admininfo = useSelector((state)=> state.auth.user)
  const adminerror = useSelector((state)=> state.auth.error)
  
  
  const handlchange = (e)=>{

    const {name ,value } = e.target;

    setLogindata({...logindata,[name]:value})
  }

 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    dispatch(loginuser(logindata))
  };

  useEffect(()=>{
     if (admininfo) {
      console.log(admininfo);
      
     navigate("/admin");
  }

  if (adminerror) {
    console.log(adminerror);
    
      // console.log(adminerror.status);
      // console.log(adminerror.data.message);
      // console.log(adminerror.message);
      // console.log(adminerror.fullerro.message);
  }
  },[admininfo,adminerror])
  
  return (
    <div className="min-h-screen bg-[#0d0f18] text-slate-100 font-sans flex items-center justify-center p-4">
      {/* Background ambient glow effect */}
      
      <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none translate-x-32 translate-y-32"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo / Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 items-center justify-center text-white font-bold text-xl shadow-xl shadow-purple-500/20 mb-4">
            L
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            LuxeMarket Admin
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to access your dashboard and control panel
          </p>
        </div>

        {/* Login Card */}
        {
        adminerror && adminerror.data.message
      }
        <div className="bg-[#131625] border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Username or Email
              </label>
              <div className="flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-3 focus-within:border-purple-500 transition">
                <span className="text-slate-400 mr-3">👤</span>
                <input
                  type="text"
                  placeholder="admin@luxemarket.com"
                  value={logindata.username}
                  name="username"
                  onChange={(e) => handlchange(e)}
                  className="bg-transparent outline-none w-full text-sm text-slate-200 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider" >
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs text-purple-400 hover:text-purple-300 transition"
                >
                  Forgot?
                </a>
              </div>
              <div className="flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-3 focus-within:border-purple-500 transition">
                <span className="text-slate-400 mr-3">🔒</span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={logindata.password}
                  name="password"
                  onChange={(e) => handlchange(e)}
                  className="bg-transparent outline-none w-full text-sm text-slate-200 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded bg-[#1a1e30] border-slate-700 text-purple-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <span className="text-slate-400 text-xs">Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-600/25 hover:opacity-95 transition active:scale-[0.99]"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Protected area • Authorized personnel only
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;