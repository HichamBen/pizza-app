import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { clearOrder } from "../reduxjs/reducers/orderSlice";

export default function HistoryS() {
    const [orders, setOrders] = useState([]);
    const { _id } = useSelector(state => state.user.userData.user);
    const { order } = useSelector(state => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        if (order) dispatch(clearOrder());
        async function getAllOrder() {
            const { data } = await axios.get(`/api/order/history/${_id}`);
            setOrders(data);
        }
        getAllOrder();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <Header />
        <div className="container my-5">
            <h2>Histories</h2>
            <table className="mt-4">
                <thead className="bg-light">
                    <tr>
                        <th>OrderId</th>
                        <th>Restaurant</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => <tr className="border-bottom" key={order._id}>
                        <td><Link to={`/invoice/${order._id}`}>{order._id}</Link></td>
                        <td>{order.restaurantName}</td>
                        <td>{order.time}</td>
                        <td>{order.isDelivered ? "Finish" : "Pending"}</td>
                        <td className="text-center">{order.totalePrice}dh</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>

}