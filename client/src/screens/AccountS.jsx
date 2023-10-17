import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import {
  addUserData,
  getUserInfo,
  logoutUser,
} from "../reduxjs/reducers/userSlice";
import jwtDecode from "jwt-decode";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function AccountS() {
  const axiosPrivate = useAxiosPrivate();
  const { token, userInfo } = useSelector(state => state.user);
  const [name, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(axiosPrivate));
  }, [dispatch, axiosPrivate]);

  useEffect(() => {
    if (userInfo) {
      setFirstN(userInfo?.username);
      setLastN(userInfo.lname);
      setAddress(userInfo.address);
      setPhone(userInfo.phone);
    }
  }, [userInfo]);

  const submitChange = async e => {
    e.preventDefault();
    const infos = {
      username: name,
      userInfo: {
        lname: lastN,
        address: address,
        phone: phone,
      },
    };

    if (phone.length === 10 && !Number.isNaN(phone)) {
      try {
        const { data } = await axiosPrivate.post("/api/user/change", infos);
        dispatch(addUserData(data));
        alert("The changes was saved!");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("The phone number should be a number of 10 digit");
    }
  };

  const delAccount = async () => {
    try {
      await axiosPrivate.delete("/api/user/delete");
      dispatch(logoutUser());
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2>My Account</h2>
        <div className="row bg-light justify-content-center py-4 mt-5 g-0 rounded">
          <h4 className="ps-5 my-4 ">Personal information</h4>
          <div className="col-6 col-sm-4 me-5">
            <div className="mb-3">
              <label className="form-label text-muted" htmlFor="fName">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fName"
                value={name || jwtDecode(token)?.username}
                onChange={e => setFirstN(e.target.value)}
              ></input>
            </div>

            <div className="mb-3 d-block d-sm-none">
              <label className="form-label text-muted" htmlFor="desktop-lName">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="desktop-lName"
                value={lastN || ""}
                onChange={e => setLastN(e.target.value)}
              ></input>
            </div>

            <div className="mb-3">
              <label className="form-label text-muted" htmlFor="address">
                Address
              </label>
              <input
                type="address"
                className="form-control"
                id="address"
                value={address || ""}
                onChange={e => setAddress(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label text-muted" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone || ""}
                onChange={e => setPhone(e.target.value)}
              ></input>
            </div>

            <button
              className="btn btn-primary float-end"
              onClick={submitChange}
            >
              Save Changes
            </button>
          </div>
          <div className="col-6 col-sm-4 d-none d-sm-block">
            <div className="mb-3">
              <label className="form-label text-muted" htmlFor="lName">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lName"
                value={lastN || ""}
                onChange={e => setLastN(e.target.value)}
              ></input>
            </div>
          </div>
        </div>

        <div className="row bg-light justify-content-center pb-4 g-0 rounded-bottom">
          <h4 className="ps-5 my-4 ">E-mail Address</h4>

          <div className="col-6 col-sm-4 me-5">
            <div>
              <label className="form-label text-muted" htmlFor="email">
                E-mail Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={userInfo?.email || ""}
                readOnly
              ></input>
            </div>
            <div>
              <br />
              <button
                className="btn btn-outline-danger float-end"
                data-bs-toggle="modal"
                data-bs-target="#confirmDeletion"
              >
                Delete Account
              </button>
            </div>
          </div>
          <div className="col-6 col-sm-4"></div>
        </div>
      </div>

      <div
        className="modal fade"
        id="confirmDeletion"
        tabIndex="-1"
        aria-labelledby="ModalConfirmDeletion"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteAccount">
                Delete Account
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              If you want to delete you account click to confirm button.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={delAccount}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
