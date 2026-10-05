
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../../Features/ProductSlice";
import { getcategories } from "../../Features/CategorySlice";
import { toast } from "react-toastify";
import { addCart, getCart } from "../../Features/CartSlice";

function HomeProduct() {
    const token = JSON.parse(localStorage.getItem("tokens"))
    const dispatch = useDispatch();

    const { productArray, productLoader, productError } = useSelector(
        (state) => state.products
    );

    const { catArray } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        dispatch(getproduct());
        dispatch(getcategories());
    }, [dispatch]);
    useEffect(()=>{
        dispatch(getCart())
    },[])
   
    // Add product to cart
    const addToCart = (product) => {
         dispatch(getCart());
        if (token) {
            const data = {
                "product_id": product.id
            }
            product.stock ? dispatch(addCart(data)) : toast.error("Product Out Of Stock");


        } else {
            toast.error("User Login Requred?")
        }

    };

    if (productLoader) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-white text-lg">
                    Loading products...
                </p>
            </div>
        );
    }

    if (productError) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-red-400">
                    {productError}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Hero Section */}
            <section className="px-6 py-16 text-center">

                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Discover Our Products
                </h1>

                <p className="text-slate-400 max-w-2xl mx-auto">
                    Find the best products at amazing prices.
                    Shop your favorite products and add them to your cart.
                </p>

            </section>


            {/* Products Section */}
            <section className="px-6 pb-16">

                <div className="max-w-7xl mx-auto">

                    <div className="flex justify-between items-center mb-8">

                        <div>
                            <h2 className="text-3xl font-bold">
                                Our Products
                            </h2>

                            <p className="text-slate-400 mt-1">
                                Choose your favorite products
                            </p>
                        </div>

                    </div>


                    {/* No Products */}
                    {productArray?.length === 0 ? (

                        <div className="text-center py-20">
                            <p className="text-slate-400">
                                No products available
                            </p>
                        </div>

                    ) : (

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            gap-6
                        ">

                            {productArray?.map((product) => {

                                const category =
                                    catArray?.find(
                                        (cat) =>
                                            cat.id == product.category
                                    )?.name;

                                return (

                                    <div
                                        key={product.id}
                                        className="
                                            bg-slate-900
                                            border border-slate-800
                                            rounded-2xl
                                            overflow-hidden
                                            hover:border-purple-500/50
                                            hover:-translate-y-1
                                            transition-all
                                            duration-300
                                        "
                                    >

                                        {/* Product Image */}
                                        <div className="
                                            h-56
                                            bg-slate-800
                                            overflow-hidden
                                        ">

                                            {product.image ? (

                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                        hover:scale-105
                                                        transition
                                                        duration-300
                                                    "
                                                />

                                            ) : (

                                                <div className="
                                                    w-full
                                                    h-full
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-slate-500
                                                ">
                                                    No Image
                                                </div>

                                            )}

                                        </div>


                                        {/* Product Content */}
                                        <div className="p-5">

                                            {/* Category */}
                                            <p className="
                                                text-xs
                                                text-purple-400
                                                font-semibold
                                                uppercase
                                                mb-2
                                            ">
                                                {category || "Product"}
                                            </p>


                                            {/* Product Name */}
                                            <h3 className="
                                                text-lg
                                                font-bold
                                                text-white
                                                mb-2
                                            ">
                                                {product.name}
                                            </h3>


                                            {/* Description */}
                                            <p className="
                                                text-sm
                                                text-slate-400
                                                line-clamp-2
                                                mb-4
                                            ">
                                                {product.description}
                                            </p>


                                            {/* Price + Stock */}
                                            <div className="
                                                flex
                                                justify-between
                                                items-center
                                                mb-4
                                            ">

                                                <span className="
                                                    text-xl
                                                    font-bold
                                                    text-purple-400
                                                ">
                                                    ₹{product.price}
                                                </span>


                                                <span className={`
                                                    text-xs
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    font-semibold

                                                    ${product.stock > 0
                                                        ? "bg-green-500/10 text-green-400"
                                                        : "bg-red-500/10 text-red-400"
                                                    }
                                                `}>
                                                    {product.stock > 0
                                                        ? `${product.stock} Available`
                                                        : "Out of Stock"}
                                                </span>

                                            </div>


                                            {/* Add To Cart */}
                                            <button
                                                disabled={product.stock <= 0}
                                                onClick={() =>
                                                    addToCart(product)
                                                }
                                                className="
                                                    w-full
                                                    py-3
                                                    rounded-xl
                                                    bg-gradient-to-r
                                                    from-purple-600
                                                    to-pink-600
                                                    text-white
                                                    font-semibold
                                                    hover:opacity-90
                                                    active:scale-[0.98]
                                                    transition
                                                    disabled:opacity-40
                                                    disabled:cursor-not-allowed
                                                "
                                            >
                                                {product.stock > 0
                                                    ? "Add to Cart"
                                                    : "Out of Stock"}
                                            </button>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>

            </section>

        </div>
    );
}

export default HomeProduct;

