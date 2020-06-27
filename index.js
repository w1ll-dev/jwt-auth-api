const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const port = 8080
const data = require("./data/data.json")
const secret = "willzimeosegredo"

app.listen(port, (req, res) => console.log(`server running on port ${port}`))

app.post("/login", (req, res, next) => {
    for(user of data){
        if(req.body.name === user.name && req.body.pswd === user.pswd){
            // res.send(user.fruit)
            // auth === true
            const id = 1
            const token = jwt.sign({ id }, secret, { expiresIn: 300})
            return res.json({auth: true, token: token})
        }
    }
    res.status(500).send("invalid user or password")
})
// app.get("/users", (req, res) => res.json(data))
// app.get("/", (req, res) => res.send("<h2>Hello World</h2>"))