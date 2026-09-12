import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  // =========================
  // VARIABLES / STATES
  // =========================

  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();


  // =========================
  // FUNCTIONS
  // =========================

  const toggleWishlist = () => {
    setWishlistCount(wishlistCount + 1);
  };


  // =========================
  // JSX
  // =========================

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
              <span className="text-purple-400">
                Market
              </span>
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

            <a
              href="/"
              className="hover:text-purple-400"
            >
              Home
            </a>

            <a
              href="#categories"
              className="hover:text-purple-400"
            >
              Categories
            </a>

            <a
              href="#featured"
              className="hover:text-purple-400"
            >
              Featured
            </a>


            {/* LOGIN DROPDOWN */}

            <select
              defaultValue=""
              onChange={(e) => {

                if (e.target.value === "AdminLogin") {
                  navigate("/AdminLogin");
                }

                if (e.target.value === "user") {
                  navigate("/user");
                }

              }}
              className="bg-transparent text-slate-300 outline-none cursor-pointer"
            >

              <option value="" disabled>
                Login
              </option>

              <option value="user">
                User
              </option>

              <option value="AdminLogin">
                Admin
              </option>

            </select>


            <a
              href="#reviews"
              className="hover:text-purple-400"
            >
              Reviews
            </a>

          </div>


          {/* USER ACTIONS */}

          <div className="flex items-center space-x-4">


            {/* WISHLIST */}

            <button
              onClick={toggleWishlist}
              className="relative p-2 text-white"
            >

              ❤️

              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                {wishlistCount}

              </span>

            </button>


            {/* CART */}

            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-purple-600 text-white px-4 py-2 rounded-full"
            >

              🛒 Cart

              <span className="ml-2 bg-white text-purple-600 px-2 rounded-full">

                {totalCartCount}

              </span>

            </button>


            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="lg:hidden text-white text-xl"
            >

              ☰

            </button>

          </div>

        </div>

      </div>


      {/* MOBILE MENU */}

      {mobileMenuOpen && (

        <div className="lg:hidden bg-slate-900 px-6 py-4 space-y-3">

          <a
            href="/"
            className="block text-white"
          >
            Home
          </a>

          <a
            href="#categories"
            className="block text-white"
          >
            Categories
          </a>

          <a
            href="#featured"
            className="block text-white"
          >
            Featured
          </a>

        </div>

      )}


      {/* CART MESSAGE */}

      {cartOpen && (

        <div className="fixed right-5 top-24 bg-white text-black p-5 rounded-lg shadow-lg">

          <h2 className="font-bold">
            Cart
          </h2>

          <p>
            Cart is open
          </p>

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