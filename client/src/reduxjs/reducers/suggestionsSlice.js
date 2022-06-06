import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const suggestionsSlice = createSlice({
    name: "suggestions",
    initialState: {
        restaurantsRendered: [],
        restaurantSelected: JSON.parse(localStorage.getItem("cart")) || null,
        dataLength: 0,
        deferring: true,
        waiting: true,
    },
    reducers: {
        restaurants_Rendered: (state, action) => {
            state.restaurantsRendered = action.payload
            state.dataLength = action.payload.length
        },
        erro_Occured: (state, action) => {
            state.error = action.payload
        },
        goToRestaurant: (state, action) => {
            state.restaurantSelected = action.payload;
            state.deferring = false;
        },
    }
})

export const { restaurants_Rendered, erro_Occured, goToRestaurant } = suggestionsSlice.actions;

export const getRestaurants = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/pizza/restaurants")
        dispatch(restaurants_Rendered(data));

    } catch (err) {
        console.log("In getRestaurants reducer\n" + err.message);

    }
}

// Hold suggestions restaurants

export const HoldSuggestionsRestaurants = (restaurant, range, rating) => async (dispatch) => {
    const { data } = await axios.get("/api/pizza/restaurants");

    if (!restaurant) return;
    let name = restaurant[1];
    let highNum = Number(range[1]);
    let ratingP = Number(rating[1]);
    let holder = [];

    data.forEach(element => {
        if (name.toLowerCase() === element.restaurant.slice(0, name.length).toLowerCase()) {
            if (element.priceRange[1] <= Number(highNum)) {
                if (element.rating >= ratingP) {
                    holder.push(element)
                }
            }
        }
    });
    dispatch(restaurants_Rendered(holder))
}

// selecte restaurant for shop
export const getRestaurantSelected = (restaurantId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/pizza/restaurants/${restaurantId}`);
        dispatch(goToRestaurant(data))
        localStorage.setItem("cart", JSON.stringify(data));
    } catch (err) {
        console.log(err.message)
    }
}


export default suggestionsSlice.reducer;