import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderReducer = createSlice({
    name: "order",
    initialState: {
        order: JSON.parse(localStorage.getItem("order")),
    },
    reducers: {
        addOrder: (state, action) => {
            state.order = action.payload;
        },
        clearOrder: (state) => {
            localStorage.removeItem("order");
            state.order = null;
            state.client = null;

        },
        addLocation: (state, action) => {
            state.order.clientLocation = action.payload;
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        clientInfo: (state, action) => {
            state.order.clientInfo = action.payload;
            localStorage.setItem("order", JSON.stringify(state.order));
        },
        addPaymentMethod: (state, action) => {
            if (action.payload === "paypal") {
                state.order.isPay = true;
            }
            state.order.paymentMethod = action.payload;
        },
    }
})

export const { addOrder, clearOrder, addLocation, clientInfo, addPaymentMethod } = orderReducer.actions;


export const makeOrder = (order) => async (dispatch) => {
    dispatch(addOrder(order))
    localStorage.setItem("order", JSON.stringify(order));
}

export const registerOrder = (paymentMethod) => async (dispatch, getState) => {
    dispatch(addPaymentMethod(paymentMethod));
    try {
        const { data } = await axios.post("/api/order/insert", getState().order.order);
        dispatch(addOrder(data))
        localStorage.setItem("order", JSON.stringify(data));

    } catch (err) {
        console.log(err.message);
    }
}

export default orderReducer.reducer;