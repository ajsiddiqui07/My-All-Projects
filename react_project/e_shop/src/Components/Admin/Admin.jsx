import React from "react";

function Admin() {
  const stats = [
    { title: "Total Sales", value: "₹2,84,500", change: "+12.5%", icon: "₹" },
    { title: "Total Orders", value: "1,248", change: "+8.2%", icon: "🛒" },
    { title: "Products", value: "486", change: "+4.3%", icon: "📦" },
    { title: "Customers", value: "3,842", change: "+10.1%", icon: "👥" },
  ];

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

  const getStatusStyle = (status) => {
    if (status === "Delivered") {
      return "bg-green-50 text-green-700";
    }

    if (status === "Processing") {
      return "bg-yellow-50 text-yellow-700";
    }

    if (status === "Shipped") {
      return "bg-blue-50 text-blue-700";
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-700";
    }

    return "bg-gray-50 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}

      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex-col">

        {/* Logo */}

        <div className="h-20 flex items-center px-6 border-b border-gray-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              e
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                eShop
              </h1>

              <p className="text-xs text-gray-400">
                Admin Panel
              </p>
            </div>

          </div>

        </div>


        {/* Navigation */}

        <nav className="flex-1 p-4">

          <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase">
            Main Menu
          </p>

          <div className="space-y-1">

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium">
              <span>▦</span>
              Dashboard
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
              <span>📦</span>
              Products
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
              <span>🛒</span>
              Orders
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
              <span>🏷️</span>
              Categories
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
              <span>👥</span>
              Customers
            </button>

          </div>


          <p className="px-3 mt-8 mb-3 text-xs font-semibold text-gray-400 uppercase">
            Management
          </p>

          <div className="space-y-1">

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
              <span>📊</span>
              Analytics
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
              <span>⚙️</span>
              Settings
            </button>

          </div>

        </nav>


        {/* Admin Profile */}

        <div className="p-4 border-t border-gray-200">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
              A
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Admin User
              </p>

              <p className="text-xs text-gray-400">
                admin@eshop.com
              </p>
            </div>

          </div>

          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-red-600">
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="lg:ml-64">


        {/* ================= TOPBAR ================= */}

        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8">

          <div className="flex items-center gap-4">

            <button className="lg:hidden text-xl">
              ☰
            </button>

            <div>

              <h2 className="text-xl font-bold text-gray-900">
                Dashboard
              </h2>

              <p className="text-sm text-gray-400">
                Welcome back, Admin
              </p>

            </div>

          </div>


          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">

              <span className="text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2 w-full text-sm"
              />

            </div>


            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              🔔

              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

          </div>

        </header>


        {/* ================= CONTENT ================= */}

        <div className="p-4 md:p-8">


          {/* ================= STATS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

            {stats.map((stat, index) => (

              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      {stat.title}
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </h3>

                  </div>


                  <div className="w-11 h-11 bg-orange-50 rounded-lg flex items-center justify-center text-lg">
                    {stat.icon}
                  </div>

                </div>


                <div className="flex items-center gap-2 mt-4">

                  <span className="text-green-600 text-sm font-medium">
                    ↑ {stat.change}
                  </span>

                  <span className="text-xs text-gray-400">
                    from last month
                  </span>

                </div>

              </div>

            ))}

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="mt-8">

            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <button className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-orange-300 hover:shadow-sm transition">

                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-3">
                  <span>＋</span>
                </div>

                <p className="font-semibold text-gray-900">
                  Add Product
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Create new product
                </p>

              </button>


              <button className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-orange-300 hover:shadow-sm transition">

                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <span>🏷️</span>
                </div>

                <p className="font-semibold text-gray-900">
                  Add Category
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Create new category
                </p>

              </button>


              <button className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-orange-300 hover:shadow-sm transition">

                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                  <span>🛒</span>
                </div>

                <p className="font-semibold text-gray-900">
                  View Orders
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Manage customer orders
                </p>

              </button>


              <button className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-orange-300 hover:shadow-sm transition">

                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                  <span>👥</span>
                </div>

                <p className="font-semibold text-gray-900">
                  Customers
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Manage customers
                </p>

              </button>

            </div>

          </div>


          {/* ================= ORDERS + PRODUCTS ================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">


            {/* RECENT ORDERS */}

            <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200">

              <div className="p-5 border-b border-gray-200 flex items-center justify-between">

                <div>

                  <h2 className="font-bold text-gray-900">
                    Recent Orders
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    Latest customer orders
                  </p>

                </div>

                <button className="text-sm text-orange-500 font-medium">
                  View All
                </button>

              </div>


              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">
                        Order
                      </th>

                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">
                        Customer
                      </th>

                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">
                        Product
                      </th>

                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">
                        Amount
                      </th>

                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {orders.map((order) => (

                      <tr
                        key={order.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >

                        <td className="px-5 py-4 text-sm font-medium text-gray-900">
                          {order.id}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {order.customer}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {order.product}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-gray-900">
                          {order.amount}
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
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

            <div className="bg-white rounded-xl border border-gray-200">

              <div className="p-5 border-b border-gray-200 flex justify-between">

                <div>

                  <h2 className="font-bold text-gray-900">
                    Top Products
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    Best selling products
                  </p>

                </div>

                <button className="text-gray-400">
                  ⋮
                </button>

              </div>


              <div className="p-4 space-y-4">

                {products.map((product, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >

                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      📦
                    </div>


                    <div className="flex-1 min-w-0">

                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {product.category}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {product.sales} sold
                      </p>

                    </div>


                    <div className="text-right">

                      <p className="text-sm font-semibold text-gray-900">
                        {product.price}
                      </p>

                      <p
                        className={`text-xs mt-1 ${
                          product.stock < 10
                            ? "text-red-500"
                            : "text-green-500"
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

            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Order Overview
            </h2>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">


              <div className="bg-white border border-gray-200 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                    ⏳
                  </div>

                  <div>

                    <p className="text-2xl font-bold">
                      48
                    </p>

                    <p className="text-xs text-gray-400">
                      Pending
                    </p>

                  </div>

                </div>

              </div>


              <div className="bg-white border border-gray-200 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    🚚
                  </div>

                  <div>

                    <p className="text-2xl font-bold">
                      72
                    </p>

                    <p className="text-xs text-gray-400">
                      Shipped
                    </p>

                  </div>

                </div>

              </div>


              <div className="bg-white border border-gray-200 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    ✓
                  </div>

                  <div>

                    <p className="text-2xl font-bold">
                      856
                    </p>

                    <p className="text-xs text-gray-400">
                      Delivered
                    </p>

                  </div>

                </div>

              </div>


              <div className="bg-white border border-gray-200 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    ✕
                  </div>

                  <div>

                    <p className="text-2xl font-bold">
                      18
                    </p>

                    <p className="text-xs text-gray-400">
                      Cancelled
                    </p>

                  </div>

                </div>

              </div>


            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Admin;