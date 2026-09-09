import React, { useState } from "react";

function Cart() {

  // Dummy Static Cart Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vision Pro Headphones",
      price: 299,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Smart Watch X",
      price: 249,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80"
    }
  ]);

  const [cartOpen, setCartOpen] = useState(false);

  const updateQuantity = (id, value) => {

    setCartItems(
      cartItems.map((item) => {

        if (item.id === id) {

          const newQty = item.qty + value;

          return {
            ...item,
            qty: newQty < 1 ? 1 : newQty
          };

        }

        return item;

      })
    );

  };

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (

    <>

      {/* Cart Button */}

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-purple-600 text-white px-5 py-3 rounded-full shadow-xl"
      >
        🛒 Cart ({totalCartCount})
      </button>


      {/* Cart Drawer */}

      {cartOpen && (

        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-md bg-slate-900 h-full p-6 flex flex-col justify-between border-l border-slate-800 shadow-2xl">

            <div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">

                <h3 className="text-xl font-bold text-white">
                  Your Shopping Cart ({totalCartCount})
                </h3>

                <button
                  onClick={() => setCartOpen(false)}
                  className="text-slate-400 hover:text-white text-xl"
                >
                  ✕
                </button>

              </div>


              <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />

                      <div>

                        <h4 className="font-semibold text-sm text-white">
                          {item.name}
                        </h4>

                        <p className="text-xs text-purple-400 font-bold">
                          ${item.price}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded-lg">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, -1)
                        }
                        className="text-white px-2"
                      >
                        -
                      </button>

                      <span className="text-white">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, 1)
                        }
                        className="text-white px-2"
                      >
                        +
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* Total */}

            <div className="pt-4 border-t border-slate-800">

              <div className="flex justify-between items-center mb-4">

                <span className="text-slate-400 text-sm">
                  Subtotal:
                </span>

                <span className="text-xl font-black text-white">
                  ${totalCartPrice}
                </span>

              </div>

              <button
                onClick={() => alert("Checkout")}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg"
              >
                Checkout Now
              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );
}

export default Cart;