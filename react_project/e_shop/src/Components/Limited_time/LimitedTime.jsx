import React from "react";

function LimitedTime() {

  // Dummy Static Data
  const deal = {
    title: "Vision Pulse VR",
    discount: "40%",
    price: 599,
    originalPrice: 999,
    hours: 8,
    minutes: 42,
    seconds: 15,
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80"
  };

  return (
    <section id="deals" className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative rounded-3xl p-8 sm:p-14 bg-slate-800/70 backdrop-blur-md border border-purple-500/30 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full text-xs font-bold inline-flex items-center gap-1.5">

                ⚡ Limited-Time Deal

              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">

                Save Up to {deal.discount} On The{" "}

                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  {deal.title}
                </span>

              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-lg">

                Experience true 8K spatial reality with ultra-light
                ergonomics. Offer valid only until stock lasts!

              </p>

              {/* Dummy Countdown */}

              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 pt-2">

                <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-700/80 w-16 sm:w-20 text-center">

                  <span className="block text-xl sm:text-3xl font-black text-white">
                    {deal.hours}
                  </span>

                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Hours
                  </span>

                </div>

                <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-700/80 w-16 sm:w-20 text-center">

                  <span className="block text-xl sm:text-3xl font-black text-white">
                    {deal.minutes}
                  </span>

                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Mins
                  </span>

                </div>

                <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-700/80 w-16 sm:w-20 text-center">

                  <span className="block text-xl sm:text-3xl font-black text-white">
                    {deal.seconds}
                  </span>

                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Secs
                  </span>

                </div>

              </div>

              <div className="pt-4">

                <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105">

                  Claim Deal Now (${deal.price}{" "}

                  <span className="line-through text-slate-800 text-xs font-normal">
                    ${deal.originalPrice}
                  </span>

                  )

                </button>

              </div>

            </div>

            <div className="lg:col-span-5 flex justify-center">

              <img
                src={deal.image}
                alt={deal.title}
                className="w-80 h-80 object-cover rounded-3xl shadow-2xl border border-slate-700/80 rotate-3 hover:rotate-0 transition-transform duration-500"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default LimitedTime;