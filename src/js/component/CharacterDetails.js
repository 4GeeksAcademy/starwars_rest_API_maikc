// src/component/CharacterDetails.js
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context);
    const { category, uid } = useParams();
    const [character, setCharacter] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                let characterData = null;
                if (category === "people") {
                    characterData = await actions.getPeople(uid);
                } else if (category === "planets") {
                    characterData = await actions.getPlanets(uid);
                } else if (category === "species") {
                    characterData = await actions.getSpecies(uid);
                }
                setCharacter(characterData);
                setImageUrl(`https://starwars-visualguide.com/assets/img/${category}/${uid}.jpg`);
            } catch (error) {
                console.error("Error fetching character details:", error);
            }
        };
        fetchCharacterDetails();
    }, [actions, category, uid]);

    if (!character) {
        return <div>Loading...</div>;
    }

    const onImageError = (event) => {
        event.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    };

    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={imageUrl} onError={onImageError} className="img-fluid rounded-start" alt={character.name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{character.name}</h5>
                        <p className="card-text">
                            {category === "people" && (
                                <>
                                    <strong>Height:</strong> {character.height} cm<br />
                                    <strong>Mass:</strong> {character.mass} kg<br />
                                    <strong>Hair Color:</strong> {character.hair_color}<br />
                                    <strong>Skin Color:</strong> {character.skin_color}<br />
                                    <strong>Eye Color:</strong> {character.eye_color}<br />
                                    <strong>Birth Year:</strong> {character.birth_year}<br />
                                    <strong>Gender:</strong> {character.gender}
                                </>
                            )}
                            {category === "planets" && (
                                <>
                                    <strong>Climate:</strong> {character.climate}<br />
                                    <strong>Diameter:</strong> {character.diameter} km<br />
                                    <strong>Population:</strong> {character.population}<br />
                                    <strong>Gravity:</strong> {character.gravity}<br />
                                    <strong>Terrain:</strong> {character.terrain}
                                </>
                            )}
                            {category === "species" && (
                                <>
                                    <strong>Classification:</strong> {character.classification}<br />
                                    <strong>Designation:</strong> {character.designation}<br />
                                    <strong>Language:</strong> {character.language}<br />
                                    <strong>Average Lifespan:</strong> {character.average_lifespan} years
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
