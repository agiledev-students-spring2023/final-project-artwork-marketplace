const express = require("express") 
const app = express()
const path = require("path")
const multer = require("multer") 
const axios = require("axios")
require("dotenv").config({ silent: true })
const morgan = require("morgan")

const artworksRoute = require("./Routes/artworks")
const categoriesRoute = require("./Routes/categories")
const usersRoute = require("./Routes/users")

app.use(morgan("dev"))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("public"))

app.get("/", (req, res) => {
    res.send(`GET request on port ${process.env.PORT}, path "/" received!`)
})

app.use('/artworks', artworksRoute)
app.use('/categories', categoriesRoute)
app.use('/users', usersRoute)

module.exports = app 