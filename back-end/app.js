const express = require("express") 
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require("axios")
require("dotenv").config({ silent: true })
const morgan = require("morgan")
const cookieParser = require("cookie-parser") 
const jwt = require("jsonwebtoken")
const passport = require("passport")
const jwtStrategy = require("./config/jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)
app.use(passport.initialize())

const artworksRoute = require("./Routes/artworks")
const categoriesRoute = require("./Routes/categories")
const usersRoute = require("./Routes/users")

// Connect to DB
try {
  mongoose.connect(process.env.DB_CONNECTION_STRING)
  console.log(`Connected to MongoDB.`)
} catch (err) {
  console.log(
    `Error connecting to MongoDB user account authentication will fail: ${err}`
  )
}

app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true }))
app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("Public"))

app.get("/", (req, res) => {
  res.status(200).send(`GET request on port ${process.env.PORT}, path "/" received!`)
})

app.use('/artworks', artworksRoute)
app.use('/categories', categoriesRoute)
app.use('/users', usersRoute)

module.exports = app 