require('dotenv').config()
const express = require("express")
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🍒`)
})

// MIDDLEWARE
app.use(morgan('dev'))

// ROUTES
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
