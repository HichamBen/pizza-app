import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function CustomSearch() {
    const [priceRange, setPrice] = useState(200);
    const [searchParms, setSearchParms] = useSearchParams({ restaurant: "", rating: 0 });


    useEffect(() => {
        setSearchParms({ restaurant: searchParms.get("restaurant"), range: priceRange, rating: searchParms.get("rating") })

    }, [priceRange, searchParms, setSearchParms])


    return (<div className="p-2 bg-light col-9 col-sm-4 col-lg-3 d-flex flex-column">
        <div className="input-group mb-4">
            <input type="search" className="form-control" id="searchForRestaurant"
                aria-describedby="search-icon"
                placeholder="Search for a restaurant"
                value={searchParms.get("restaurant") || ""}
                onChange={(e) => setSearchParms({ restaurant: e.target.value, range: priceRange, rating: searchParms.get("rating") })}
            />
            <span className="input-group-text" id="search-icon"><i className="bi bi-search"></i></span>
        </div>

        <div className="mb-2">
            <label htmlFor="priceRange" className="form-label fs-5">Price [0 - {priceRange}] <span className="fs-6">dh</span></label>
            <input type="range" className="form-range px-3" id="priceRange" value={priceRange} step="25" min="0" max="200" onChange={e => setPrice(e.target.value)} />
        </div>

        <div>
            <div className="form-check">
                <input className="form-check-input" name="stars" type="radio" id="stars-4" onClick={e => setSearchParms({ restaurant: searchParms.get("restaurant"), range: priceRange, rating: 4 })} />
                <label className="form-check-label" htmlFor="stars-4">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star"></i> & Plus
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" name="stars" type="radio" id="stars-3" onClick={e => setSearchParms({ restaurant: searchParms.get("restaurant"), range: priceRange, rating: 3 })} />
                <label className="form-check-label" htmlFor="stars-3">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star"></i> & Plus
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" name="stars" type="radio" id="stars-2" onClick={e => setSearchParms({ restaurant: searchParms.get("restaurant"), range: priceRange, rating: 2 })} />
                <label className="form-check-label" htmlFor="stars-2">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star"></i> & Plus
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" name="stars" type="radio" id="stars-1" onClick={e => setSearchParms({ restaurant: searchParms.get("restaurant"), range: priceRange, rating: 1 })} />
                <label className="form-check-label" htmlFor="stars-1">
                    <i className="bi bi-star-fill me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star"></i> & Plus
                </label>
            </div>
            <div className="form-check mb-5">
                <input className="form-check-input" name="stars" type="radio" id="stars-0" onClick={e => setSearchParms({ restaurant: searchParms.get("restaurant"), range: priceRange, rating: 0 })} />
                <label className="form-check-label" htmlFor="stars-0">
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star me-1"></i>
                    <i className="bi bi-star me-1"></i> All
                </label>
            </div>
        </div>
    </div>)
}