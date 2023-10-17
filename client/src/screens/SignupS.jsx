import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

export default function SignupS() {
  const [isPassEq, setIsPassEq] = useState(true);
  const [isAuth, setIsAuth] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const info = {
      username: e.target["username"].value,
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    if (info.password !== e.target["confirm-pass"].value) {
      setIsPassEq(false);
    } else {
      setIsPassEq(true);
      try {
        await axios.post("/register", info);
        setIsAuth(true);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="container px-4 text-center mt-5">
        <h2 className="mb-5">Create an account</h2>

        <div className="input-group mb-3 mx-auto" style={{ width: "370px" }}>
          <span className="input-group-text" id="addon-0">
            <i className="bi bi-person"></i>
          </span>
          <div
            style={{ width: "328px" }}
            className="form-floating"
            aria-label="username"
            aria-describedby="addon-0"
          >
            <input
              type="text"
              className="form-control rounded-0 rounded-end"
              id="username"
              placeholder="Username"
              required
            />
            <label htmlFor="username" className="text-muted">
              Username
            </label>
          </div>
        </div>

        {error && (
          <div
            className="m-auto"
            style={{
              width: "370px",
              background: "rgb(253, 169, 169)",
              color: "brown",
            }}
          >
            <span>{error}</span>
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
              required
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
              minLength="6"
              maxLength="12"
              placeholder="Password"
              required
            />
            <label htmlFor="password" className="text-muted">
              Password
            </label>
          </div>
        </div>

        {!isPassEq && (
          <div
            className="m-auto"
            style={{
              width: "370px",
              background: "rgb(253, 169, 169)",
              color: "brown",
            }}
          >
            <span>Enter the right password!</span>
          </div>
        )}

        <div className="input-group mb-3 mx-auto" style={{ width: "370px" }}>
          <span className="input-group-text" id="addon-3">
            <i className="bi bi-lock"></i>
          </span>
          <div
            style={{ width: "328px" }}
            className="form-floating"
            aria-label="confirm-password"
            aria-describedby="addon-3"
          >
            <input
              type="password"
              className="form-control rounded-0 rounded-end"
              id="confirm-pass"
              placeholder="Confirm password"
              minLength="6"
              maxLength="12"
              required
            />
            <label htmlFor="confirm-pass" className="text-muted">
              Confirm password
            </label>
          </div>
        </div>
        <button className="btn btn-outline-success col-4">Create</button>
      </form>

      {isAuth && (
        <div
          className="modal fade show bg-dark"
          style={{ display: "block", "--bs-bg-opacity": "0.5" }}
          id="successRegister"
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-success">
                  Your account is created
                </h5>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
