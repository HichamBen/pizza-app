import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useRefresh from "../hooks/useRefresh";
import { useEffect, useState } from "react";
import Header from "./Header";
import HomeHeader from "./HomeHeader";
import Loader from "./Loader";

function Layout({ isForHome }) {
  const { token } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();

  useEffect(() => {
    let isMounted = true;
    async function keepLogin() {
      try {
        await refresh();
      } catch (error) {
        console.log(error.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    !token ? keepLogin() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isForHome) {
    return token ? (
      <Header />
    ) : isLoading ? (
      <div className="header-loading" />
    ) : (
      <HomeHeader />
    );
  }

  return token ? (
    <Outlet />
  ) : isLoading ? (
    <Loader />
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default Layout;
