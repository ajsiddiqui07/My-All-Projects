
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Features/authSlice";
import { toast } from "react-toastify";

function UserProfile() {

  const userdata = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!')
    navigate("/userlogin");
  };

  return (
    <div className="min-h-screen bg-[#0d0f18] text-slate-100 font-sans">

      {/* ================= HEADER ================= */}
      <header className="h-20 bg-[#131625]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">

        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">
            L
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              LuxeMarket
            </h1>

            <p className="text-xs text-slate-400">
              User Profile
            </p>
          </div>

        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-xl bg-[#1a1e30] border border-slate-800 text-sm text-slate-300 hover:text-white hover:border-purple-500/50 transition"
        >
          ← Back to Home
        </button>

      </header>


      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">

        {/* Page Heading */}
        <div className="mb-8">

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            My Profile
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Manage your account information and preferences
          </p>

        </div>


        {/* ================= PROFILE CARD ================= */}
        <div className="bg-[#131625] border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">

          {/* Profile Banner */}
          <div className="h-32 md:h-40 bg-gradient-to-r from-purple-700/40 via-purple-600/20 to-pink-600/30 relative">

            <div className="absolute inset-0 bg-gradient-to-t from-[#131625] to-transparent"></div>

          </div>


          {/* Profile Information */}
          <div className="px-6 md:px-8 pb-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 -mt-12 relative">

              {/* Avatar + Name */}
              <div className="flex items-end gap-4">

                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 border-4 border-[#131625] flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                  {userdata?.username
                    ? userdata.username.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div className="pb-2">

                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {userdata?.username || "User"}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {userdata?.email || "user@example.com"}
                  </p>

                </div>

              </div>


              {/* Edit Button */}
              <button
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium shadow-lg shadow-purple-600/20 hover:opacity-95 transition"
              >
                ✎ Edit Profile
              </button>

            </div>

          </div>

        </div>


        {/* ================= PROFILE DETAILS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* ================= PERSONAL INFORMATION ================= */}
          <div className="lg:col-span-2 bg-[#131625] border border-slate-800 rounded-2xl p-6 shadow-xl">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h3 className="text-lg font-bold text-white">
                  Personal Information
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Your basic account information
                </p>
              </div>

              <span className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                👤
              </span>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Username
                </label>

                <div className="bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200">
                  {userdata?.username || "Not Available"}
                </div>
              </div>


              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Email
                </label>

                <div className="bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200">
                  {userdata?.email || "Not Available"}
                </div>
              </div>


              {/* First Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  First Name
                </label>

                <div className="bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200">
                  {userdata?.first_name || "Not Available"}
                </div>
              </div>


              {/* Last Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Last Name
                </label>

                <div className="bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200">
                  {userdata?.last_name || "Not Available"}
                </div>
              </div>


              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Phone Number
                </label>

                <div className="bg-[#1a1e30] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200">
                  {userdata?.phone || "Not Available"}
                </div>
              </div>


              {/* Account Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Account Status
                </label>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-emerald-400">
                  ● Active
                </div>
              </div>

            </div>

          </div>


          {/* ================= ACCOUNT SETTINGS ================= */}
          <div className="bg-[#131625] border border-slate-800 rounded-2xl p-6 shadow-xl">

            <h3 className="text-lg font-bold text-white">
              Account Settings
            </h3>

            <p className="text-xs text-slate-400 mt-1 mb-6">
              Manage your account
            </p>


            <div className="space-y-3">

              {/* Change Password */}
              <button
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#1a1e30] border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800/50 transition text-left"
              >

                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Change Password
                  </p>

                  <p className="text-xs text-slate-500">
                    Update your password
                  </p>
                </div>

              </button>


              {/* My Orders */}
              <button
                onClick={() => navigate("/orders")}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#1a1e30] border border-slate-800 hover:border-sky-500/40 hover:bg-slate-800/50 transition text-left"
              >

                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                  🛒
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    My Orders
                  </p>

                  <p className="text-xs text-slate-500">
                    View your orders
                  </p>
                </div>

              </button>


              {/* Addresses */}
              <button
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#1a1e30] border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/50 transition text-left"
              >

                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  📍
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    My Addresses
                  </p>

                  <p className="text-xs text-slate-500">
                    Manage delivery addresses
                  </p>
                </div>

              </button>


              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 hover:bg-rose-500/10 transition text-left"
              >

                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  ↪
                </div>

                <div>
                  <p className="text-sm font-medium text-rose-400">
                    Logout
                  </p>

                  <p className="text-xs text-slate-500">
                    Sign out from your account
                  </p>
                </div>

              </button>

            </div>

          </div>

        </div>


        {/* ================= ADDRESS ================= */}
        <div className="mt-6 bg-[#131625] border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3 className="text-lg font-bold text-white">
                Delivery Address
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Your default shipping address
              </p>
            </div>

            <span className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              📍
            </span>

          </div>


          <div className="bg-[#1a1e30] border border-slate-800 rounded-xl p-5">

            <div className="flex items-start gap-4">

              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                🏠
              </div>

              <div>

                <p className="text-sm font-semibold text-white">
                  Home Address
                </p>

                <p className="text-sm text-slate-400 mt-2 leading-6">
                  {userdata?.address || "No delivery address added yet."}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= RECENT ORDERS ================= */}
        <div className="mt-6 bg-[#131625] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">

          <div className="p-6 border-b border-slate-800 flex items-center justify-between">

            <div>
              <h3 className="text-lg font-bold text-white">
                Recent Orders
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Your latest purchases
              </p>
            </div>

            <button
              onClick={() => navigate("/orders")}
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              View All →
            </button>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-[#1a1e30]/50 text-slate-400 text-xs uppercase tracking-wider">

                <tr>

                  <th className="px-6 py-4">
                    Order
                  </th>

                  <th className="px-6 py-4">
                    Product
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-800/60">

                <tr className="hover:bg-slate-800/20 transition">

                  <td className="px-6 py-4 text-sm font-medium text-white">
                    #ORD-1025
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    iPhone 15
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    ₹69,999
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Delivered
                    </span>

                  </td>

                </tr>


                <tr className="hover:bg-slate-800/20 transition">

                  <td className="px-6 py-4 text-sm font-medium text-white">
                    #ORD-1024
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    Sony Headphones
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    ₹8,499
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Processing
                    </span>

                  </td>

                </tr>


                <tr className="hover:bg-slate-800/20 transition">

                  <td className="px-6 py-4 text-sm font-medium text-white">
                    #ORD-1023
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-300">
                    Dell Laptop
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    ₹54,999
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Shipped
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default UserProfile;

