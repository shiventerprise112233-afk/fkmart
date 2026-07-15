import { useEffect, useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";

const ProductInfo = ({ product }) => {
  // Generate random ordered count only once
  const orderedRecently = useMemo(() => {
    return Math.floor(Math.random() * (50000 - 5000 + 1)) + 5000;
  }, []);

  // Generate random offer duration (2-6 Hours)
  const offerEndTime = useMemo(() => {
    const randomHours = Math.floor(Math.random() * 5) + 2;
    return Date.now() + randomHours * 60 * 60 * 1000;
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateTimer = () => {
      const difference = offerEndTime - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
      );

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [offerEndTime]);
  const discount =
    Math.round(
      ((product.mrp - product.selling_price) / product.mrp) * 100
    ) || 0;

  return (
    <section className="bg-white">
      {/* Product Info */}
      <div className="p-4 border-b">
        <h1 className="text-[16px] leading-7 font-medium text-gray-900">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 rounded px-2 py-0.5 flex items-center gap-1">
              <span className="text-white text-[12px] font-semibold">
                {product.rating}
              </span>

              <span className="text-white text-[10px]">★</span>
            </div>

            <span className="text-[13px] text-gray-500">
              ({product.reviews} ratings)
            </span>
          </div>

          <img
            src="/images/plus-assured.png"
            alt="Flipkart Assured"
            className="h-7 object-contain"
          />
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <span className="text-[16px] font-semibold">
            ₹{product.selling_price}
          </span>

          <span className="text-[16px] text-gray-500 line-through">
            ₹{product.mrp}
          </span>

          <span className="text-green-600 text-[16px] font-semibold">
            {discount}% off
          </span>
        </div>
      </div>

      {/* Ordered Recently */}
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <TrendingUp
            size={18}
            className="text-green-600"
          />
        </div>

        <p className="text-sm">
          <span className="font-semibold text-pink-600">
            {orderedRecently}
          </span>{" "}
          people ordered this recently
        </p>
      </div>

      {/* Offer Timer */}
      <div className="bg-[#FFF8EE] border-b border-orange-200 py-3 text-center">
        <span className="text-gray-700">
          Offer ends in{" "}
          <span className="text-orange-500 font-semibold">
            {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          </span>
        </span>
      </div>

      {/* Description */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Product Description
        </h2>

        <div className="border-t mb-3"></div>

        <div className="text-[15px] text-gray-700 leading-7 whitespace-pre-line" dangerouslySetInnerHTML={{__html:product.features}}>
        </div>

        <button className="mt-4 text-[#2874F0] font-medium hover:underline">
          See more product details
        </button>
      </div>
    </section>
  );
};

export default ProductInfo;