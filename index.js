const express = require("express")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const app = express()
const port = 8080
const data = require("./data/data.json")
const secret = "willzimeosegredo"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, (req, res) => console.log(`server running on port ${port}`))

app.post("/login", (req, res) => {
    for (let user of data) {
        if (req.body.name === user.name && req.body.pswd === user.pswd) {
            // auth === true
            const id = 1
            const token = jwt.sign({ id }, secret, { expiresIn: 300 })
            return res.json({ auth: true, token: token })
        }
    }
    res.status(500).send("invalid user or password")
})

app.post("/logout", (req, res) => res.json({ auth: false, token: null }))

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) return res.status(401).json({ auth: false, message: "no token provided" })

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: "Failed to authenticate token" })

        // if all its ok
        req.userId = decoded.id;
        next();
    })
}

app.get("/fruits", verifyJWT, (req, res, next) => {
    console.log("Return logged user fruit")
    for(user of data){
        if(req.body.name === user.name)
        res.send(user.fruit)
    }
})