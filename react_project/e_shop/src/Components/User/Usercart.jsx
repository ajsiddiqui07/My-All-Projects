import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCart,
    removecart
    
} from "../../Features/CartSlice";

const Usercart = () => {

    const dispatch = useDispatch();

    const {
        cartArray,
        cartMsg,
        cartError,
        cartLoader
    } = useSelector((state) => state.cart);

    console.log(cartArray, cartError, cartLoader, cartMsg);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);


    // Increase quantity
    const increaseQuantity = (item) => {
        dispatch(
            updateCartItem({
                product_id: item.product.id,
                quantity: item.quantity + 1
            })
        );
    };


    // Decrease quantity
    const decreaseQuantity = (item) => {

        if (item.quantity > 1) {
            dispatch(
                updateCartItem({
                    product_id: item.product.id,
                    quantity: item.quantity - 1
                })
            );
        }

    };


    // Remove product
    const removeItem = (productId) => {
        const data = {
                "product_id": productId
            }
        dispatch(removecart(data)) && dispatch(getCart())
    };


    // Loading
    if (cartLoader) {
        return (
            <div className="min-h-screen mt=20 bg-[#0d0f18] text-slate-100 flex items-center justify-center p-4">

                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="absolute w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none translate-x-32 translate-y-32"></div>

                <div className="relative z-10 text-center">

                    <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 items-center justify-center text-white text-2xl shadow-xl shadow-purple-500/20 mb-5">
                        🛒
                    </div>

                    <h2 className="text-xl font-semibold text-white">
                        Loading your cart...
                    </h2>

                    <p className="text-sm text-slate-400 mt-2">
                        Please wait a moment
                    </p>

                </div>

            </div>
        );
    }


    // Error
    if (cartError) {
        return (
            <div className="min-h-screen mt-20 bg-[#0d0f18] text-slate-100 flex items-center justify-center p-4">

                <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-md bg-[#131625] border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center">

                    <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 items-center justify-center text-white text-2xl shadow-xl shadow-purple-500/20 mb-5">
                        !
                    </div>

                    <h2 className="text-xl font-semibold text-white mb-2">
                        Unable to Load Cart
                    </h2>

                    <p className="text-sm text-pink-400">
                        {cartError}
                    </p>

                </div>

            </div>
        );
    }


    const items = cartArray?.items || [];


    // Total
    const total = items.reduce(
        (sum, item) =>
            sum + Number(item.product.price) * item.quantity,
        0
    );


    return (

        <div className="min-h-screen mt-20 bg-[#0d0f18] text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            {/* Background ambient glow */}

            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="absolute top-40 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>


            <div className="max-w-7xl mx-auto relative z-10">


                {/* Header */}

                <div className="text-center mb-10">

                    <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 items-center justify-center text-white text-xl shadow-xl shadow-purple-500/20 mb-4">
                        🛒
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        My <span className="text-purple-400">Cart</span>
                    </h1>

                    <p className="text-sm text-slate-400 mt-2">
                        Review your selected products before checkout
                    </p>

                </div>


                {/* Empty Cart */}

                {items.length === 0 ? (

                    <div className="w-full max-w-2xl mx-auto bg-[#131625] border border-slate-800/80 rounded-3xl p-10 md:p-14 text-center shadow-2xl backdrop-blur-xl">

                        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 items-center justify-center text-white text-3xl shadow-xl shadow-purple-500/20 mb-6">
                            🛒
                        </div>

                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Your Cart is Empty
                        </h2>

                        <p className="text-sm text-slate-400">
                            Add some products to your cart and come back here.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                        {/* Cart Items */}

                        <div className="lg:col-span-2 space-y-5">

                            <div className="flex items-center justify-between mb-3">

                                <div>

                                    <h2 className="text-xl font-semibold text-white">
                                        Cart Items
                                    </h2>

                                    <p className="text-xs text-slate-500 mt-1">
                                        {items.length} product
                                        {items.length !== 1 ? "s" : ""} in your cart
                                    </p>

                                </div>

                            </div>


                            {items.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-[#131625] border border-slate-800/80 rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-xl hover:border-purple-500/40 transition duration-300"
                                >

                                    <div className="flex flex-col sm:flex-row gap-5">


                                        {/* Product Image */}

                                        <div className="w-full sm:w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-[#1a1e30] border border-slate-800">

                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                            />

                                        </div>


                                        {/* Product Details */}

                                        <div className="flex-1 min-w-0">

                                            <h2 className="text-lg md:text-xl font-semibold text-white truncate">
                                                {item.product.name}
                                            </h2>

                                            <p className="text-xs text-slate-500 mt-1">
                                                Product ID: #{item.product.id}
                                            </p>

                                            <p className="text-lg font-semibold text-purple-400 mt-3">
                                                ₹
                                                {Number(
                                                    item.product.price
                                                ).toLocaleString("en-IN")}
                                            </p>


                                            {/* Quantity */}

                                            <div className="flex items-center gap-3 mt-5">

                                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
                                                    Qty
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(item)
                                                    }
                                                    className="w-9 h-9 rounded-xl bg-[#1a1e30] border border-slate-800 text-slate-300 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 transition"
                                                >
                                                    -
                                                </button>

                                                <span className="w-8 text-center text-sm font-semibold text-white">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(item)
                                                    }
                                                    className="w-9 h-9 rounded-xl bg-[#1a1e30] border border-slate-800 text-slate-300 hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/10 transition"
                                                >
                                                    +
                                                </button>

                                            </div>


                                            {/* Remove */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(
                                                        item.product.id
                                                    )
                                                }
                                                className="text-xs font-medium text-pink-400 hover:text-pink-300 mt-5 transition"
                                            >
                                                Remove Item
                                            </button>

                                        </div>


                                        {/* Item Total */}

                                        <div className="sm:text-right">

                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                                Item Total
                                            </p>

                                            <p className="text-xl font-bold text-white">
                                                ₹
                                                {(
                                                    Number(
                                                        item.product.price
                                                    ) * item.quantity
                                                ).toLocaleString("en-IN")}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* Order Summary */}

                        <div className="lg:col-span-1">

                            <div className="bg-[#131625] border border-slate-800/80 rounded-3xl p-6 md:p-7 shadow-2xl backdrop-blur-xl sticky top-6">


                                {/* Summary Header */}

                                <div className="flex items-center gap-3 mb-7">

                                    <div className="inline-flex w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 items-center justify-center text-white text-lg shadow-xl shadow-purple-500/20">
                                        🛍️
                                    </div>

                                    <div>

                                        <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                                            Checkout
                                        </p>

                                        <h2 className="text-xl font-bold text-white">
                                            Order Summary
                                        </h2>

                                    </div>

                                </div>


                                {/* Products */}

                                <div className="flex justify-between items-center py-4 border-b border-slate-800">

                                    <span className="text-sm text-slate-400">
                                        Products
                                    </span>

                                    <span className="text-sm font-medium text-white">
                                        {items.length}
                                    </span>

                                </div>


                                {/* Delivery */}

                                <div className="flex justify-between items-center py-4 border-b border-slate-800">

                                    <span className="text-sm text-slate-400">
                                        Delivery
                                    </span>

                                    <span className="text-sm font-medium text-purple-400">
                                        Free
                                    </span>

                                </div>


                                {/* Total */}

                                <div className="flex justify-between items-center pt-6">

                                    <span className="text-base font-semibold text-white">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-purple-400">
                                        ₹
                                        {total.toLocaleString("en-IN")}
                                    </span>

                                </div>


                                {/* Checkout Button */}

                                <button
                                    type="button"
                                    className="w-full mt-7 py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-600/25 hover:opacity-95 transition active:scale-[0.99]"
                                >
                                    Proceed to Checkout
                                </button>


                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Secure checkout · Fast delivery
                                </p>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Usercart;