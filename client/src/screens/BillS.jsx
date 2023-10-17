import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function BillS() {
  const axiosPrivate = useAxiosPrivate();

  const [orderH, setOrder] = useState();
  const { order } = useSelector(state => state.order);

  const orderId = useParams().orderId;

  useEffect(() => {
    if (!order) {
      async function getOrder() {
        const { data } = await axiosPrivate.get(
          `/api/order/invoice/${orderId}`
        );
        setOrder(data);
      }
      getOrder();
    } else {
      setOrder(order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <>
      {!order && <Header />}
      {orderH && (
        <div className="container mt-5">
          <h2>Invoice</h2>
          <div className="row g-0 justify-content-between my-5 border-bottom border-3 border-danger">
            <div className="col-8 col-md-4 mb-3">
              <h5 className="text-secondary bg-light">Ordered by</h5>
              <p className="mb-0">
                {orderH.clientInfo.fName + " " + orderH.clientInfo.lName}
              </p>
              <p>{orderH.clientInfo.address}</p>
            </div>
            <div className="col-8 col-md-4 mb-3">
              <div>
                <h5 className="text-secondary bg-light">Invoice Number</h5>
                <p>{orderH._id}</p>
              </div>
              <div>
                <h5 className="text-secondary bg-light">Date of issue</h5>
                <p>{orderH.time}</p>
              </div>
            </div>
            <div className="col-8 col-md-3 mb-3 text-md-end">
              <h5 className="text-secondary bg-light">Invoice Totale</h5>
              {orderH.isPay ? (
                <p className="display-6 text-success">Paid</p>
              ) : (
                <p className="display-6 text-success">{orderH.totalePrice}dh</p>
              )}
              {orderH.isDelivered ? (
                <span className="text-success">Delivered</span>
              ) : (
                <span>In delivery</span>
              )}
            </div>
          </div>

          <h4>{orderH.restaurantName}</h4>
          <br />
          <table>
            <thead className="bg-light">
              <tr>
                <th>Description</th>
                <th>Unit cost</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderH.pizzaSelected.map((item, id) => (
                <tr key={id} className="border-bottom">
                  <td>
                    <div
                      className="modal fade"
                      id={`_${id}`}
                      tabIndex="-1"
                      aria-labelledby="PizzaImage"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">{item.type}</h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <img
                              className="img-fluid"
                              src={item.itemImg}
                              alt={item.type}
                            ></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target={`#_${id}`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td>{item.priceOfOne}dh</td>
                  <td>{item.amount}</td>
                  <td>{item.priceOfAll}dh</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center justify-content-md-end">
            <div className="p-3 fw-bold">
              Totale Price : {orderH.totalePrice}dh
            </div>
          </div>
          <Link to="/" className="btn btn-primary float-end mt-5">
            Home
          </Link>
        </div>
      )}{" "}
    </>
  );
}
