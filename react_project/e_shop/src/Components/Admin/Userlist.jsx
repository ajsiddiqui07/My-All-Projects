
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserlist } from "../../Features/AdminSlice";
import { toast } from "react-toastify";

function Userslist() {

    
    console.log('helo');
    
    const dispatch = useDispatch()
   
    useEffect(()=>{
        console.log('side effect called');
        
       dispatch(getuserlist())
    },[dispatch])

    const {userlist ,} = useSelector((state)=>state.admin)

    
    const users = [
        {
            id: 1,
            username: "arbaz",
            email: "arbaz@gmail.com",
            role: "User",
            status: "Active",
            joined: "24 Sep 2026",
        },
        {
            id: 2,
            username: "rahul",
            email: "rahul@gmail.com",
            role: "User",
            status: "Active",
            joined: "23 Sep 2026",
        },
        {
            id: 3,
            username: "john",
            email: "john@gmail.com",
            role: "User",
            status: "Inactive",
            joined: "20 Sep 2026",
        },
        {
            id: 4,
            username: "admin",
            email: "admin@gmail.com",
            role: "Admin",
            status: "Active",
            joined: "15 Sep 2026",
        },
    ];

    const totalUsers = userlist && userlist.length;

    const activeUsers =userlist &&  userlist.filter(
        (user) => user.status === "Active"
    ).length;

    const adminUsers =userlist && userlist.filter(
        (user) => user.role === "Admin"
    ).length;

    const normalUsers =userlist && userlist.filter(
        (user) => user.role === "User"
    ).length;


    return (
        <div className="p-6 min-h-screen bg-slate-950">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Users
                    </h1>

                    <p className="text-slate-400 text-sm mt-1">
                        Manage and monitor registered users
                    </p>
                </div>

            </div>


            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                {/* Total Users */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                    <div className="flex justify-between items-start">

                        <div>
                            <p className="text-sm text-slate-400">
                                Total Users
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-2">
                                {totalUsers}
                            </h2>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <i className="fa-solid fa-users"></i>
                        </div>

                    </div>

                </div>


                {/* Active Users */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                    <div className="flex justify-between items-start">

                        <div>
                            <p className="text-sm text-slate-400">
                                Active Users
                            </p>

                            <h2 className="text-3xl font-bold text-green-400 mt-2">
                                {activeUsers}
                            </h2>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                            <i className="fa-solid fa-user-check"></i>
                        </div>

                    </div>

                </div>


                {/* Normal Users */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                    <div className="flex justify-between items-start">

                        <div>
                            <p className="text-sm text-slate-400">
                                Regular Users
                            </p>

                            <h2 className="text-3xl font-bold text-blue-400 mt-2">
                                {normalUsers}
                            </h2>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <i className="fa-solid fa-user"></i>
                        </div>

                    </div>

                </div>


                {/* Admins */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                    <div className="flex justify-between items-start">

                        <div>
                            <p className="text-sm text-slate-400">
                                Admins
                            </p>

                            <h2 className="text-3xl font-bold text-pink-400 mt-2">
                                {adminUsers}
                            </h2>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                            <i className="fa-solid fa-user-shield"></i>
                        </div>

                    </div>

                </div>

            </div>


            {/* Users Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                {/* Table Header */}
                <div className="px-6 py-5 border-b border-slate-800">

                    <h2 className="text-lg font-semibold text-white">
                        All Users
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        List of registered users
                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="bg-slate-800/70">

                            <tr>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    #
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    User
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Joined
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-slate-800">

                            {userlist && userlist.map((user, index) => (

                                <tr
                                    key={user.id}
                                    className="hover:bg-slate-800/50 transition"
                                >

                                    {/* ID */}
                                    <td className="px-6 py-4 text-slate-500">
                                        {index + 1}
                                    </td>


                                    {/* User */}
                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                                                {user.username
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div>
                                                <p className="text-white font-semibold">
                                                    {user.username}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    ID: {user.id}
                                                </p>
                                            </div>

                                        </div>

                                    </td>


                                    {/* Email */}
                                    <td className="px-6 py-4 text-slate-400">
                                        {user.email}
                                    </td>


                                    {/* Role */}
                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                user.role === "Admin"
                                                    ? "bg-pink-500/10 text-pink-400"
                                                    : "bg-purple-500/10 text-purple-400"
                                            }`}
                                        >
                                            {user.role}
                                        </span>

                                    </td>


                                    {/* Status */}
                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                user.status === "Active"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                            }`}
                                        >
                                            <span className="mr-1">
                                                ●
                                            </span>

                                            {user.status}
                                        </span>

                                    </td>


                                    {/* Joined */}
                                    <td className="px-6 py-4 text-slate-400">
                                        {user.joined}
                                    </td>


                                    {/* Action */}
                                    <td className="px-6 py-4">

                                        <div className="flex justify-center gap-2">

                                            <button
                                                className="px-3 py-1.5 rounded-lg
                                                bg-blue-500/10
                                                text-blue-400
                                                hover:bg-blue-500/20
                                                transition"
                                            >
                                                View
                                            </button>

                                            <button
                                                className="px-3 py-1.5 rounded-lg
                                                bg-red-500/10
                                                text-red-400
                                                hover:bg-red-500/20
                                                transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Userslist;

