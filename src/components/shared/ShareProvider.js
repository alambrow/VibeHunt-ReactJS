import React, { useState, createContext } from "react";

export const ShareContext = createContext()

export const ShareProvider = (props) => {
    const [shares, setShares ] = useState([])

    const addShare = shareObj => {
        return fetch("http://localhost:8088/sharedVenues", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shareObj)
        })
        .then(getShares)
    }

    const getShares = () => {
        return fetch("http://localhost:8088/sharedVenues")
        .then(res => res.json())
        .then(setShares)
    }

    const removeShare = shareId => {
        return fetch(`http://localhost:8088/sharedVenues/${shareId}`, {
            method: "DELETE"
        })
        .then(getShares)
    }

    return (
        <ShareContext.Provider value={{
            shares, getShares, addShare, removeShare
        }}>
            {props.children}
        </ShareContext.Provider>
    )
}