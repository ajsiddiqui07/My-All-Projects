import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // 1. useSelector import kiya
import { logout } from "../../Features/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 2. Redux store se user/admin details nikal li
  const userdetail = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.token);





  const toggleWishlist = () => {
    setWishlistCount(wishlistCount + 1);
  };

  const handleLogout = () => {
    dispatch(logout());

    navigate('/'); // Logout ke baad landing page par bhej diya
  };

  

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-[#0f172a]/85 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center text-white font-extrabold text-xl">
              L
            </div>
            <span className="text-2xl font-black text-white">
              Luxe
              <span className="text-purple-400">Market</span>
            </span>
          </a>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-sm text-white rounded-full px-4 py-2.5 outline-none border border-slate-700"
            />
          </div>

          {/* NAVIGATION */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-slate-300">

            <NavLink to={"/"} className="hover:text-purple-400">
              Home
            </NavLink>
            <a href="#categories" className="hover:text-purple-400">
              Categories
            </a>
            <a href="#featured" className="hover:text-purple-400">
              Featured
            </a>

            {/* =================================================== */}
            {/* CONDITIONAL RENDERING: LOGIN DROPDOWN vs PROFILE ICON */}
            {/* =================================================== */}
            {accessToken ? (
              // Agar user logged in hai (Token/Details present hain)
              <div className="relative">
                <button
                  onClick={() => {
                    
                    if (userdetail?.username === "admin") {

                      navigate("/admin");
                    } else {
                      console.log(userdetail.username);
                      navigate("/user");
                    }
                  }}
                  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    {userdetail?.username ? (
                      userdetail.username.charAt(0).toUpperCase()
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    )}
                  </div>

                  <span className="text-white text-xs font-medium max-w-[100px] truncate">
                    {userdetail?.username || "Account"}
                  </span>
                </button>

                {/* Dropdown Menu for Logged-in User */}
                {/* {profileDropdownOpen && (
                  // <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50">
                  //   <div className="px-4 py-2 border-b border-slate-800 text-xs text-slate-400 truncate">
                  //     Signed in as <br />
                  //     <span className="text-white font-semibold">{userdetail?.username}</span>
                  //   </div>
                  //   <button
                  //     onClick={() => {
                  //       setProfileDropdownOpen(false);
                  //       navigate('/admin'); // Ya profile page
                  //     }}
                  //     className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 transition"
                  //   >
                  //     Dashboard / Profile
                  //   </button>
                  //   <button
                  //     onClick={handleLogout}
                  //     className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-slate-800 transition"
                  //   >
                  //     Logout
                  //   </button>
                  // </div>
                  <h1></h1>
                )} */}
              </div>
            ) : (
              // Agar logged out hai, toh purana Login Dropdown dikhega
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value === "AdminLogin") {
                    navigate("/AdminLogin");
                  }
                  if (e.target.value === "user") {
                    navigate("/userlogin");
                  }
                }}
                className="bg-transparent text-slate-300 outline-none cursor-pointer"
              >
                <option value="" disabled className="bg-slate-900">
                  Login
                </option>
                <option value="user" className="bg-slate-900">
                  User
                </option>
                <option value="AdminLogin" className="bg-slate-900">
                  Admin
                </option>
              </select>
            )}

            <a href="#reviews" className="hover:text-purple-400">
              Reviews
            </a>
          </div>

          {/* USER ACTIONS (WISHLIST, CART, MOBILE MENU) */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleWishlist} className="relative p-2 text-white">
              ❤️
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-purple-600 text-white px-4 py-2 rounded-full flex items-center"
            >
              🛒 Cart
              <span className="ml-2 bg-white text-purple-600 px-2 rounded-full text-xs font-bold">
                {totalCartCount}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white text-xl"
            >
              ☰
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 px-6 py-4 space-y-3 border-t border-slate-800">
          <a href="/" className="block text-white">Home</a>
          <a href="#categories" className="block text-white">Categories</a>
          <a href="#featured" className="block text-white">Featured</a>

          {accessToken ? (
            <button
              onClick={handleLogout}
              className="block text-red-400 font-semibold pt-2"
            >
              Logout ({userdetail?.username})
            </button>
          ) : (
            <div className="flex gap-4 pt-2">
              <button onClick={() => navigate('/user')} className="text-purple-400 text-sm">User Login</button>
              <button onClick={() => navigate('/AdminLogin')} className="text-purple-400 text-sm">Admin Login</button>
            </div>
          )}
        </div>
      )}

      {/* CART MESSAGE DRAWER */}
      {cartOpen && (
        <div className="fixed right-5 top-24 bg-white text-black p-5 rounded-lg shadow-lg z-50">
          <h2 className="font-bold">Cart</h2>
          <p>Cart is open</p>
          <button
            onClick={() => setCartOpen(false)}
            className="mt-3 bg-purple-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;