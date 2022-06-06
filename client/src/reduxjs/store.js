import { configureStore } from "@reduxjs/toolkit";
import suggestionsReducer from "./reducers/suggestionsSlice";
import userReducer from "./reducers/userSlice";
import orderReducer from "./reducers/orderSlice";

export default configureStore({
    reducer: {
        restaurants: suggestionsReducer,
        user: userReducer,
        order: orderReducer
    }
})