// Header.jsx
import React, { useEffect, useState } from "react";
import Logo from "../Assets/Icons/logo.png";
import Add from "../Assets/Icons/add.png";
import Cart from "../Assets/Icons/shoppings.png";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();

    // Listen when cart is updated from anywhere in the app
    window.addEventListener("cartUpdated", updateCartCount);

    // Listen for localStorage changes (other tabs)
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <header className="w-full shadow-sm">
      {/* Top Header */}
      <div className="bg-[#2874F0] flex items-center justify-between pr-3 pt-3 pb-2">
        {/* Left */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-5"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>

          <img
            src={Logo}
            alt="Logo"
            className="h-8"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <img
            src={Add}
            alt=""
            className="h-4"
          />

          <div className="relative">
            <img
              src={Cart}
              alt="Cart"
              className="h-4 cursor-pointer"
              onClick={() => navigate("/cart")}
            />

            {cartCount > 0 && (
              <div className="absolute -top-2 left-2 min-w-[18px] h-[18px] bg-[#fb641b] rounded-full text-[10px] text-white flex items-center justify-center px-1 font-semibold">
                {cartCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      {location.pathname === "/" && (
        <div className="bg-[#2874F0] px-3 pb-2">
          <div className="bg-white h-10 rounded-sm flex items-center px-3 shadow-sm">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full outline-none text-[15px] placeholder:text-gray-500 bg-transparent"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;