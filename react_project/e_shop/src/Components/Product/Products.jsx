import React, { useState } from "react";

function Products() {

  const [activeCategory, setActiveCategory] = useState("all");

  // Dummy Static Product Data
  const products = [
    {
      id: 1,
      name: "Vision Pro Headphones",
      category: "electronics",
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      badge: "Best Seller",
      description: "Premium wireless headphones with spatial audio.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Urban Premium Jacket",
      category: "fashion",
      price: 149,
      originalPrice: 199,
      rating: 4.7,
      badge: "Trending",
      description: "Modern luxury jacket for everyday streetwear.",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Smart Watch X",
      category: "electronics",
      price: 249,
      originalPrice: 329,
      rating: 4.9,
      badge: "Popular",
      description: "Advanced smartwatch with health and fitness tracking.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Minimal Desk Lamp",
      category: "lifestyle",
      price: 89,
      originalPrice: 119,
      rating: 4.6,
      badge: "New",
      description: "Elegant ambient lighting for your workspace.",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <section id="featured" className="py-24 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-12">

          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">
            Exclusive Inventory
          </h2>

          <p className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
            Top Featured Products
          </p>

          {/* Category Filter */}

          <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 bg-slate-800/70 backdrop-blur-md rounded-2xl max-w-fit mx-auto border border-slate-800">

            {["all", "electronics", "fashion", "lifestyle"].map(
              (category) => (

                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all ${
                    activeCategory === category
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {category}
                </button>

              )
            )}

          </div>

        </div>

        {/* Product Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-4 border border-slate-700/60 hover:border-purple-500/50 transition-all hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
            >

              <div>

                <div className="relative rounded-2xl overflow-hidden mb-4 h-52 bg-slate-900">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-purple-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {product.badge}
                  </span>

                </div>

                <div className="flex items-center justify-between text-xs text-amber-400 mb-1">

                  <span>
                    ⭐ {product.rating}
                  </span>

                  <span className="text-slate-400 uppercase font-semibold text-[10px]">
                    {product.category}
                  </span>

                </div>

                <h3 className="font-bold text-base text-white">
                  {product.name}
                </h3>

                <p className="text-slate-400 text-xs mt-1">
                  {product.description}
                </p>

              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/50 flex items-center justify-between">

                <div>

                  <span className="text-xl font-extrabold text-white">
                    ${product.price}
                  </span>

                  <span className="text-xs text-slate-500 line-through ml-2">
                    ${product.originalPrice}
                  </span>

                </div>

                <button
                  className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-600/20 transition-all"
                >
                  <i className="fa-solid fa-cart-plus"></i>
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Products;