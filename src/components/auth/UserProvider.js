import React, { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    
    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then (res => res.json())
        .then(setUsers)
    }

    const getUserById = userId => {
        return fetch(`http://localhost:8088/users/${userId}`)
        .then (res => res.json)
    }

    const addUserToDatabase = userObj => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, getUserById, addUserToDatabase
        }}>
            {props.children}
        </UserContext.Provider>
    )
}