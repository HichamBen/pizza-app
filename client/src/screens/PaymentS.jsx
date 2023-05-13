import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BarrGuide from "../components/BarreGuide";
import { registerOrder } from "../reduxjs/reducers/orderSlice";

export default function PaymentS() {
    const [cAmount, setCAmount] = useState();
    const firstM = useRef();
    const secondM = useRef();

    const { order } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        async function convertCurrency() {
            try {
                const { data } = await axios.get(`https://api.apilayer.com/currency_data/convert?to=USD&from=MAD&amount=${order.totalePrice}&apikey=evByCrrFufg7sC2ic4kc3s2RFbYZ8xKs`);
                setCAmount(data.result.toFixed(2));
            } catch (err) {
                console.log(err.message);
            }
        }
        async function createScript() {
            try {
                const { data } = await axios.get("/api/config/paypalKey");
                const script = document.createElement("script");
                script.src = `https://www.paypal.com/sdk/js?client-id=${data}&components=buttons`;
                document.body.appendChild(script);
            } catch (err) {
                console.log(err.message);
            }
        }
        convertCurrency();
        createScript();
        return function removeScript() {
            document.body.removeChild(document.body.lastChild)
        }
    }, [order]);

    function activeM(e) {
        document.getElementById("paypal-button-container").innerHTML = "";

        if (e.target === firstM.current) {
            firstM.current.classList.add("active");
            secondM.current.classList.remove("active");
        } else {
            firstM.current.classList.remove("active");
            secondM.current.classList.add("active");
            window.paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal'
                },
                createOrder: function (data, actions) {
                    // Set up the transaction
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: Number(cAmount)
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    // This function captures the funds from the transaction.
                    return actions.order.capture().then(function (details) {
                        // This function shows a transaction success message to your buyer.
                        dispatch(registerOrder("paypal"));
                    });
                }
            }).render('#paypal-button-container');
        }

    }

    function finishOrder() {
        dispatch(registerOrder("Upon receipt"));
    }

    return <>
        <BarrGuide step1 step2 step3 />

        {order.isPay || order.paymentMethod === "Upon receipt" ? <Navigate to="/order/bill" /> : <div className="container mt-5" style={{ height: "55vh" }}>
            <h2>Payment Method</h2>
            <div className="mx-auto px-3 py-2 mt-5" style={{ width: "375px" }}>
                <div className="row justify-content-sm-between justify-content-center">
                    <div className="col-7 col-sm-5 paymentM-1 mb-4" ref={firstM} onClick={activeM}>
                        <span className="check-s1">&#10004;</span>
                    </div>
                    <div className="col-7 col-sm-5 paymentM-2  mb-4" ref={secondM} onClick={activeM}>
                        <span className="check-s2">&#10004;</span>
                    </div>
                </div>
                <div id="paypal-button-container"></div>
            </div>
            <button className="btn btn-primary mt-3 float-end" onClick={finishOrder}>Finish Order</button>
        </div>}
    </>
}