const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const { JWT_PASSWORD } = require("./config");
const { authenticationMiddleware } = require("./authenticationMiddleware");
const { parsingMiddlewareZod } = require("./parsingMiddlewareZod");
const { userToDoData } = require("./db");
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.json())

// creates a new user and sends a jwt
app.post("/new-user", parsingMiddlewareZod ,async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const data = await userToDoData.find({username: username})
    if (data.length == 0){

        await userToDoData.create({
            username: username,
            password: password,
            todos: []
        })
        
        const token = jwt.sign({username: username}, JWT_PASSWORD, {expiresIn: '7d'})
        res.status(200).json({msg: "User Created", token: token, success: true})
    }
    else{
        res.status(403).json({msg: "User Already Exists", success: false})
    }
    
})

// for users to login. returns a jwt token
app.post("/login", async(req, res) => {
    const username = req.headers.username
    const password = req.headers.password

    const data = await userToDoData.findOne({username: username, password: password}, {expiresIn: '7d'})

    if (data){
        const token = jwt.sign({username: username}, JWT_PASSWORD)
        res.status(200).json({msg: "User Logged In", token: token, verify: true})
    } else{
        res.status(404).json({msg: "Invalid Username or Password", verify: false})
    }

})

app.post("/user-exists-or-not", async(req, res) => {
    const username = req.body.username

    const data = await userToDoData.find({username: username})
    if (data.length == 0){
        res.status(200).json({msg: "User Doesn't Exist", userExistsOrNot: false})
    } 
    else if (data.length == 1){
        res.status(200).json({msg: "User Exists", userExistsOrNot: true})
    }
    else{
        res.status(404).json({msg: "Internal Database Error"})
    }
})

app.use(authenticationMiddleware)

app.get("/verify-user", async(req, res) => {
    res.status(200).json({verify: true})
})

// create a new todo
app.post("/new-todo", async(req, res)=>{

    const username = req.headers.username
    const uuid = uuidv4()
    const newData = {
        title: req.body.title,
        description: req.body.description,
        isCompleted: false,
        uuid: uuid
    }

    await userToDoData.updateOne({username: username}, {
        "$push": {
            todos: { "$each": [newData], "$position": 0 } 
        }
    })

    res.status(200).json({msg: "ToDo Created", uuid: uuid})
})

// get all the todos
app.get("/todos", async(req, res) => {
    const username = req.headers.username
    const todos = (await userToDoData.findOne({username: username})).todos
    res.status(200).json(todos)
})

// toggle a todo as completed/not-completed
app.put("/todo/:uuid/:trueorfalse", async(req, res) => {
    const username = req.headers.username
    const uuid = req.params.uuid
    const trueorfalse = req.params.trueorfalse === "false" ? false : true;

    const event = await userToDoData.updateOne(
        { username: username ,"todos.uuid": uuid },
        { $set: { "todos.$.isCompleted": trueorfalse } }
    );

    if (event.matchedCount == 0){
        res.status(404).json({msg: "Todo not found"})
    }
    else{
        res.status(200).json({msg: "Todo updated"})
    }
})

app.listen(3000)