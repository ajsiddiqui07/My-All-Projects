import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Admin from '../Admin/Admin';
import Navbar from '../Templates/Navbar';
import Footer from '../Templates/Footer';
import Categories from '../Categories/Categorise';
import Products from '../Product/Products';
import LimitedTime from '../Limited_time/LimitedTime';

const PRODUCTS = [
  {
    id: 1,
    name: "Aura Noise-Canceling X1",
    category: "electronics",
    price: 349,
    originalPrice: 420,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    description: "Acoustic precision audio with spatial surround dynamics."
  },
  {
    id: 2,
    name: "CyberWatch Pro Series 9",
    category: "electronics",
    price: 299,
    originalPrice: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: "New Release",
    description: "AMOLED screen with real-time biometric tracking."
  },
  {
    id: 3,
    name: "Minimalist Leather Bomber",
    category: "fashion",
    price: 189,
    originalPrice: 240,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description: "Handcrafted genuine leather outerwear with satin inner lining."
  },
  {
    id: 4,
    name: "Ambient Glow Smart Lamp",
    category: "lifestyle",
    price: 129,
    originalPrice: 160,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    badge: "Top Rated",
    description: "16 Million RGB colors controlled via mobile app & voice."
  }
];

export default function Landing_page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [artOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    triggerToast(`Added "${product.name}" to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const navigate = useNavigate()

  const toggleWishlist = () => {
    setWishlistCount((prev) => prev + 1);
    triggerToast("Item saved to your Wishlist!");
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="bg-[#0b0f19] text-slate-100 font-sans min-h-screen selection:bg-purple-500 selection:text-white relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-purple-600 text-white font-medium px-5 py-3 rounded-2xl shadow-xl border border-purple-400/30 animate-bounce">
          <i className="fa-solid fa-circle-check mr-2"></i> {toastMessage}
        </div>
      )}

      {/* Navigation */}
    {/* <Navbar/> */}
       

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/30 to-pink-500/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/70 backdrop-blur-md border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                Next Generation E-Commerce Platform
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1]">
                Elevate Your <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                  Lifestyle Today.
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover curated high-end tech, timeless luxury fashion, and exclusive ambient home accessories. Curated for those who demand excellence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#featured" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-purple-600/30 transition-all hover:scale-105 flex items-center justify-center gap-3 group">
                  <span>Explore Collection</span>
                  <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>
                <a href="#deals" className="w-full sm:w-auto px-8 py-4 bg-slate-800/70 backdrop-blur-md hover:bg-slate-800 text-slate-200 font-semibold rounded-2xl border border-slate-700/80 transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-bolt text-amber-400"></i>
                  <span>View Flash Sale</span>
                </a>
              </div>

              {/* Stats */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Authentic Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-xs text-slate-400 mt-0.5">Express Shipping</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4.9★</div>
                  <div className="text-xs text-slate-400 mt-0.5">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Right Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md animate-[bounce_4s_infinite]">
                <div className="rounded-3xl p-3 bg-slate-800/70 backdrop-blur-md border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Headphone"
                    className="w-full h-[380px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <i className="fa-solid fa-crown"></i> Featured Flagship
                  </div>
                  <div className="p-4 mt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-white">Aura Noise-Canceling X1</h3>
                      <span className="text-xl font-extrabold text-purple-400">$349</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Acoustic precision audio with spatial surround dynamics.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Categories/>

      {/* Featured Products Section */}
      <Products/>
       
      {/* Limited Time Flash Deal */}
      <LimitedTime/>

      {/* Slide-out Cart Drawer */}
      {/* <Cart/> */}

      {/* Footer */}
      <Footer/>
    </div>
  );
}