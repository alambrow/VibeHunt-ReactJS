import { getUsers } from "../data/provider.js"
import { registrationForm } from "./Register.js"


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null
        const userState = getUsers()

        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value

        if (email === "") {
            const inputField = document.querySelector(".user_email")
            inputField.style.background = "#fc7878"
            alert("Please input data in all fields")
            return
        }

        if (password === "") {
            const inputField = document.querySelector(".user_password")
            inputField.style.background = "#fc7878"
            alert("Please input data in all fields")
            return
        }

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user
            }
        }
        // saves the userId in local storage in local memory (associated with Chrome)
        // dispatches customEvent to eventListener on main ("stateChanged")
        if (foundUser !== null) {
            localStorage.setItem("gg_user", foundUser.id)
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
})

export const LoginForm = () => {
    return `
        <div class="loginForm">
                <form class="registerFlex">
                    <fieldset class="registerInput">
                        <label for="email">Email:</label>
                        <input type="text" class="user_email" name="email" autofocus placeholder=" Email address" />
                    </fieldset>
                </form>
            <button id="loginButton">Login</button>
        </div>
        ${registrationForm()}
    `
}