import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function Admindashbord() {
     const stats = [
    { title: "Total Sales", value: "₹2,84,500", change: "+12.5%", icon: "₹" },
    { title: "Total Orders", value: "1,248", change: "+8.2%", icon: "🛒" },
    { title: "Products", value: "486", change: "+4.3%", icon: "📦" },
    { title: "Customers", value: "3,842", change: "+10.1%", icon: "👥" },
  ];

    const dispatch = useDispatch()
  const navigate = useNavigate()

     const getStatusStyle = (status) => {
        

    if (status === "Delivered") {
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    }
    if (status === "Processing") {
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
    if (status === "Shipped") {
      return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
    }
    if (status === "Cancelled") {
      return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    }
    return "bg-slate-800 text-slate-300 border border-slate-700";
  };
    
  const orders = [
    {
      id: "#ORD-1025",
      customer: "Rahul Sharma",
      product: "iPhone 15",
      amount: "₹69,999",
      status: "Delivered",
    },
    {
      id: "#ORD-1024",
      customer: "Priya Patel",
      product: "Sony Headphones",
      amount: "₹8,499",
      status: "Processing",
    },
    {
      id: "#ORD-1023",
      customer: "Amit Shah",
      product: "Dell Laptop",
      amount: "₹54,999",
      status: "Shipped",
    },
    {
      id: "#ORD-1022",
      customer: "Neha Joshi",
      product: "Smart Watch",
      amount: "₹3,999",
      status: "Cancelled",
    },
    {
      id: "#ORD-1021",
      customer: "Vivek Mehta",
      product: "Samsung TV",
      amount: "₹42,999",
      status: "Delivered",
    },
  ];

  const products = [
    {
      name: "iPhone 15",
      category: "Electronics",
      price: "₹69,999",
      stock: 42,
      sales: 128,
    },
    {
      name: "Sony WH-1000XM5",
      category: "Electronics",
      price: "₹29,999",
      stock: 18,
      sales: 96,
    },
    {
      name: "Nike Air Max",
      category: "Fashion",
      price: "₹9,999",
      stock: 65,
      sales: 84,
    },
    {
      name: "Samsung Smart TV",
      category: "Electronics",
      price: "₹42,999",
      stock: 7,
      sales: 72,
    },
  ];

  return (
    <div>
      <main className="ml-500px min-h-screen">
        {/* ================= TOPBAR ================= */}
        <header className="h-20 bg-[#131625]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-xl text-slate-300">☰</button>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Dashboard</h2>
              <p className="text-xs text-slate-400">Welcome back, Admin</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-[#1a1e30] border border-slate-800 rounded-xl px-3 py-2 w-64 focus-within:border-purple-500 transition">
              <span className="text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none px-2 w-full text-sm text-slate-200 placeholder-slate-500"
              />
            </div>
            <button className="relative p-2.5 text-slate-300 bg-[#1a1e30] border border-slate-800 hover:bg-slate-800 rounded-xl transition">
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="p-4 md:p-8 space-y-8">
          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#131625] border border-slate-800/80 rounded-2xl p-5 hover:border-purple-500/30 transition shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 text-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/50">
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    ↑ {stat.change}
                  </span>
                  <span className="text-xs text-slate-500">from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-[#131625] border border-slate-800 rounded-2xl p-5 text-left hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition group">
                <div className="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <span>＋</span>
                </div>
                <p className="font-semibold text-white">Add Product</p>
                <p className="text-xs text-slate-400 mt-1">Create new product</p>
              </button>

              <button className="bg-[#131625] border border-slate-800 rounded-2xl p-5 text-left hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/5 transition group">
                <div className="w-10 h-10 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <span>🏷️</span>
                </div>
                <p className="font-semibold text-white">Add Category</p>
                <p className="text-xs text-slate-400 mt-1">Create new category</p>
              </button>

              <button className="bg-[#131625] border border-slate-800 rounded-2xl p-5 text-left hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition group">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <span>🛒</span>
                </div>
                <p className="font-semibold text-white">View Orders</p>
                <p className="text-xs text-slate-400 mt-1">Manage customer orders</p>
              </button>

              <button className="bg-[#131625] border border-slate-800 rounded-2xl p-5 text-left hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/5 transition group">
                <div className="w-10 h-10 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                  <span>👥</span>
                </div>
                <p className="font-semibold text-white">Customers</p>
                <p className="text-xs text-slate-400 mt-1">Manage customers</p>
              </button>
            </div>
          </div>

          {/* ================= ORDERS + PRODUCTS ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* RECENT ORDERS */}
            <div className="xl:col-span-2 bg-[#131625] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-white">Recent Orders</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Latest customer orders</p>
                </div>
                <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#1a1e30]/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3">Order</th>
                      <th className="px-5 py-3">Customer</th>
                      <th className="px-5 py-3">Product</th>
                      <th className="px-5 py-3">Amount</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/30 transition">
                        <td className="px-5 py-4 font-medium text-white">{order.id}</td>
                        <td className="px-5 py-4 text-slate-300">{order.customer}</td>
                        <td className="px-5 py-4 text-slate-300">{order.product}</td>
                        <td className="px-5 py-4 font-semibold text-white">{order.amount}</td>
                        <td className="px-5 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TOP PRODUCTS */}
            <div className="bg-[#131625] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
              <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-white">Top Products</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Best selling products</p>
                </div>
                <button className="text-slate-400 hover:text-white">⋮</button>
              </div>

              <div className="p-4 space-y-4 flex-1">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/30 transition"
                  >
                    <div className="w-12 h-12 bg-slate-800 border border-slate-700/50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                      📦
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-400">{product.category}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{product.sales} sold</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-white">{product.price}</p>
                      <p
                        className={`text-xs mt-0.5 font-medium ${
                          product.stock < 10 ? "text-rose-400" : "text-emerald-400"
                        }`}
                      >
                        {product.stock} in stock
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= ORDER OVERVIEW ================= */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-4">Order Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#131625] border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center">
                    ⏳
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">48</p>
                    <p className="text-xs text-slate-400">Pending</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#131625] border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center">
                    🚚
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">72</p>
                    <p className="text-xs text-slate-400">Shipped</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#131625] border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">856</p>
                    <p className="text-xs text-slate-400">Delivered</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#131625] border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center">
                    ✕
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white">18</p>
                    <p className="text-xs text-slate-400">Cancelled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admindashbord
