import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserProvider";
import "./Login.css"


export const Login = (props) => {
    const history = useHistory()
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()

        const userEmail = document.querySelector("input[name='email']").value
        const userName = document.querySelector("input[name='userName']").value

        for (let i = 0; i < users.length; i++) {
            if (users[i].userName === userName && users[i].userEmail === userEmail) {
                localStorage.setItem("vibehunt_memberId", users[i].id)
                history.push("/")
                return
            }
        }

        document.querySelector("#userName").style.background = "#fc7878"
        document.querySelector("#email").style.background = "#fc7878"
        alert("Please enter a registered user name and email address.")
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h2>Sign in</h2>
                    <h3>Note: This website does not use secure authentication. Your account is not password protected.</h3>
                    <fieldset>
                    <input name="userName"
                            id="userName"
                            className="form-control"
                            placeholder="User name"
                            required autoFocus />
                        <input name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}