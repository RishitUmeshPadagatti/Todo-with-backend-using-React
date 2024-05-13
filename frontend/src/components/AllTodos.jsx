import { useEffect, useState } from "react";
import { TodoComponent } from "./TodoComponent";
import '../css/AllTodos.css'

export function AllTodos(props) {
    useEffect(() => {
        fetch(`${props.port}/todos`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
            .then(async function (res) {
                const json = await res.json();
                props.setTodos(json)
            })
    }, [])

    return <div id="allTodosComponent">
        {props.todos.map((element)=>{
            return <TodoComponent key={element.uuid} title={element.title} description={element.description}/>
        })}
    </div>
}