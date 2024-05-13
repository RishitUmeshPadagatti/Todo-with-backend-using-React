import '../css/signupLogin.css'
import { z } from "zod";
import { usernameSchema, passwordSchema } from "../schemas.js";

export function SignupLogin(props) {

    async function loginRequest(username, password) {
        const response = await (await fetch(`${props.port}/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "username": username,
                "password": password
            }
        })).json()
        const responseVerification = response.verify
        const responseToken = response.token

        if (responseVerification) {
            localStorage.setItem("token", `Bearer ${responseToken}`)
            localStorage.setItem("username", username)
            props.setIsLoggedInState(true)
        } else {
            alert("Wrong Credentials")
        }
    }

    async function signUpRequest(username, password) {

        const usernameResult = usernameSchema.safeParse(username)
        const passwordResult = passwordSchema.safeParse(password)

        if (usernameResult.success && passwordResult.success) {
            const ifUserExistsOrNot = (await (await fetch(`${props.port}/user-exists-or-not`, {
                method: "POST",
                body: JSON.stringify({
                    "username": username
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })).json()).userExistsOrNot
    

            if (ifUserExistsOrNot == false) {
                const response = await (await fetch(`${props.port}/new-user`, {
                    method: "POST",
                    body: JSON.stringify({
                        "username": username,
                        "password": password
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })).json()
                const responseToken = response.token
                localStorage.setItem("token", `Bearer ${responseToken}`)
                localStorage.setItem("username", username)
                props.setIsLoggedInState(true)
            }
            else {
                alert("User Already Exists")
            }
        } 
        else {
            if (!usernameResult.success) {
                alert(JSON.parse(usernameResult.error.message)[0].message);
            }
            else if (!passwordResult.success) {
                alert(JSON.parse(passwordResult.error.message)[0].message);
            }
        }

    }

    return <div id="main" >
        <div id='loginSignupContainer'>
            <input type="text" name="" id="usernameInput" placeholder='Username' className='inputStyles ' />

            <input type="password" name="" id="passwordInput" placeholder='Password' className='inputStyles passwordStyles' />

            <button className='inputStyles loginStyles' onClick={() => {
                loginRequest(
                    document.querySelector("#usernameInput").value,
                    document.querySelector("#passwordInput").value
                )
            }}>Login</button>

            <button className='inputStyles signUpStyles' onClick={() => {
                signUpRequest(
                    document.querySelector("#usernameInput").value,
                    document.querySelector("#passwordInput").value
                )
            }}>Sign Up</button>
        </div>
    </div>
}