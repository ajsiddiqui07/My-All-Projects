
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteproduct, getproduct } from "../../Features/ProductSlice";
import { getcategories } from "../../Features/CategorySlice";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Products() {

    const dispatch = useDispatch();

    const { productArray, productLoader, productError,productMsg} = useSelector(
        (state) => state.products
    );
    const {catArray}=useSelector((state)=>state.categories)
    
    useEffect(() => {
        console.log(productArray);
        console.log(catArray);
        
    }, [productArray,catArray]);

    useEffect(()=>{
        productMsg && toast.success(productMsg)
        dispatch(getproduct());
    },[productMsg])
    
    useEffect(() => {
        dispatch(getproduct());
        dispatch(getcategories())
    }, [dispatch]);

    if (productLoader) {
        return (
            <div className="text-center text-white py-10">
                Loading products...
            </div>
        );
    }

    if (productError) {
        return (
            <div className="text-center text-red-400 py-10">
                {productError}
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Products
                    </h1>

                    <p className="text-slate-400 text-sm mt-1">
                        Manage all your products
                    </p>
                </div>

                <NavLink
                    to={"/admin/createproduct/"}
                    className="px-5 py-2.5 rounded-xl 
                    bg-gradient-to-r from-purple-600 to-pink-600
                    text-white font-semibold
                    hover:opacity-90 transition"
                >
                    + Add Product
                </NavLink>

            </div>

            {/* No Products */}
            {productArray?.length === 0 ? (

                <div className="text-center text-slate-400 py-10">
                    No products found
                </div>

            ) : (

                /* Table */
                <div className="overflow-x-auto rounded-2xl border border-slate-700">

                    <table className="w-full text-left">

                        {/* Table Header */}
                        <thead className="bg-slate-800">

                            <tr>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    #
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Product
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Description
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Price
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Stock
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        {/* Table Body */}
                        <tbody className="bg-slate-900 divide-y divide-slate-800">

                            {productArray?.map((product, index) => (

                                <tr
                                    key={product.id}
                                    className="hover:bg-slate-800/70 transition"
                                >

                                    {/* ID */}
                                    <td className="px-6 py-4 text-slate-400">
                                        {index + 1}
                                    </td>

                                    {/* Product */}
                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            {/* Image */}
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">

                                                {product.image ? (

                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />

                                                ) : (

                                                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                                                        No Image
                                                    </div>

                                                )}

                                            </div>

                                            {/* Name */}
                                            <div>

                                                <p className="text-white font-semibold">
                                                    {product.name}
                                                </p>

                                                

                                            </div>

                                        </div>

                                    </td>

                                    {/* Description */}
                                    <td className="px-6 py-4 max-w-xs">

                                        <p className="text-sm text-slate-400 line-clamp-2">
                                            {product.description}
                                        </p>

                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4">

                                        <span className="text-purple-400 font-semibold">
                                            ₹{product.price}
                                        </span>

                                    </td>

                                    {/* Stock */}
                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                product.stock > 0
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                            }`}
                                        >
                                            {product.stock > 0
                                                ? `${product.stock} Available`
                                                : "Out of Stock"}
                                        </span>

                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-4">

                                       <p className="text-xs text-slate-500">
                                                    {catArray.find((cat)=>cat.id == product.category)?.name}
                                        </p>

                                    </td>

                                    {/* Actions */}
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
                                                bg-yellow-500/10
                                                text-yellow-400
                                                hover:bg-yellow-500/20
                                                transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={()=>{
                                                    dispatch(deleteproduct(product.id))
                                                }}
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

            )}

        </div>
    );
}

export default Products;

