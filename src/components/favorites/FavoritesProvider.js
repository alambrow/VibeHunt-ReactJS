import React, { useState, createContext } from "react";

export const FavoritesContext = createContext()

// TODO: finish favorites provider
export const FavoritesProvider = (props) => {

    const [favorites, setFavorites] = useState([])

    const getFavorites = () => {
        return fetch("http://localhost:8088/userFavorites")
        .then(res => res.json())
        .then(setFavorites)
    }

    const addVenueToFavorites = favObj => {
        return fetch("http://localhost:8088/userFavorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favObj)
        })
        .then(getFavorites)
    }

    const removeFavorite = favoriteId => {
        return fetch(`http://localhost:8088/userFavorites/${favoriteId}`, {
            method: "DELETE"
        })
        .then(getFavorites)
    }

    return (
        <FavoritesContext.Provider value={{
            favorites, getFavorites, addVenueToFavorites, removeFavorite
        }}>
            {props.children}
        </FavoritesContext.Provider>
    )
}

