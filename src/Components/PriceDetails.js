import React from "react";

const PriceDetails = ({
  cart = [],
  payment = {},
}) => {
  const totalMRP = cart.reduce(
    (sum, item) =>
      sum +
      item.mrp * (item.quantity || 1),
    0
  );

  const sellingPrice = cart.reduce(
    (sum, item) =>
      sum + item.selling_price * (item.quantity || 1),
    0
  );

  const productDiscount =
    totalMRP - sellingPrice;

  const paymentDiscount =
    payment.discount || 0;

  const totalPayable =
    sellingPrice - paymentDiscount;

  return (
    <div className="bg-white mt-3">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h2 className="text-[16px] font-semibold text-gray-700">
          PRICE DETAILS
        </h2>
      </div>

      {/* Details */}
      <div className="px-4 py-4 space-y-4 text-[15px]">
        <div className="flex justify-between">
          <span>
            Price ({cart.length} item)
          </span>

          <span>
            ₹{totalMRP.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span className="text-green-600">
            - ₹
            {productDiscount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Extra discount</span>

          <span className="text-green-600">
            - ₹
            {paymentDiscount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charges</span>

          <span className="text-green-600">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-[18px] font-semibold">
          <span>Total Amount</span>

          <span>
            ₹
            {totalPayable.toLocaleString()}
          </span>
        </div>

        <hr />

        <p className="text-green-600 font-semibold">
          You will save ₹
          {(
            productDiscount +
            paymentDiscount
          ).toLocaleString()}{" "}
          on this order
        </p>
      </div>
    </div>
  );
};

export default PriceDetails;