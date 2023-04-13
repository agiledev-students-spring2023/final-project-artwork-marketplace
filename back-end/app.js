const express = require("express") 
const app = express()
const path = require("path")
const mongoose = require('mongoose')
const multer = require("multer") 
const cors = require('cors')
const axios = require("axios")
require("dotenv").config({ silent: true })
const morgan = require("morgan")

const artworksRoute = require("./Routes/artworks")
const categoriesRoute = require("./Routes/categories")
const usersRoute = require("./Routes/users")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("Public"))

mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

app.get("/", (req, res) => {
    res.status(200).send(`GET request on port ${process.env.PORT}, path "/" received!`)
})

app.use('/artworks', artworksRoute)
app.use('/categories', categoriesRoute)
app.use('/users', usersRoute)

module.exports = app 