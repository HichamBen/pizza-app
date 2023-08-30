import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { loginUser, loginWithOAuth2 } from "../reduxjs/reducers/userSlice";

export default function LoginS() {
  const { error } = useSelector(state => state.user);
  const { isAuth } = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  function handleSubmit(e) {
    e.preventDefault();
    const info = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    dispatch(loginUser(info));
  }

  useEffect(() => {
    searchParams.get("isAuth") === "true" && dispatch(loginWithOAuth2());
  });

  function loginbyGoogle() {
    window.open(
      "https://pizza-app-mern.onrender.com/api/user/auth/google",
      "_self"
    );
  }
  function loginByFacebook() {
    window.open(
      "https://pizza-app-mern.onrender.com/api/user/auth/facebook",
      "_self"
    );
  }

  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="container px-4 text-center mt-5"
        autoComplete="off"
      >
        <h2 className="mb-5">Log In to Pizza App</h2>
        <div className="mb-3">
          <span
            className="btn btn-lg btn-outline-danger me-3"
            onClick={loginbyGoogle}
          >
            <i className="bi bi-google"></i> Google
          </span>
          <span
            className="btn btn-lg btn-outline-primary"
            onClick={loginByFacebook}
          >
            <i className="bi bi-facebook"></i> Facebook
          </span>
        </div>
        <p>Or</p>

        {error && (
          <div
            className="m-auto"
            style={{
              width: "370px",
              background: "rgb(253, 169, 169)",
              color: "brown",
            }}
          >
            <span>The email or the password is not correct</span>
          </div>
        )}
        <div className="input-group mb-3 mx-auto" style={{ width: "370px" }}>
          <span className="input-group-text" id="addon-1">
            <i className="bi bi-envelope"></i>
          </span>
          <div
            style={{ width: "328px" }}
            className="form-floating"
            aria-label="email"
            aria-describedby="addon-1"
          >
            <input
              type="email"
              className="form-control rounded-0 rounded-end"
              id="email"
              placeholder="Email address"
            />
            <label htmlFor="email" className="text-muted">
              Email address
            </label>
          </div>
        </div>

        <div className="input-group mb-3 mx-auto" style={{ width: "370px" }}>
          <span className="input-group-text" id="addon-2">
            <i className="bi bi-lock"></i>
          </span>
          <div
            style={{ width: "328px" }}
            className="form-floating"
            aria-label="password"
            aria-describedby="addon-2"
          >
            <input
              type="password"
              className="form-control rounded-0 rounded-end"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password" className="text-muted">
              Password
            </label>
          </div>
        </div>

        <button className="btn btn-outline-success col-4">Log in</button>
      </form>
      <p className="text-center my-4">
        <i className="bi bi-arrow-right-circle-fill text-warning"></i> If you
        don't have an account{" "}
        <Link to="/signup" className="text-success fw-bold signup-link">
          Create
        </Link>{" "}
        one
      </p>
    </div>
  );
}
