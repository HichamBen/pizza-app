import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reduxjs/reducers/userSlice";

export default function Header() {

    const { isAuth, user } = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        dispatch(logoutUser());
        navigate("/login");
    }

    return <header className="navbar navbar-expand navbar-light ps-4">
        <Link to="/" className="navbar-brand">Pizza</Link>

        <div className="container justify-content-end align-item-center">
            <ul className="navbar-nav">

                {isAuth && <li className="dropdown nav-item ms-4">
                    <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.username}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                        <Link to="/" className="dropdown-item">Home</Link>
                        <Link className="dropdown-item" to="/user/account">Account</Link>
                        <Link className="dropdown-item" to="/user/history">Order History</Link>

                        <button className="dropdown-item" onClick={logout}>Log out <i className="bi bi-door-open-fill"></i></button>

                    </div>
                </li>}
            </ul>
        </div>
    </header>

}