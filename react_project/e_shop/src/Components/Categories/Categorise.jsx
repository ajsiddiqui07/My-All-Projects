import React from "react";

function Categories() {

  // Dummy Static Data
  const categories = [
    {
      id: 1,
      title: "Next-Gen Tech",
      items: "120+ Items",
      tag: "Headphones & Gear",
      color: "text-purple-400",
      image:
        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Luxury Apparel",
      items: "85+ Items",
      tag: "Jackets & Streetwear",
      color: "text-pink-400",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Smart Accessories",
      items: "64+ Items",
      tag: "Watches & Premium Bags",
      color: "text-cyan-400",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Modern Living",
      items: "40+ Items",
      tag: "Ambient Lighting & Decor",
      color: "text-emerald-400",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="categories" className="py-20 relative bg-slate-900/50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Curated Collections
            </h2>

            <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Explore Popular Categories
            </p>
          </div>

          <p className="text-slate-400 text-sm max-w-sm mt-3 md:mt-0">
            Find handpicked items catered specifically to your tech,
            fashion, and lifestyle needs.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => (

            <div
              key={category.id}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-purple-500/50 transition-all duration-300"
            >

              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6">

                <span
                  className={`text-xs font-semibold ${category.color} uppercase tracking-wider`}
                >
                  {category.items}
                </span>

                <h3 className="text-2xl font-bold text-white mt-1">
                  {category.title}
                </h3>

                <p className="text-xs text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.tag}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;