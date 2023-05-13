import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom"
import PizzaRow from "../components/PizzaRow";
import { getRestaurantSelected } from "../reduxjs/reducers/suggestionsSlice";
import BarrGuide from "../components/BarreGuide";
import { makeOrder } from "../reduxjs/reducers/orderSlice";

export default function CartS() {
    const [totalePrice, setTotalePrice] = useState(0);

    const [pizzaSelected, setPizza] = useState([]);
    const [isAnItemThere, setItemThere] = useState(false);
    const restaurantId = useParams().restaurantId;
    const [searchParms, setSearchParms] = useSearchParams();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user.userData);
    const { restaurantSelected: resChoosed, deferring } = useSelector(state => state.restaurants)
    const { order } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        const qParms = {};
        if (!resChoosed) {
            dispatch(getRestaurantSelected(restaurantId))
        } else {

            resChoosed.pizza.forEach((item, id) => {
                qParms["item_" + id] = 0;
            });
            if (order) {
                order.pizzaSelected.forEach(pizza => {
                    qParms["item_" + pizza.inUrlParams] = pizza.priceOfAll;
                });
            }
            setSearchParms(qParms);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deferring])

    useEffect(() => {
        let tPrice = 0;
        let holdPizzaSelected = [];
        [...searchParms].forEach((query, id) => {
            if (searchParms.get("item_" + id) !== "0") {
                const amount = Number(searchParms.get("item_" + id)) / resChoosed.pizza[id].price;
                holdPizzaSelected = [...holdPizzaSelected,
                {
                    inUrlParams: id,
                    type: resChoosed.pizza[id].type,
                    itemImg: resChoosed.pizza[id].img,
                    amount: amount,
                    priceOfOne: resChoosed.pizza[id].price,
                    priceOfAll: Number(searchParms.get("item_" + id)),
                }
                ]
            }
            tPrice += Number(query[1])
        });

        setPizza(holdPizzaSelected);
        setTotalePrice(tPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParms])

    function isItemAdded() {
        if (totalePrice !== 0) {
            setItemThere(false);

            const newOrder = {
                restaurantName: resChoosed.restaurant,
                restLocation: resChoosed.location,
                clientLocation: resChoosed.location,
                img: resChoosed.img,
                totalePrice: totalePrice,
                pizzaSelected,
                user: user._id,
                restaurant: resChoosed._id,
                isPay: false,
                isDelivered: false,
                paymentMethod: "Nothing",
            }
            dispatch(makeOrder(newOrder)).then(() => {
                navigate("/order/userInfo");
            });

        } else {
            setItemThere(true);
        }
    }

    return <>
        <BarrGuide step1 />
        {resChoosed && <div className="container mt-5">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title restaurant-brand">{resChoosed.restaurant}</h3>
                </div>
                <div className="modal-body">
                    {resChoosed.pizza.map((item, id) => <PizzaRow key={id} id={id} item={item} />)}
                    <div className="p-2 border fs-4 bg-light">
                        <span>Total price:</span>
                        <span className="float-end pe-5 text-success fw-bold">{totalePrice}dh</span>
                    </div>
                </div>
                <div className="modal-footer">
                    {isAnItemThere && <span className="text-danger">You must choose an item to continue the order</span>}
                    <Link to="/" className="btn btn-primary">Home</Link>

                    <button className="btn btn-primary" onClick={isItemAdded}>Next</button>

                </div>
            </div>
        </div>}
    </>
}