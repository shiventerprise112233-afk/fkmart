import React, { useEffect, useMemo, useState } from 'react'
import DealsSection from '../Components/DealsSection'
import PaymentMethods from '../Components/PaymentMethods'
import PriceDetails from '../Components/PriceDetails';
import Secure from "../Assets/Icons/SecurePay.jpg"
import PaymentBottomBar from '../Components/PaymentBottomBar';

const Payment = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const buyNow = JSON.parse(localStorage.getItem("cart"));

        if (buyNow) {
            setCart(buyNow);
        } else {
            const savedCart =
                JSON.parse(localStorage.getItem("cart")) || [];

            setCart(savedCart);
        }
    }, []);

    // Total Price
    const totalAmount = useMemo(() => {
        return cart.reduce(
            (total, item) =>
                total + item.selling_price * (item.quantity || 1),
            0
        );
    }, [cart]);
    console.log(totalAmount)
    const totalMRP = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum +
                item.mrp *
                (item.quantity || 1),
            0
        );
    }, [cart]);

    const [payment, setPayment] = useState({
        method: null,
        discount: 0,
        finalAmount: 0,
    });

    const payableAmount = totalAmount - payment.discount;

    return (
        <div className="bg-gray-100 min-h-screen pb-20">
            <DealsSection />
            <PaymentMethods
                amount={totalAmount}
                onPaymentChange={setPayment}
            />
            <PriceDetails
                cart={cart}
                payment={payment}
            />
            <img src={Secure} alt='' className='w-full mt-2' />
            <PaymentBottomBar
                totalMRP={totalMRP}
                payableAmount={payableAmount}
                paymentMethod={payment.method}
            />
        </div>
    )
}

export default Payment