import { useState } from 'react';
import './App.css'
import { SignupLogin } from './components/signupLogin';
import { UserContent } from './components/userContent';

const port = "http://localhost:3000"

const lsToken = localStorage.getItem("token")
let isLoggedIn = false;

if (lsToken == null || lsToken == "") {
  isLoggedIn = false
  localStorage.setItem("token", "")
}
else {
  const response = await fetch(`${port}/verify-user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "authorization": lsToken
    }
  })
  const userVerification = (await response.json()).verify == true ? true : false
  
  if (userVerification == false){
    localStorage.setItem("token", "")
  }else{
    isLoggedIn = true
  }
}


function App() {
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn)
  const [todoData, setTodoData] = useState([])

  return (
    <>
      {!isLoggedInState && <SignupLogin port={port} setIsLoggedInState={setIsLoggedInState}/>}
      {isLoggedInState && <UserContent port={port} setIsLoggedInState={setIsLoggedInState} token={lsToken}/>}
    </>
  )
}

export default App
