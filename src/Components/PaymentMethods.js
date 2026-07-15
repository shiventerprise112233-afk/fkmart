import { useState, useEffect } from "react";
import PhonePe from "../Assets/Icons/phonepe.svg";
import Paytm from "../Assets/Icons/Paytm_Logo.png";
import Scan from "../Assets/Icons/qr-code-payments-work.png";

const methods = [
  {
    id: "phonepe",
    name: "PhonePe",
    logo: PhonePe,
    discount: 6,
  },
  {
    id: "paytm",
    name: "Paytm",
    logo: Paytm,
    discount: 4,
  },
  {
    id: "scan",
    name: "Scan To Pay",
    logo: Scan,
    discount: 2,
  },
];

const PaymentMethods = ({ amount, onPaymentChange }) => {
  const [selected, setSelected] = useState(methods[0]);

  useEffect(() => {
    const discount =
      Math.round((amount * selected.discount) / 100);

    onPaymentChange({
      method: selected,
      discount,
      finalAmount: amount - discount,
    });
  }, [selected, amount, onPaymentChange]);

  return (
    <div className="bg-white p-3">
      <div className="space-y-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method)}
            className={`w-full rounded-xl border transition-all duration-200 p-4 flex items-center justify-between ${
              selected.id === method.id
                ? "border-[#2874F0] bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Radio */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected.id === method.id
                    ? "border-[#2874F0]"
                    : "border-gray-400"
                }`}
              >
                {selected.id === method.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2874F0]" />
                )}
              </div>

              {/* Logo */}
              <img
                src={method.logo}
                alt={method.name}
                className="w-[40px] p-[6px] object-contain"
              />

              {/* Name */}
              <h2 className="text-[18px] font-medium">
                {method.name}
              </h2>
            </div>

            {/* Discount */}
            <div className="bg-green-100 text-green-700 text-[12px] font-semibold px-3 py-1 rounded">
              Extra {method.discount}% OFF
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;