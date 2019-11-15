// libraries
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection

// when connected
db.on('error', function() {
  console.error('error')
})
db.once('open', function() {
  console.log('connected')
})

// connect db
const MONGO_URI = 'mongodb://young:sky7732@ds061601.mlab.com:61601/heroku_m63tz4jn'
  // mongodb://localhost/mongodb_tutorial
mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true
})

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// port setting
const port = process.env.PORT || 5000

// model setting
const Test = require('./models/test')

// router setting
const router = require('./routes')(app, Test)

// confirm connection
const server = app.listen(port, () => console.log('server listen', port))