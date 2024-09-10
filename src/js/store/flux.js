// src/store/flux.js
const getState = ({ getStore, getActions, setStore }) => {
  const apiUrl = "https://www.swapi.tech/api";
  return {
      store: {
          people: [],
          planets: [],
          species: [],
          fav: []
      },
      actions: {
          swapiFetch: async (item) => {
              try {
                  const response = await fetch(`${apiUrl}/${item}`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  setStore({ [item]: data.results });
                  return data.results;
              } catch (error) {
                  console.error("Error en swapiFetch:", error);
              }
          },
          getPeople: async (uid) => {
              try {
                  const response = await fetch(`${apiUrl}/people/${uid}`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  return data.result.properties;
              } catch (error) {
                  console.error("Error en getPeople:", error);
              }
          },
          getSpecies: async (uid) => {
              try {
                  const response = await fetch(`${apiUrl}/species/${uid}`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  return data.result.properties;
              } catch (error) {
                  console.error("Error en getSpecies:", error);
              }
          },
          getPlanets: async (uid) => {
              try {
                  const response = await fetch(`${apiUrl}/planets/${uid}`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  return data.result.properties;
              } catch (error) {
                  console.error("Error en getPlanets:", error);
              }
          },
          addFavorite: (item) => {
              const store = getStore();
              const favIndex = store.fav.findIndex(fav => fav.uid === item.uid && fav.category === item.category);
              let newFavList = [...store.fav];
              if (favIndex >= 0) {
                  newFavList.splice(favIndex, 1);
              } else {
                  newFavList.push(item);
              }
              setStore({ fav: newFavList });
          },
          removeFavorite: (item) => {
              const store = getStore();
              const newFavList = store.fav.filter(fav => !(fav.uid === item.uid && fav.category === item.category));
              setStore({ fav: newFavList });
          }
      }
  };
};

export default getState;
