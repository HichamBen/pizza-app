import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import AccountS from "./screens/AccountS";
import BillS from "./screens/BillS";
import CartS from "./screens/CartS";
import HistoryS from "./screens/HistoryS";
import HomeS from './screens/HomeS';
import LoginS from './screens/LoginS';
import OrderS from "./screens/OrderS";
import PaymentS from "./screens/PaymentS";
import SignupS from './screens/SignupS';
import UserInfoS from "./screens/UserInfoS";

function App() {

  const { isAuth } = useSelector(state => state.user.userData);
  const { order } = useSelector(state => state.order);


  return <BrowserRouter>
    <div className="grid">
      <main>
        <Routes>
          <Route path="/" element={<HomeS />} />
          <Route path="user/history" element={<HistoryS />} />
          <Route path="user/account" element={<AccountS />} />
          <Route path="order" element={isAuth ? <OrderS /> : <Navigate to="/login" />}>
            <Route path=":restaurantId" element={isAuth ? <CartS /> : <Navigate to="/login" />} />
            <Route path="userInfo" element={isAuth && order ? <UserInfoS /> : <Navigate to="/login" />} />
            <Route path="payment" element={isAuth && order && order.clientInfo ? <PaymentS /> : <Navigate to="/login" />} />
            <Route path="bill" element={isAuth && order && (order.paymentMethod !== "Nothing") ? <BillS /> : <Navigate to="/login" />} />
          </Route>

          <Route path="invoice/:orderId" element={<BillS />}></Route>
          <Route path="login" element={<LoginS />} />
          <Route path="signup" element={<SignupS />} />
        </Routes>

      </main>
      <Footer />
    </div>
  </BrowserRouter>
}

export default App;
