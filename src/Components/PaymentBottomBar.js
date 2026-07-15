import React from "react";

const PaymentBottomBar = ({
    totalMRP,
    payableAmount,
    paymentMethod,
}) => {

    const vpa = "mab.037323031180040@axisbank";
    const orderId = Math.random()*0.1

    const onContinue = () => {
        if (paymentMethod.id === "phonepe") {
            openphonepay()
        } else if (paymentMethod.id === "paytm") {
            openpaytm()
        } else if (paymentMethod.id === "scan") {
            openqr()
        }
    }

        

        const openphonepay = () => {
            const deepLink = generateDeepLink();

            // Redirect the browser to open the PhonePe app
            window.location.href = deepLink;
        }

        const openpaytm = () => {
            const url = `paytmmp://cash_wallet?pa=${vpa}&pn=Online%20Shopping&am=${payableAmount}&tr=&mc=8999&cu=INR&tn=OrderNo%3A%20e6ohidxx-rbtv&featuretype=money_transfer`
            window.location.href = url;
        }

        const openqr = () => {

        }


        const generateDeepLink = () => {
            
            // 1. Construct the payload with dynamic values
            const payload = {
                contact: {
                    cbsName: "ok",
                    nickName: "sale", // You can also make this dynamic if needed
                    vpa: vpa,
                    type: "VPA"
                },
                p2pPaymentCheckoutParams: {
                    note: `OrderNo: ${orderId}`,
                    isByDefaultKnownContact: true,
                    enableSpeechToText: false,
                    allowAmountEdit: false,
                    showQrCodeOption: false,
                    disableViewHistory: true,
                    shouldShowUnsavedContactBanner: false,
                    isRecurring: false,
                    checkoutType: "DEFAULT",
                    transactionContext: "p2p",
                    // PhonePe expects the amount in paisa
                    initialAmount: payableAmount * 100,
                    disableNotesEdit: true,
                    showKeyboard: true,
                    currency: "INR",
                    shouldShowMaskedNumber: true
                }
            };

            // 2. Convert to JSON and encode to Base64
            const jsonString = JSON.stringify(payload);
            const base64Data = btoa(jsonString);

            // 3. Return the fully constructed native URI
            return `phonepe://native?data=${base64Data}&id=p2ppayment`;
        };

        return (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
                <div className="flex items-center justify-between p-3">
                    {/* Price */}
                    <div>
                        <p className="text-gray-500 line-through text-[12px]">
                            ₹{Number(totalMRP).toLocaleString()}
                        </p>

                        <h2 className="text-[16px] font-semibold leading-7">
                            ₹{Number(payableAmount).toLocaleString()}
                        </h2>
                    </div>

                    {/* Continue */}
                    <button
                        onClick={onContinue}
                        className="bg-[#FFC107] hover:bg-[#FFB300] transition-colors h-12 w-[170px] rounded-sm text-black font-medium text-[14px]"
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    };

    export default PaymentBottomBar;