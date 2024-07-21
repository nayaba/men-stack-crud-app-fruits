require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')

const app = express()

// MONGOOSE CONNECTION
require('./config/database')

const Fruit = require('./models/fruit')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// MIDDLEWARE
app.use(morgan('dev'))

// ROUTES
app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.get('/fruits', async (req, res) => {
  const allFruit = await Fruit.find({})
  res.render('fruits/index.ejs', {
    fruits: allFruit,
  })
})

app.get('/fruits/new', (req, res) => {
  res.render('fruits/new.ejs')
})

app.get('/fruits/:fruitID', async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitID)
  res.render('fruits/show.ejs', {
    fruit: foundFruit
  })
})

app.post('/fruits', async (req, res) => {
  req.body.isReadyToEat === 'on'
    ? (req.body.isReadyToEat = true)
    : (req.body.isReadyToEat = false)
  console.log(req.body)
  await Fruit.create(req.body)
  res.redirect('/fruits')
})

app.delete('/fruits/:fruitId', async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId)
  res.redirect('/fruits')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
