import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const { isAuth } = useSelector(state => state.user.userData);
  const navigate = useNavigate();

  function handleClick() {
    if (isAuth) {
      navigate(`/order/${props.id}`);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="card ms-4 mb-4" style={{ width: "16rem" }}>
      <img
        src={props.img}
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="card-img-top"
        height="225"
        alt={props.type}
      />
      <div className="card-body">
        <h5 className="card-title">{props.restaurant}</h5>
        <div className="card-text">
          <p className="mb-1">
            {props.rating >= 1 ? (
              <i className="bi bi-star-fill me-1"></i>
            ) : props.rating >= 0.5 ? (
              <i className="bi bi-star-half me-1"></i>
            ) : (
              <i className="bi bi-star"></i>
            )}
            {props.rating >= 2 ? (
              <i className="bi bi-star-fill me-1"></i>
            ) : props.rating >= 1.5 ? (
              <i className="bi bi-star-half me-1"></i>
            ) : (
              <i className="bi bi-star"></i>
            )}
            {props.rating >= 3 ? (
              <i className="bi bi-star-fill me-1"></i>
            ) : props.rating >= 2.5 ? (
              <i className="bi bi-star-half me-1"></i>
            ) : (
              <i className="bi bi-star"></i>
            )}
            {props.rating >= 4 ? (
              <i className="bi bi-star-fill me-1"></i>
            ) : props.rating >= 3.5 ? (
              <i className="bi bi-star-half me-1"></i>
            ) : (
              <i className="bi bi-star"></i>
            )}
            {props.rating >= 5 ? (
              <i className="bi bi-star-fill me-1"></i>
            ) : props.rating >= 4.5 ? (
              <i className="bi bi-star-half me-1"></i>
            ) : (
              <i className="bi bi-star"></i>
            )}{" "}
            {props.reviews} reviews
          </p>
          <h4>
            {props.price[0]}-{props.price[1]} dh
          </h4>
        </div>
        <button className="btn btn-primary float-end" onClick={handleClick}>
          Make order
        </button>
      </div>
    </div>
  );
}
