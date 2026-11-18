
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { createproduct, editproduct, getproduct, updateproduct } from "../../Features/ProductSlice";
import { getcategories } from "../../Features/CategorySlice";
import { toast } from "react-toastify";

function CreateProduct() {

    const { catArray } = useSelector((state) => state.categories)
    const { productArray ,productError, productMsg ,singledata} = useSelector((state) => state.products)

    const id = useParams().id
    useEffect(()=>{
        console.log(catArray);
    },[catArray])

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
    });

    const [imagePreview, setImagePreview] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(editproduct(id))
    },[])

    useEffect(()=>{
        setProductData(singledata)
        setImagePreview(singledata.image)
        console.log(singledata);
        
    },[singledata])
    const handleChange = (e) => {
        const { name, value, files } = e.target;


        if (name === "image") {
            const file = files[0];

            setProductData((prev) => ({
                ...prev,
                image: file,
            }));

            if (file) {
                setImagePreview(URL.createObjectURL(file));
            }
            return;

        }
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

          const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", Number(productData.stock));
    formData.append("category", Number(productData.category));

    if (productData.image) {
        formData.append("image", productData.image);
    }


        console.log("Product Data:", formData);
        dispatch(updateproduct({id:id,data:formData}))
        navigate("/admin/products/")

    };

    useEffect(() => {
        dispatch(getcategories())

    },[])

    useEffect(()=>{
        productError && toast.error(productError)
        productMsg && toast.success(productMsg)
        
         
    },[productArray,productError, productMsg])
    const handleReset = () => {
        setProductData({
            name: "",
            description: "",
            price: "",
            stock: "",
            image: "",
            category: "",
        });

        setImagePreview("");
    };

    return (
        <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">

                <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
                    Product Management
                </p>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                    Create New Product
                </h1>

                <p className="text-slate-400 text-sm mt-2">
                    Add a new product to your inventory.
                </p>

            </div>

            {/* Main Card */}
            <div className="max-w-6xl mx-auto">

                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-700/60 shadow-xl p-6 sm:p-8"
                >

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* ================= FORM ================= */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={productData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Enter product description..."
                                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition resize-none"
                                    required
                                />
                            </div>

                            {/* Price + Stock */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        Price
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-3 text-slate-400">
                                            $
                                        </span>

                                        <input
                                            type="number"
                                            name="price"
                                            value={productData.price}
                                            onChange={handleChange}
                                            placeholder="299.99"
                                            step="0.01"
                                            min="0"
                                            className="w-full bg-slate-900/70 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                                            required
                                        />

                                    </div>
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        value={productData.stock}
                                        onChange={handleChange}
                                        placeholder="100"
                                        min="0"
                                        className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                                        required
                                    />
                                </div>

                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                                    required
                                >
                                    <option value="" className="bg-slate-900">
                                        Select Category
                                    </option>

                                    {catArray && catArray.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            className="bg-slate-900"
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <p className="text-xs text-slate-500 mt-2">
                                    Select a category for this product.
                                </p>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Product Image
                                </label>

                                <input
                                    type="file"
                                    name="image"
                                   
                                    onChange={handleChange}
                                    placeholder="https://example.com/product.jpg"
                                    className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                                />
                            </div>

                        </div>

                        {/* ================= PREVIEW ================= */}
                        <div>

                            <p className="text-sm font-semibold text-slate-300 mb-3">
                                Product Preview
                            </p>

                            <div className="bg-slate-900/60 border border-slate-700/60 rounded-3xl p-4">

                                {/* Image */}
                                <div className="relative rounded-2xl overflow-hidden h-60 bg-slate-800 flex items-center justify-center">

                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Product Preview"
                                            className="w-full h-full object-cover"
                                            onError={() => setImagePreview("")}
                                        />
                                    ) : (
                                        <div className="text-center text-slate-500">

                                            <i className="fa-regular fa-image text-4xl mb-3"></i>

                                            <p className="text-sm">
                                                Product image preview
                                            </p>

                                        </div>
                                    )}

                                </div>

                                {/* Preview Information */}
                                <div className="mt-5">

                                    <span className="text-[10px] uppercase font-semibold text-purple-400">
                                        Category ID: {productData.category || "—"}
                                    </span>

                                    <h3 className="font-bold text-lg text-white mt-2">
                                        {productData.name || "Product Name"}
                                    </h3>

                                    <p className="text-slate-400 text-xs mt-2 min-h-[40px]">
                                        {productData.description ||
                                            "Your product description will appear here."}
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-slate-700/50 flex items-center justify-between">

                                        <div>

                                            <span className="text-xl font-extrabold text-white">
                                                ${productData.price || "0.00"}
                                            </span>

                                            <p className="text-xs text-slate-500 mt-1">
                                                Stock: {productData.stock || "0"}
                                            </p>

                                        </div>

                                        <div className="p-3 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-600/20">
                                            <i className="fa-solid fa-cart-plus"></i>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-slate-700/50">

                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition font-semibold"
                        >
                            Reset
                        </button>

                        <button
                            to={""}
                            
                            type="submit"
                            className="px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-0.5"
                        >
                            <i className="fa-solid fa-plus mr-2"></i>
                            Create Product
                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}

export default CreateProduct;

