require('dotenv').config()
const express = require("express")
const morgan = require('morgan')

const app = express()

// MONGOOSE CONNECTION
require('./config/database')

// MIDDLEWARE
app.use(morgan('dev'))

// ROUTES
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
