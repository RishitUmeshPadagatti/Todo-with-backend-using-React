const jwt = require("jsonwebtoken")
const { JWT_PASSWORD } = require("./config")

function authenticationMiddleware(req, res, next) {
    const receivedToken = req.headers.authorization.split(" ")[1]

    try{
        const data = jwt.verify(receivedToken, JWT_PASSWORD)
        req.headers.username = data.username
        next()
    } catch{
        res.status(404).json({msg: "Invalid login"})
    }
}

module.exports={authenticationMiddleware}