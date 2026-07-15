import React from "react";

const categories = [
  {
    id: 1,
    name: "Categories",
    image: require("../Assets/Images/c1.webp"),
  },
  {
    id: 2,
    name: "Offer Zone",
    image: require("../Assets/Images/c2.webp"),
  },
  {
    id: 3,
    name: "Mobiles",
    image: require("../Assets/Images/c3.webp"),
  },
  {
    id: 4,
    name: "Fashion",
    image: require("../Assets/Images/c4.webp"),
  },
  {
    id: 5,
    name: "Electronics",
    image: require("../Assets/Images/c5.webp"),
  },
  {
    id: 6,
    name: "Appliances",
    image: require("../Assets/Images/c6.webp"),
  },
  {
    id: 7,
    name: "Beauty",
    image: require("../Assets/Images/c7.webp"),
  },
  {
    id: 8,
    name: "Toys",
    image: require("../Assets/Images/c8.webp"),
  },
  {
    id: 9,
    name: "Toys",
    image: require("../Assets/Images/c9.webp"),
  },
  {
    id: 10,
    name: "Toys",
    image: require("../Assets/Images/c10.webp"),
  },
  {
    id: 11,
    name: "Toys",
    image: require("../Assets/Images/c11.webp"),
  },
  {
    id: 12,
    name: "Toys",
    image: require("../Assets/Images/c12.webp"),
  },
  {
    id: 13,
    name: "Toys",
    image: require("../Assets/Images/c13.webp"),
  },
  {
    id: 14,
    name: "Toys",
    image: require("../Assets/Images/c14.webp"),
  },
  {
    id: 15,
    name: "Toys",
    image: require("../Assets/Images/c15.webp"),
  },
];

const CategorySlider = () => {
  return (
    <section className="bg-white">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 px-3 py-2 min-w-max">
          {categories.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center flex-shrink-0"
            >
              <div className="w-16 h-16 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;