import React, { useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux";


import { logout } from "../../Features/authSlice";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from 'react-router-dom';




function Adminsidebar() {
const admindata = useSelector((state)=> state.auth.user);
const dispatch = useDispatch()
const navigate = useNavigate()    
 
  return (
    <div>
        <aside className=" fixed left-0 top-0 w-194px h-screen bg-[#131625] border-r border-slate-800 flex-col z-20">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">
              L
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                LuxeMarket
              </h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6">
          <div>
            <p className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Main Menu
            </p>
            <div className="space-y-1">
              <NavLink to={"/admin"} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-600/20">
                <span>▦</span> Dashboard
              </NavLink>
              <NavLink to={"/admin/products"} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <span>📦</span> Products
              </NavLink>
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <span>🛒</span> Orders
              </button>
              <NavLink to={"/admin/category/"} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <span>🏷️</span> Categories
              </NavLink>
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <span>👥</span> Customers
              </button>
            </div>
          </div>

          <div>
            <p className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Management
            </p>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <span>📊</span> Analytics
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition">
                <span>⚙️</span> Settings
              </button>
            </div>
          </div>
        </nav>

        {/* Admin Profile */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-semibold">
              A
            </div>
            <div className="min-w-0">
              <p className="font-medium text-white truncate">{admindata && admindata.username}</p>
              <p className="text-xs text-slate-400 truncate">{admindata && admindata.email}</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition" onClick={()=>{
            dispatch(logout())
            toast.success("Logged out successfully!")
            navigate('/adminlogin')
          }}>
            <span>↪</span> Logout
          </button>
        </div>
      </aside>
      
    </div>
  )
}

export default Adminsidebar
