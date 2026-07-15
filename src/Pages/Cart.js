import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  // ✅ Load cart only once on first render
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // ✅ Sync cart to localStorage whenever it changes
  useEffect(() => {
    window.scroll(0,0)
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Increase Quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) - 1, 1),
            }
          : item
      )
    );
  };

  // Remove Product
  const removeProduct = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Total
  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.selling_price * (item.quantity || 1),
      0
    );
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-2xl font-medium">
          Shopping Cart
        </h1>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-xl font-medium text-gray-600">
            Your Cart is Empty
          </h2>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-[#2874F0] text-white px-6 py-3 rounded"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Products */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white mt-2 p-4 flex gap-4"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />

              <div className="flex-1">
                <h2 className="text-[14px] leading-6 line-clamp-2">
                  {item.name}
                </h2>

                <p className="text-lg font-semibold mt-2">
                  ₹{item.selling_price}
                </p>

                <div className="flex items-center mt-4">
                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                    className="w-8 h-8 border rounded text-lg"
                  >
                    -
                  </button>

                  <span className="w-12 text-center text-[16px]">
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                    className="w-8 h-8 border rounded text-lg"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      removeProduct(item.id)
                    }
                    className="ml-auto text-[#2874F0]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Subtotal */}
          <div className="bg-white mt-2 p-5 flex justify-between text-xl font-semibold">
            <span>Subtotal</span>

            <span>₹{subtotal}</span>
          </div>

          {/* Bottom Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 border rounded h-14 text-lg font-medium"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/address")}
              className="flex-1 bg-[#ff6f00] text-white rounded h-14 text-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;