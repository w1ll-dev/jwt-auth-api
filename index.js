const express = require("express")
const app = express()
const port = 8080
const data = require("./data/data.json")

app.listen(port, (req, res) => console.log(`server running on port ${port}`))
app.use("/", (req, res) => res.send(data))