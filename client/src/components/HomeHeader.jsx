import { Link } from "react-router-dom";

export default function HomeHeader() {

    return <> <header className="pt-3 px-0">
        <nav className="navbar navbar-expand-sm navbar-light px-5">
            <Link to="/" className="navbar-brand">Pizza</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#slideContent" aria-controls="slideContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse justify-content-end text-center mt-4 mt-sm-0" id="slideContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/login" className="navbar-link login py-2 px-5 text-decoration-none">Get started</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="row justify-content-center align-items-center g-5 m-0 px-5 py-2">
            <div className="col-12 col-sm-10 col-md-5">
                <img src="/imgs/pizza.jpg" alt="pizza-img" className="img-fluid"></img>
            </div>
            <div className="col-12 col-md-4 text-md-end text-center">
                <h2 className="display-6">Instantly 🔥hot and 😋delicious pizza</h2>
            </div>
        </div>
    </header>
        <div className="header_foot mb-3"></div>
    </>

}