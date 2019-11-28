// libraries
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const cors = require('cors')
  // config
  // const dotenv = require('dotenv').config()
  // const LOCAL_URI = dotenv.parsed.LOCAL_URI
const GLOBAL_URI = process.env.MONGODB_URI


// when connected
db.on('error', function() {
  console.error('error')
})
db.once('open', function() {
  console.log('connected')
})

console.log(GLOBAL_URI)
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

// router setting
const home = require('./routes/index')
app.use('/', home)

const test = require('./routes/test')
app.use('/test', test)

const simpleFin = require('./routes/simplefin')
app.use('/simplefin', simpleFin)

// confirm connection
const server = app.listen(port, () => console.log('server listen', port))