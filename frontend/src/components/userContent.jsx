import '../css/userContent.css'
import LogoutLogo from "../assets/logout.svg"
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AllTodos } from './AllTodos';

export function UserContent(props) {
    const [todos, setTodos] = useState([])

    async function newTodoRequest(titleInput, descriptionInput) {
        if (titleInput != "" && descriptionInput != "") {
            const response = await (await fetch(`${props.port}/new-todo`, {
                method: "POST",
                body: JSON.stringify({
                    "title": titleInput,
                    "description": descriptionInput
                }),
                headers: {
                    "Content-type": "application/json",
                    "authorization": props.token
                }
            })).json()
            setTodos([{title: response.title, description: response.description, isCompleted: response.isCompleted, uuid: response.uuid}, ...todos])
            alert("Added Todo")
        }
    }

    return <div id='container'>
        <div id="navbar">
            <div>{localStorage.getItem("username")}</div>
            <div><img src={LogoutLogo} alt="Logout" onClick={() => {
                localStorage.setItem("token", "")
                localStorage.setItem("username", "")
                props.setIsLoggedInState(false)
            }} /></div>
        </div>

        <div id="addingNewTodos">
            <input type="text" name="" id="todoTitleInput" placeholder='Todo Title' />
            <input type="text" name="" id="todoDescriptionInput" placeholder='Todo Description' />
            <button onClick={() => {

                newTodoRequest(
                    document.querySelector("#todoTitleInput").value,
                    document.querySelector("#todoDescriptionInput").value
                )

            }}>Save</button>
        </div>

        <div id="allTodos">
            <AllTodos port={props.port} token={props.token} todos={todos} setTodos={setTodos}/>
        </div>
    </div>
}