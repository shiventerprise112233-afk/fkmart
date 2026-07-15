import React, { useEffect, useState } from "react";
import Clock from "../Assets/Icons/clock.svg";

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const dealEndTime = new Date();
    dealEndTime.setHours(23, 59, 59, 999);

    const updateTime = () => {
      const difference = dealEndTime - new Date();

      if (difference <= 0) {
        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");

      const minutes = String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0");

      const seconds = String(
        Math.floor((difference / 1000) % 60)
      ).padStart(2, "0");

      setTimeLeft({
        hours,
        minutes,
        seconds,
      });
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white border-y border-gray-200">
      <div className="flex items-center justify-between h-14">
        {/* Left */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-[#2874F0] text-[16px] font-medium">
            Deals of the Day
          </h2>

          <div className="flex items-center gap-1 mt-1">
            <img src={Clock} alt="Clock" />

            <span className="text-[#4F8EF7] font-medium text-[15px]">
              {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="px-4">
          <button className="border border-gray-300 rounded-sm px-4 py-2 bg-white text-red-600 text-sm font-semibold shadow-sm hover:bg-gray-50">
            SALE IS LIVE
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;