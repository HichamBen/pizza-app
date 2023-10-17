import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { loginUser } from "../reduxjs/reducers/userSlice";

export default function LoginS() {
  const { error, token } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const info = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    dispatch(loginUser(info));
  }

  return token ? (
    <Navigate to="/" replace={true} />
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
            // onClick={}
          >
            <i className="bi bi-google"></i> Google
          </span>
          <span
            className="btn btn-lg btn-outline-primary"
            // onClick={}
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
