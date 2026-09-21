import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function CreateCategory() {

    const dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState({
        name: "",
        description: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setCategoryData({
            ...categoryData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError("");
        setSuccess("");

        try {

            const token = JSON.parse(
                localStorage.getItem("tokens")
            );

            const res = await axios.post(
                "http://127.0.0.1:8000/api/categories/",
                categoryData,
                {
                    headers: {
                        Authorization: `Bearer ${token.access}`
                    }
                }
            );

            console.log(res.data);

            setSuccess("Category created successfully!");

            setCategoryData({
                name: "",
                description: ""
            });

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.detail ||
                "Something went wrong!"
            );

        } finally {
            setLoading(false);
        }
    };

   return (
    <div className="min-h-screen w-full bg-[#050816] ml-15 px-6 py-8 text-white lg:px-8">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
                <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-lg shadow-fuchsia-500/50"></span>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
                        Product Management
                    </p>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    Create Category
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Add a new category and organize your products efficiently.
                </p>
            </div>

            {/* Small status badge */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#111827] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>

                <span className="text-sm text-slate-300">
                    Admin Panel
                </span>
            </div>

        </div>


        {/* Main Form Card */}
        <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1120] shadow-2xl shadow-black/30">

            {/* Card Header */}
            <div className="border-b border-slate-800 bg-gradient-to-r from-[#111827] via-[#12152b] to-[#17102b] px-6 py-5 md:px-8">

                <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-bold shadow-lg shadow-fuchsia-500/20">
                        +
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Category Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter the details for your new product category.
                        </p>
                    </div>

                </div>

            </div>


            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8"
            >

                <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">

                    {/* Category Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2.5 block text-sm font-semibold text-slate-300"
                        >
                            Category Name
                            <span className="ml-1 text-fuchsia-400">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={categoryData.name}
                            onChange={handleChange}
                            placeholder="e.g. Electronics"
                            required
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-700
                                bg-[#080d1a]
                                px-4
                                py-3.5
                                text-sm
                                text-white
                                placeholder:text-slate-600
                                outline-none
                                transition-all
                                duration-300
                                hover:border-slate-600
                                focus:border-fuchsia-500
                                focus:bg-[#0b1020]
                                focus:ring-4
                                focus:ring-fuchsia-500/10
                            "
                        />

                        <p className="mt-2 text-xs text-slate-600">
                            Enter a short and unique category name.
                        </p>
                    </div>


                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="mb-2.5 block text-sm font-semibold text-slate-300"
                        >
                            Description
                            <span className="ml-1 text-fuchsia-400">
                                *
                            </span>
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={categoryData.description}
                            onChange={handleChange}
                            placeholder="Write a short description..."
                            rows={5}
                            required
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-slate-700
                                bg-[#080d1a]
                                px-4
                                py-3.5
                                text-sm
                                leading-6
                                text-white
                                placeholder:text-slate-600
                                outline-none
                                transition-all
                                duration-300
                                hover:border-slate-600
                                focus:border-fuchsia-500
                                focus:bg-[#0b1020]
                                focus:ring-4
                                focus:ring-fuchsia-500/10
                            "
                        />

                        <p className="mt-2 text-xs text-slate-600">
                            Give a brief explanation about this category.
                        </p>
                    </div>

                </div>


                {/* Error */}
                {error && (
                    <div className="mt-7 flex items-center rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        <span className="mr-2">⚠</span>
                        {error}
                    </div>
                )}


                {/* Success */}
                {success && (
                    <div className="mt-7 flex items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                        <span className="mr-2">✓</span>
                        {success}
                    </div>
                )}


                {/* Bottom Actions */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">

                    {/* Clear */}
                    <button
                        type="button"
                        onClick={() =>
                            setCategoryData({
                                name: "",
                                description: ""
                            })
                        }
                        className="
                            rounded-xl
                            border
                            border-slate-700
                            bg-[#111827]
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-slate-300
                            transition-all
                            duration-300
                            hover:border-slate-600
                            hover:bg-[#161e31]
                            hover:text-white
                        "
                    >
                        Clear
                    </button>


                    {/* Create */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            rounded-xl
                            bg-gradient-to-r
                            from-violet-600
                            to-fuchsia-600
                            px-8
                            py-3
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                            shadow-fuchsia-600/20
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:from-violet-500
                            hover:to-fuchsia-500
                            hover:shadow-xl
                            hover:shadow-fuchsia-500/30
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {loading ? "Creating..." : "Create Category"}
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}

export default CreateCategory;