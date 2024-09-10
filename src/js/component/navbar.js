import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-black mb-3">
      <Link to="/">
        <img
          className="logo"
          src="https://static.wikia.nocookie.net/starwars/images/c/cc/Star-wars-logo-new-tall.jpg/revision/latest/scale-to-width-down/1200?cb=20190313021755"
          alt="logo"
        />
      </Link>
      <div className="ml-auto">
        <div className="btn-group">
          <button
            className="btn btn-warning dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favs <i className="fa fa-duotone fa-heart" /> {store.fav.length}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.fav.length === 0 && <li className="dropdown-item">No favorites added</li>}
            {store.fav.map((item, index) => (
              <li key={index} className="dropdown-item">
                <Link to={`/details/${item.category}/${item.uid}`}>
                  {item.name}
                </Link>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => actions.removeFavorite(item)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
