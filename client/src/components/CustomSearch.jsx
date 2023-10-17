import { useEffect, useState } from "react";

export default function CustomSearch({ searchParms, setSearchParams }) {
  const [search, setSearch] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(200);

  useEffect(() => {
    if (!search && typeof search !== "string") return;
    let timeId = setTimeout(() => {
      setSearchParams(
        {
          search,
          maxPrice: searchParms.get("maxPrice"),
          rating: searchParms.get("rating"),
          page: 1,
        },
        { replace: true }
      );
    }, 800);

    return () => {
      clearTimeout(timeId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (!maxPrice) return;
    let timeId = setTimeout(() => {
      setSearchParams(
        {
          search: searchParms.get("search"),
          maxPrice: maxPrice,
          rating: searchParms.get("rating"),
          page: 1,
        },
        { replace: true }
      );
    }, 800);

    return () => {
      clearTimeout(timeId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPrice]);

  return (
    <div className="p-2 bg-light col-9 col-sm-4 col-lg-3 d-flex flex-column">
      <div className="input-group mb-4">
        <input
          type="search"
          className="form-control"
          id="searchForRestaurant"
          aria-describedby="search-icon"
          placeholder="Search for a pizza"
          value={search || ""}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="input-group-text" id="search-icon">
          <i className="bi bi-search"></i>
        </span>
      </div>

      <div className="mb-2">
        <label htmlFor="priceRange" className="form-label fs-5">
          Price 0 - {maxPrice} <span className="fs-6">dh</span>
        </label>
        <input
          type="range"
          className="form-range px-3"
          id="priceRange"
          value={maxPrice}
          step="10"
          min="0"
          max="200"
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="stars"
            type="radio"
            id="stars-4"
            onClick={e =>
              setSearchParams(
                {
                  search: searchParms.get("search"),
                  maxPrice: searchParms.get("maxPrice"),
                  rating: 4,
                  page: 1,
                },
                { replace: true }
              )
            }
          />
          <label className="form-check-label" htmlFor="stars-4">
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star"></i> & Plus
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="stars"
            type="radio"
            id="stars-3"
            onClick={e =>
              setSearchParams(
                {
                  search: searchParms.get("search"),
                  maxPrice: searchParms.get("maxPrice"),
                  rating: 3,
                  page: 1,
                },
                { replace: true }
              )
            }
          />
          <label className="form-check-label" htmlFor="stars-3">
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star"></i> & Plus
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="stars"
            type="radio"
            id="stars-2"
            onClick={e =>
              setSearchParams(
                {
                  search: searchParms.get("search"),
                  maxPrice: searchParms.get("maxPrice"),
                  rating: 2,
                  page: 1,
                },
                { replace: true }
              )
            }
          />
          <label className="form-check-label" htmlFor="stars-2">
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star"></i> & Plus
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="stars"
            type="radio"
            id="stars-1"
            onClick={e =>
              setSearchParams(
                {
                  search: searchParms.get("search"),
                  maxPrice: searchParms.get("maxPrice"),
                  rating: 1,
                  page: 1,
                },
                { replace: true }
              )
            }
          />
          <label className="form-check-label" htmlFor="stars-1">
            <i className="bi bi-star-fill me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star"></i> & Plus
          </label>
        </div>
        <div className="form-check mb-5">
          <input
            className="form-check-input"
            name="stars"
            type="radio"
            id="stars-0"
            onClick={e =>
              setSearchParams(
                {
                  search: searchParms.get("search"),
                  maxPrice: searchParms.get("maxPrice"),
                  rating: 0,
                  page: 1,
                },
                { replace: true }
              )
            }
          />
          <label className="form-check-label" htmlFor="stars-0">
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star me-1"></i>
            <i className="bi bi-star me-1"></i> All
          </label>
        </div>
      </div>
    </div>
  );
}
