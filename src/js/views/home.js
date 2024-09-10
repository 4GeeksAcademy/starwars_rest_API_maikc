// src/views/Home.js
import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Card from "../component/card";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            await actions.swapiFetch("people");
            await actions.swapiFetch("species");
            await actions.swapiFetch("planets");
        };
        fetchData();
    }, [actions]);

    return (
        <div className="container">
            <h2>People</h2>
            <div className="scroll-container d-flex">
                {store.people.map((person, index) => (
                    <div key={index} className="card-container">
                        <Card
                            name={person.name}
                            birthYear={person.birth_year}
                            height={person.height}
                            gender={person.gender}
                            uid={person.uid}
                            category="people"
                        />
                    </div>
                ))}
            </div>

            <h2>Species</h2>
            <div className="scroll-container d-flex">
                {store.species.map((species, index) => (
                    <div key={index} className="card-container">
                        <Card
                            name={species.name}
                            classification={species.classification}
                            designation={species.designation}
                            language={species.language}
                            uid={species.uid}
                            category="species"
                        />
                    </div>
                ))}
            </div>

            <h2>Planets</h2>
            <div className="scroll-container d-flex">
                {store.planets.map((planet, index) => (
                    <div key={index} className="card-container">
                        <Card
                            name={planet.name}
                            climate={planet.climate}
                            diameter={planet.diameter}
                            population={planet.population}
                            uid={planet.uid}
                            category="planets"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
