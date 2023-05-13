import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import CustomSearch from "../components/CustomSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurants,
  HoldSuggestionsRestaurants,
} from "../reduxjs/reducers/suggestionsSlice";
import { clearOrder } from "../reduxjs/reducers/orderSlice";
import HomeHeader from "../components/HomeHeader";
import Header from "../components/Header";

export default function HomeS() {
  const [page, setPage] = useState(1);
  const [searchParms] = useSearchParams();
  const restaurants = useSelector(
    state => state.restaurants.restaurantsRendered
  );
  const dataLength = useSelector(state => state.restaurants.dataLength);
  const { isAuth } = useSelector(state => state.user.userData);
  const { order } = useSelector(state => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (order) dispatch(clearOrder());
    if (
      [...searchParms].length === 0 ||
      (!searchParms.get("restaurant") &&
        searchParms.get("range") === "200" &&
        searchParms.get("rating") === "0")
    ) {
      dispatch(getRestaurants());
    } else {
      dispatch(HoldSuggestionsRestaurants(...searchParms));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParms, dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [searchParms]);

  return (
    <>
      {isAuth ? <Header /> : <HomeHeader />}

      <div className="restaurant text-center mx-auto my-5">
        <h2>
          <img src="/imgs/dish.png" alt="dish-icon"></img> Restaurants
        </h2>
      </div>

      <div className="row px-3 g-0 justify-content-center mt-5">
        <CustomSearch />
        <div className="col-12 col-sm-8 col-lg-9 d-flex flex-wrap mt-4 m-sm-auto align-items-center justify-content-center">
          {restaurants.length > 0 ? (
            restaurants
              .filter((element, id) => {
                if (id + 1 > (page - 1) * 6) {
                  if (id + 1 <= page * 6) {
                    return element;
                  }
                }
                return false;
              })
              .map(element => (
                <Card
                  key={element._id}
                  id={element._id}
                  restaurant={element.restaurant}
                  rating={element.rating}
                  img={element.img}
                  type={element.pizza[0].type}
                  price={element.priceRange}
                  reviews={element.reviews}
                />
              ))
          ) : (
            <h3>No Result</h3>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-end me-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() =>
                  setPage(prev => {
                    if (dataLength === 0) return 1;
                    if (dataLength % 6 === 0) {
                      //   pages = dataLength/6
                      if (prev === 1) return dataLength / 6;
                      else return page - 1;
                    } else {
                      //   pages = dataLength/6 +1
                      if (prev === 1) return Math.floor(dataLength / 6) + 1;
                      else return page - 1;
                    }
                  })
                }
              >
                Previous
              </button>
            </li>
            <li className="page-item active">
              <span className="page-link">{page}</span>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() =>
                  setPage(prev => {
                    if (dataLength === 0) return 1;
                    if (dataLength % 6 === 0) {
                      //   pages  dataLength/6
                      if (prev === dataLength / 6) return 1;
                      else return page + 1;
                    } else {
                      //   pages  dataLength/6 +1
                      if (prev === Math.floor(dataLength / 6 + 1)) return 1;
                      else return page + 1;
                    }
                  })
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
