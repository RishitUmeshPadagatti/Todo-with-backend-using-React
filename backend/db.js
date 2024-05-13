const mongoose = require("mongoose")
const { DB_CONNECTION_STRING } = require("./config")

mongoose.connect(DB_CONNECTION_STRING)

const userToDoSchema = mongoose.Schema({
    username: String, 
    password: String,
    todos: [{
        title: String,
        description: String,
        isCompleted: Boolean,
        uuid: String
    }]
})

const userToDoData = mongoose.model("userData", userToDoSchema)

module.exports = {
    userToDoData
}