import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { logInOut } from "../reduxjs/reducers/userSlice";

function useRefresh() {
  const dispatch = useDispatch();
  const refresh = async () => {
    const { data } = await axios.get("/refresh");
    // set to redux state "token" loginout

    dispatch(logInOut(data?.accessToken));

    return data?.accessToken;
  };

  return refresh;
}

export default useRefresh;
