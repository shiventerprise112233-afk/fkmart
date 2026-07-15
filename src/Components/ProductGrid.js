import React from "react";
import ProductCard from "./ProductCard";
import Data from "../Data"



const ProductGrid = () => {
  return (
    <section className="bg-gray-100">
      <div className="grid grid-cols-2 gap-[1px] bg-gray-300">
        {Data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;