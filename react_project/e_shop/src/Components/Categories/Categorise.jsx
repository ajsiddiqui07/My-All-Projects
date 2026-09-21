import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {  getcategories } from "../../Features/CategorySlice";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
function Categories() {

const {catArray,catMsg,catError} = useSelector((state)=>state.categories)
const dispatch = useDispatch()
// console.log(catArray);


useEffect(()=>{
  dispatch(getcategories())
  catMsg && toast.success("category loaded Successfully")
  catError && toast.error(catError)
  
},[catMsg,catError])
  // Dummy Static Data
  const categories = [
    {
      id: 1,
      name: "Next-Gen Tech",
      description:
        "Latest technology products including headphones, gadgets and smart devices.",
    },
    {
      id: 2,
      name: "Luxury Apparel",
      description:
        "Premium jackets, streetwear and modern fashion collections.",
    },
    {
      id: 3,
      name: "Smart Accessories",
      description:
        "Smart watches, premium bags and other modern accessories.",
    },
    {
      id: 4,
      name: "Modern Living",
      description:
        "Ambient lighting, home decor and modern lifestyle products.",
    },
  ];

  const handleEdit = (id) => {
    console.log("Edit Category:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete Category:", id);
  };

  return (
    <section className="min-h-screen bg-slate-950 p-6">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Product Management
            </h2>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Categories
            </h1>
          </div>
          

          <p className=" ml-5 text-slate-400 text-sm max-w-sm mt-3 md:mt-0">
            Manage your product categories, update category information and
            remove unused categories.
          </p>
          <NavLink
    to="/admin//createcategory"
    className=" flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-600/20 active"
>
    Create Category
</NavLink>
        </div>

        {/* Category Table Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">

          <div className="overflow-x-auto">

            <table className="w-full">

              {/* Table Header */}
              <thead className="bg-slate-800/80">

                <tr>

                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    ID
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    Category Name
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    Description
                  </th>

                  <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-800">

                {catArray && catArray.map((category) => (

                  <tr
                    key={category.id}
                    className="group hover:bg-slate-800/40 transition-all duration-300"
                  >

                    {/* ID */}
                    <td className="px-6 py-6">

                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold">
                        {category.id}
                      </span>

                    </td>

                    {/* Category Name */}
                    <td className="px-6 py-6">

                      <div className="flex items-center gap-3">

                        <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                        </div>

                        <span className="text-white font-semibold text-sm sm:text-base">
                          {category.name}
                        </span>

                      </div>

                    </td>

                    {/* Description */}
                    <td className="px-6 py-6">

                      <p className="text-sm text-slate-400 max-w-2xl leading-6">
                        {category.description}
                      </p>

                    </td>

                   
                    {/* Actions */}
                    <td className="px-6 py-6">

                      <div className="flex justify-center items-center gap-3">

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(category.id)}
                          title="Edit Category"
                          className="w-10 h-10 flex items-center justify-center rounded-xl
      bg-blue-500/10 text-blue-400
      border border-blue-500/20
      hover:bg-blue-500 hover:text-white
      hover:border-blue-500
      hover:shadow-lg hover:shadow-blue-500/20
      transition-all duration-300"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(category.id)}
                          title="Delete Category"
                          className="w-10 h-10 flex items-center justify-center rounded-xl
      bg-red-500/10 text-red-400
      border border-red-500/20
      hover:bg-red-500 hover:text-white
      hover:border-red-500
      hover:shadow-lg hover:shadow-red-500/20
      transition-all duration-300"
                        >
                          <i className="fa-solid fa-trash"></i>
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

    </section>
  );
}

export default Categories;