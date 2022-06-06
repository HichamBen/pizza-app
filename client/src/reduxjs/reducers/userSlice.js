import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const userReducer = createSlice({
    name: "user",
    initialState: {
        error: false,
        userData: JSON.parse(localStorage.getItem("userData")) || { isAuth: false },
    },
    reducers: {
        errorOccured: (state) => {
            state.error = true;
        },
        logInOut: (state, action) => {
            state.error = false;
            state.userData = action.payload;

        },
    }
});

export const { errorOccured, logInOut } = userReducer.actions;

// login dispatch
export const loginUser = (info) => async (dispatch) => {
    try {
        const { data } = await axios.post("/api/user/login", info);
        dispatch(logInOut(data));
        localStorage.setItem("userData", JSON.stringify(data));

    } catch (err) {
        dispatch(errorOccured());
        console.log("In loginUser reducer\n" + err.message);
    }
}

// register dispatch
export const registerUser = (info) => async (dispatch) => {
    try {
        const { data } = await axios.post("/api/user/signup", info);

        dispatch(logInOut(data));
        localStorage.setItem("userData", JSON.stringify(data));


    } catch (err) {
        console.log("In registerUser reducer\n" + err.message);
    }
}

// logout dispatch 

export const logoutUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/user/logout");

        dispatch(logInOut(data));
        localStorage.setItem("userData", JSON.stringify(data));

    } catch (err) {
        console.log("In logoutUser reducer\n" + err.message);
    }
}

export const updateInfo = (userId, infos) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/user/change/${userId}`, infos);
        dispatch(logInOut(data));
        localStorage.setItem("userData", JSON.stringify(data));

    } catch (err) {
        console.log("In updateInfo reducer\n" + err.message);
    }
}

export const deleteAccount = (userId) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/user/delete/${userId}`);
        dispatch(logInOut(data));
        localStorage.setItem("userData", JSON.stringify(data));

    } catch (err) {
        console.log("In deleteAccount reducer\n" + err.message);
    }
}

export const loginWithOAuth2 = () => async (dispatch) => {
    try {       
        const {data} = await axios.get("/api/user/login");
        dispatch(logInOut(data))
        localStorage.setItem("userData", JSON.stringify(data));

    } catch(err) {
        console.log(err.message);
    }
}
export default userReducer.reducer;
