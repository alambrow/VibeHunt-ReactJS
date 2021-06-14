import React, { useContext, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { UserContext } from "./UserProvider"

export const Register = (props) => {
    const history = useHistory()
    
    const { users, getUsers, addUserToDatabase } = useContext(UserContext)
    
    useEffect(() => {
        getUsers()
    }, [])
    
    const HandleRegister = (e) => {
        e.preventDefault()
        
        const userName = document.querySelector("input[name='email']").value
        const userEmail = document.querySelector("input[name='userName']").value

        for (let i = 0; i < users.length; i++) {
            if (users[i].userName === userName || users[i].userEmail === userEmail) {
                alert("User with that name and/or email address already exists.")
                return
            }
        }


        const newId = (users.length + 1)
        addUserToDatabase({
            id: newId,
            userEmail: document.querySelector("input[name='email']").value,
            userName: document.querySelector("input[name='userName']").value
        })
        alert("Thank you for registering!")
        localStorage.setItem("vibehunt_memberId", newId)
        history.push("/")
    }


    return (
        <main >


            <form className="form--login" onSubmit={HandleRegister}>
                <h1 className="register__banner">Register for VibeHunt</h1>
                <fieldset>
                    <input type="text" name="userName" className="form-control" placeholder="User name" required autoFocus />
                </fieldset>
                <fieldset>
                    <input type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <button type="submit"> Sign in </button>
            </form>
        </main>
    )
}