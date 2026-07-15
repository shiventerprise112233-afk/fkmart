import React from "react";
import {useNavigate} from "react-router-dom"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const discount =
    Math.round(
      ((product.mrp - product.selling_price) / product.mrp) * 100
    ) || 0;

    const openProduct=(id)=>{
      navigate(`/product-details/${id}`)

    }

  return (
    <div className="bg-white border border-gray-200" onClick={()=>openProduct(product.id)}>
      {/* Product Image */}
      <div className="aspect-square p-3 flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="px-3 pb-3">
        <h3 className="text-[13px] text-gray-700 line-clamp-2 leading-5 h-10">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-[#388E3C] text-white rounded px-1.5 py-[2px] flex items-center gap-1">
            <span className="text-[12px] font-semibold">
              {product.rating} ★
            </span>

            
          </div>

          <span className="text-gray-500 text-[12px]">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-[16px] font-semibold">
            ₹{product.selling_price}
          </span>

          <span className="text-gray-500 line-through text-[12px]">
            ₹{product.mrp}
          </span>

          <span className="text-[#388E3C] text-[12px] font-medium">
            {discount}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;