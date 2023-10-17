import { createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {
    restaurants: [],
    total: 0,
    restaurantSelected: JSON.parse(localStorage.getItem("cart")) || null,
    deferring: true,
    loading: true,
  },
  reducers: {
    restaurants_Rendered: (state, action) => {
      state.loading = false;
      state.restaurants = action.payload.restaurants;
      state.total = action.payload.total;
    },
    erro_Occured: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    goToRestaurant: (state, action) => {
      state.restaurantSelected = action.payload;
      state.deferring = false;
    },
    loading: state => {
      state.loading = true;
    },
  },
});

export const { loading, restaurants_Rendered, erro_Occured, goToRestaurant } =
  suggestionsSlice.actions;

export const getRestaurants = query => async dispatch => {
  dispatch(loading);
  try {
    const { data } = await axios.get(`/api/pizza/restaurants?${query}`);
    dispatch(restaurants_Rendered(data));
  } catch (err) {
    dispatch(erro_Occured(err.message));
    console.log("In getRestaurants reducer\n" + err.message);
  }
};

// selecte restaurant for shop
export const getRestaurantSelected = restaurantId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/pizza/restaurants/${restaurantId}`);
    dispatch(goToRestaurant(data));
    localStorage.setItem("cart", JSON.stringify(data));
  } catch (err) {
    console.log(err.message);
  }
};

export default suggestionsSlice.reducer;
