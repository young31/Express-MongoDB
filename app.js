// libraries
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection

// config
const dotenv = require('dotenv').config()
const GLOBAL_URI = process.env.MONGODB_URI
  // const LOCAL_URI = dotenv.parsed.LOCAL_URI

// when connected
db.on('error', function() {
  console.error('error')
})
db.once('open', function() {
  console.log('connected')
})

mongoose.connect(GLOBAL_URI, {
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