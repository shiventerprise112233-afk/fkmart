import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
    const navigate = useNavigate();

    const [address, setAddress] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        window.scroll(0,0)
        const savedAddress = JSON.parse(
            localStorage.getItem("deliveryAddress")
        );

        setAddress(savedAddress);

        const buyNow = JSON.parse(localStorage.getItem("cart"));

        if (buyNow) {
            setCart(buyNow);
        } else {
            const savedCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            setCart(savedCart);
        }
    }, []);

    const totalMRP = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum +
                item.mrp *
                (item.quantity || 1),
            0
        );
    }, [cart]);

    const totalAmount = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum +
                item.selling_price *
                (item.quantity || 1),
            0
        );
    }, [cart]);
    const discount = totalMRP - totalAmount;

    return (
        <div className="bg-gray-100 min-h-screen pb-28">
            <div className="bg-white border-b p-4">
                <h1 className="text-[16px] font-semibold">
                    Order Summary
                </h1>
            </div>
            {/* Address */}
            <div className="bg-white p-4 mt-2">
                <div className="flex justify-between">
                    <div>
                        <p className="text-gray-600 text-[14px]">
                            Deliver to:
                        </p>

                        <h2 className="font-bold text-[16px]">
                            {address?.fullName}
                        </h2>

                        <p className="text-gray-700">
                            {address?.area},{" "}
                            {address?.city},{" "}
                            {address?.state},{" "}
                            {address?.pincode}
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/address")
                        }
                        className="text-[#2874F0]"
                    >
                        Change
                    </button>
                </div>
            </div>

            {/* Cart */}
            <div className="bg-white mt-2">
                <h2 className="text-[16px] font-semibold p-4">
                    Your Cart
                </h2>

                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-4 p-4 border-t"
                    >
                        <img
                            src={item.images[0]}
                            alt=""
                            className="w-16 h-16 object-contain"
                        />

                        <div className="flex-1">
                            <h3 className="line-clamp-2 text-[14px]">
                                {item.name}
                            </h3>

                            <p className="text-gray-500 text-[14px]">
                                Qty: {item.quantity || 1}
                            </p>

                            <p className="font-semibold text-[18px]">
                                ₹{item.selling_price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* UPI */}
            <div className="bg-white mt-2 p-4">
                <h2 className="text-[14px]">
                    Direct UPI Payment
                </h2>

                <p className="text-gray-500 mt-2 text-[12px]">
                    Support transformative social work
                    in India
                </p>

                <div className="flex gap-3 mt-4">
                    {[10, 20, 50, 100].map((amt) => (
                        <button
                            key={amt}
                            className="border rounded px-4 py-2 text-[14px]"
                        >
                            ₹{amt}
                        </button>
                    ))}
                </div>

                <p className="text-gray-500 mt-3 text-[12px]">
                    Note: GST and No cost EMI
                    will not be applicable
                </p>
            </div>

            {/* Price Details */}
            <div className="bg-white mt-2 p-4">
                <h2 className="text-16 font-semibold mb-5">
                    Price Details
                </h2>

                <div className="space-y-3 text-[14px]">
                    <div className="flex justify-between">
                        <span>
                            Price ({cart.length} item)
                        </span>

                        <span>
                            ₹
                            {totalMRP}
                        </span>
                    </div>

                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>

                        <span>
                            -₹
                            {discount}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Delivery Charges</span>

                        <span className="text-green-600">
                            FREE Delivery
                        </span>
                    </div>
                </div>

                <hr className="my-5" />

                <div className="flex justify-between text-[18px] font-bold">
                    <span>Total Amount</span>

                    <span>
                        ₹
                        {totalAmount}
                    </span>
                </div>
            </div>

            {/* Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                <button
                    onClick={() =>
                        navigate("/payment")
                    }
                    className="w-full bg-[#ff6f00] text-white py-4 rounded font-semibold text-[16px]"
                >
                    Continue To Payment
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;