import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import CustomSearch from "../components/CustomSearch";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../reduxjs/reducers/suggestionsSlice";
import Layout from "../components/Layout";

export default function HomeS() {
  const [searchParms, setSearchParams] = useSearchParams({
    search: "",
    maxPrice: 200,
    rating: 0,
    page: 1,
  });
  const { restaurants, total, loading } = useSelector(
    state => state.restaurants
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const query = `search=${searchParms.get(
      "search"
    )}&maxPrice=${searchParms.get("maxPrice")}&rating=${searchParms.get(
      "rating"
    )}&page=${searchParms.get("page")}`;
    dispatch(getRestaurants(query));
  }, [searchParms, dispatch]);

  const navigateTo = step => {
    let page = parseInt(searchParms.get("page")) + step;
    let totalItem = Math.floor(total / 6) + (total % 6 > 0 ? 1 : 0);
    if (page < 1 || page > totalItem) return;

    setSearchParams(
      {
        search: searchParms.get("search"),
        maxPrice: searchParms.get("maxPrice"),
        rating: searchParms.get("rating"),
        page,
      },
      { replace: true }
    );
  };

  return (
    <>
      <Layout isForHome />

      <div className="restaurant text-center mx-auto my-5">
        <h2>
          <img src="/imgs/dish.png" alt="dish-icon"></img> Restaurants
        </h2>
      </div>

      <div className="row px-3 g-0 justify-content-center mt-5">
        <CustomSearch
          searchParms={searchParms}
          setSearchParams={setSearchParams}
        />
        <div className="col-12 col-sm-8 col-lg-9 d-flex flex-wrap mt-4 m-sm-auto align-items-center justify-content-center">
          {loading ? (
            <div className="spinner-border text-primary" role="status" />
          ) : restaurants ? (
            restaurants.map(element => (
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
            <li
              className={`page-item ${
                searchParms.get("page") === "1" && "disabled"
              }`}
            >
              <button className="page-link" onClick={() => navigateTo(-1)}>
                Previous
              </button>
            </li>
            <li className="page-item active">
              <span className="page-link">{searchParms.get("page")}</span>
            </li>
            <li
              className={`page-item ${
                parseInt(searchParms.get("page")) ===
                  Math.floor(total / 6) + (total % 6 > 0 ? 1 : 0) && "disabled"
              }`}
            >
              <button className="page-link" onClick={() => navigateTo(1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
