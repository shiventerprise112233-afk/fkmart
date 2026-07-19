import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Zap } from "lucide-react";

const StickyBottomBar = ({ product }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === product.id);

    if (!exists) {
      cart.push({
        ...product,
        quantity: 1,
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));

      showMessage("Product added to cart successfully.");
      navigate("/address");
    } else {
      showMessage("Product already exists in cart.");
    }
  };

  const buyNow = () => {
    localStorage.setItem(
      "buyNow",
      JSON.stringify({
        ...product,
        quantity: 1,
      })
      
    );
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/address");
  };

  return (
    <>
      {/* Toast */}
      {message && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce">
          {message}
        </div>
      )}

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex h-16 z-50">
        <button
          onClick={addToCart}
          className="w-1/2 flex items-center justify-center gap-2 text-[#ff6f00] text-lg font-medium bg-white"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <button
          onClick={addToCart}
          className="w-1/2 flex items-center justify-center gap-2 bg-[#ff6f00] text-white text-lg font-semibold"
        >
          <Zap size={20} />
          Buy Now
        </button>
      </div>
    </>
  );
};

export default StickyBottomBar;