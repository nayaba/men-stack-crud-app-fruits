require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const app = express()

// MONGOOSE CONNECTION
require("./config/database")

const Fruit = require("./models/fruit")
app.use(express.urlencoded({ extended: false }))

// MIDDLEWARE
app.use(morgan("dev"))

// ROUTES
app.get("/", async (req, res) => {
  res.render("index.ejs")
})

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
})

app.post("/fruits", async (req, res) => {
  req.body.isReadyToEat === "on"
    ? (req.body.isReadyToEat = true)
    : (req.body.isReadyToEat = false)
  console.log(req.body)
  await Fruit.create(req.body)
  res.redirect("/fruits/new")
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
