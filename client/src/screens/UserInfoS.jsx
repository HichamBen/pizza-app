import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarrGuide from "../components/BarreGuide";
import { getPosition } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, clientInfo } from "../reduxjs/reducers/orderSlice";
import { updateInfo } from "../reduxjs/reducers/userSlice";
import axios from "axios";

export default function UserInfoS() {
    const { user } = useSelector(state => state.user.userData);
    const [name, setName] = useState(user.username);
    const [lastN, setLastN] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [position, setPosition] = useState({ lat: 30.42117447120587, lng: -9.60396195287973 });
    const [isLocationSpecify, setIsSpecify] = useState(false);
    const navigate = useNavigate();
    const { restLocation, clientLocation } = useSelector(state => state.order.order);

    const dispatch = useDispatch();
    useEffect(() => {
        if (user.userInfo) {
            setLastN(user.userInfo.lname);
            setAddress(user.userInfo.address);
            setPhone(user.userInfo.phone);
        }

        window.configMap(position);
        async function createScript() {
            try {
                const { data } = await axios.get("/api/config/googleKey");
                const script = document.createElement("script");
                script.defer = true;
                script.src = `https://maps.googleapis.com/maps/api/js?key=${data}&callback=initMap`;
                document.body.appendChild(script);
                
            } catch (err) {
                console.log(err.message)
            }
        }
        createScript();
        dispatch(addLocation(position));
        return () => {
            document.body.removeChild(document.body.lastChild);

        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, user.userInfo])

    async function getLocation() {
        try {
            const { coords } = await getPosition();
            setPosition({ lat: coords.latitude, lng: coords.longitude });
            setIsSpecify(true);

        } catch (err) {
            console.log(err.message);
            setIsSpecify(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const client = {
            fName: e.target["fName"].value,
            lName: e.target["lName"].value,
            tel: e.target["phone"].value,
            clientLocation: position,
            restLocation: restLocation,
            address: e.target["address"].value + ", Agadir 80000 Morocco",
        }
        if (!user.userInfo) {
            const infos = {
                username: name,
                userInfo: {
                    lname: lastN,
                    address: address,
                    phone: phone,
                }
            }
            dispatch(updateInfo(user._id, infos));

        }
        if (clientLocation.lat === 30.42117447120587 && clientLocation.lng === -9.60396195287973) {
            alert("Please specify your position");
        } else {
            dispatch(clientInfo(client));
            navigate("/order/payment");
        }

    }

    return <>
        <BarrGuide step1 step2 />
        <form onSubmit={handleSubmit} className="container px-4 mt-5">

            <h2 className="mb-5 text-center">Add your info</h2>

            <div className="col-8 col-md-6 mx-auto mb-3">
                <label htmlFor="fName" className="mb-2">First name:</label>
                <input type="text" className="form-control" id="fName" value={name} onChange={e => setName(e.target.value)} placeholder="Required" required />
            </div>

            <div className="col-8 col-md-6 mx-auto mb-3">
                <label htmlFor="lName" className="mb-2">Last name:</label>
                <input type="text" className="form-control" id="lName" value={lastN} onChange={e => setLastN(e.target.value)} />
            </div>

            <div className="col-8 col-md-6 mx-auto mb-3">
                <label htmlFor="phone" className="mb-2">Phone number:</label>
                <input type="tel" className="form-control" title="tel: 10 digit" pattern="[0-9]{10}" id="phone" placeholder="Required" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>

            <div className="col-8 col-md-6 mx-auto mb-3">
                <label htmlFor="city" className="mb-2">City:</label>
                <input type="text" className="form-control" value="Agadir 80000 Morocco" id="city" readOnly />
            </div>

            <div className="col-8 col-md-6 mx-auto mb-3">
                <label htmlFor="address" className="mb-2">Address:</label>
                <input type="text" className="form-control" id="address" placeholder="Required" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>

            <div className="col-8 col-md-6 mx-auto mb-3">
                {isLocationSpecify ?
                    <span className="text-success p-1" style={{ backgroundColor: "rgb(129, 224, 171, 0.5)" }}>You 're location is specify</span>
                    : <span className="text-danger p-1" style={{ backgroundColor: "rgba(233, 158, 158,0.5)" }}>You must be allow this app to access your location</span>}
                <br />
                <span className="btn btn-success mb-3" onClick={getLocation}>Click to define your location In map</span>
                <div id="map"></div>
            </div>

            <div className="float-end mt-4">
                <button type="submit" className="btn btn-primary">Next</button>
            </div>
        </form>

    </>

}

