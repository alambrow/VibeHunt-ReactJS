import React, { useContext, useEffect } from "react"
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
        <>
        <nav className="nav_bar">
            <div className="vibehunt_title">
                VibeHunt
            </div>
        </nav>
        <div className="form--login">
            <form  onSubmit={HandleRegister}>
                <div className="signIn_banner">Register for VibeHunt</div>
                <div className="login_flex">
                    <input type="text" name="userName" className="form-control" placeholder="User name" required autoFocus />
                    <input type="email" name="email" className="form-control" placeholder="Email address" required />
                </div>
                <button type="submit"> Register </button>
            </form>
        </div>
        </>
    )
}