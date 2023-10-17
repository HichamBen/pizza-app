import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const Footer = lazy(() => import("./components/Footer"));
const SignupS = lazy(() => import("./screens/SignupS"));
const LoginS = lazy(() => import("./screens/LoginS"));
const AccountS = lazy(() => import("./screens/AccountS"));
const BillS = lazy(() => import("./screens/BillS"));
const CartS = lazy(() => import("./screens/CartS"));
const HistoryS = lazy(() => import("./screens/HistoryS"));
const HomeS = lazy(() => import("./screens/HomeS"));
const OrderS = lazy(() => import("./screens/OrderS"));
const PaymentS = lazy(() => import("./screens/PaymentS"));
const UserInfoS = lazy(() => import("./screens/UserInfoS"));
const Layout = lazy(() => import("./components/Layout"));

function App() {
  const { order } = useSelector(state => state.order);

  return (
    <BrowserRouter>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomeS />} />
            <Route element={<Layout />}>
              <Route path="user/history" element={<HistoryS />} />
              <Route path="user/account" element={<AccountS />} />
              <Route path="order" element={<OrderS />}>
                <Route path=":restaurantId" element={<CartS />} />
                <Route
                  path="userInfo"
                  element={order ? <UserInfoS /> : <Navigate to="/login" />}
                />
                <Route
                  path="payment"
                  element={
                    order && order.clientInfo ? (
                      <PaymentS />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="bill"
                  element={
                    order && order.paymentMethod !== "Nothing" ? (
                      <BillS />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Route>

              <Route path="invoice/:orderId" element={<BillS />}></Route>
            </Route>
            <Route path="login" element={<LoginS />} />
            <Route path="signup" element={<SignupS />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
