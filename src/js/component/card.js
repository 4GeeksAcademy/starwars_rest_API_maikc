// src/component/Card.js
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = (props) => {
    const { store, actions } = useContext(Context);
    const isFavorite = store.fav.some(fav => fav.uid === props.uid && fav.category === props.category);

    const handleAddToFavorites = () => {
        actions.addFavorite({
            name: props.name,
            uid: props.uid,
            category: props.category
        });
    };

    const imageUrl = `https://starwars-visualguide.com/assets/img/${props.category}/${props.uid}.jpg`;

    const onImageError = (event) => {
        event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    };

    return (
        <div className="card" style={{ width: "12rem" }}>
            <img src={imageUrl} onError={onImageError} className="card-img-top" alt={props.name} />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">
                    {props.birthYear && (
                        <span>
                            Birth Year: {props.birthYear}
                            <br />
                        </span>
                    )}
                    {props.height && (
                        <span>
                            Height: {props.height}
                            <br />
                        </span>
                    )}
                    {props.gender && (
                        <span>
                            Gender: {props.gender}
                            <br />
                        </span>
                    )}
                    {props.language && (
                        <span>
                            Language: {props.language}
                            <br />
                        </span>
                    )}
                    {props.climate && (
                        <span>
                            Climate: {props.climate}
                            <br />
                        </span>
                    )}
                    {props.diameter && (
                        <span>
                            Diameter: {props.diameter}
                            <br />
                        </span>
                    )}
                    {props.population && (
                        <span>
                            Population: {props.population}
                            <br />
                        </span>
                    )}
                </p>
                <Link to={`/characterDetail/${props.category}/${props.uid}`} className="btn btn-primary">
                    Go to info
                </Link>
                <button
                    className={`btn btn-warning ${isFavorite ? 'active' : ''}`}
                    onClick={handleAddToFavorites}
                >
                    <i className="fa fa-heart"></i>
                </button>
            </div>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string.isRequired,
    birthYear: PropTypes.string,
    height: PropTypes.string,
    gender: PropTypes.string,
    language: PropTypes.string,
    climate: PropTypes.string,
    diameter: PropTypes.string,
    population: PropTypes.string,
    uid: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
};

export default Card;
