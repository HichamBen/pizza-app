import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { parse } from "query-string";
import { useSelector } from "react-redux";
export default function PizzaRow({ item, id }) {
  const [searchParms, setSearchParms] = useSearchParams();
  const { order } = useSelector(state => state.order);
  const [itemsPrice, setItemsPrice] = useState(
    Number(searchParms.get("item_" + id))
  );
  const [amount, setAmount] = useState(
    Number(searchParms.get("item_" + id)) / item.price
  );

  const parsed = parse(useLocation().search);
  useEffect(() => {
    setItemsPrice(amount * item.price);
    setSearchParms(
      { ...parsed, ["item_" + id]: amount * item.price },
      { replace: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, order]);

  return (
    <div className="row align-items-center justify-content-between bg-light mb-3 p-2 g-0">
      <div className="col-5">
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
                <img className="img-fluid" src={item.img} alt={item.type}></img>
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
      </div>
      <span className="col-1">{item.price}dh</span>
      <select
        aria-label="Select Amount"
        value={amount}
        className="col-2 col-sm-1"
        onChange={e => setAmount(e.target.value)}
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <span className="col-1 col-sm-2 text-success fs-5 fs-sm-6">
        {itemsPrice}dh
      </span>
    </div>
  );
}
