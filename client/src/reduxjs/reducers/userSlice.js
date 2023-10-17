import { createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    error: false,
    userInfo: null,
    token: null,
  },
  reducers: {
    addUserData: (state, action) => {
      state.userInfo = action.payload;
    },
    errorOccured: state => {
      state.error = true;
    },
    logInOut: (state, action) => {
      state.error = false;
      state.token = action.payload;
    },
  },
});

export const { addUserData, errorOccured, logInOut } = userReducer.actions;

// login dispatch
export const loginUser = info => async dispatch => {
  try {
    const { data } = await axios.post("/auth", info);
    dispatch(logInOut(data.accessToken));
  } catch (err) {
    dispatch(errorOccured());
    console.log("In loginUser reducer\n" + err.message);
  }
};

// logout dispatch
export const logoutUser = () => async dispatch => {
  try {
    await axios.get("/logout");
    dispatch(logInOut(null));
  } catch (err) {
    dispatch(errorOccured());
    console.log("In logoutUser reducer\n" + err.message);
  }
};

// get User
export const getUserInfo = (axios) => async dispatch => {
  try {
    const { data } = await axios.get("/api/user");
    dispatch(addUserData(data));
  } catch (err) {
    console.log("In updateInfo reducer\n" + err.message);
  }
};

export default userReducer.reducer;
