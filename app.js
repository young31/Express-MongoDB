const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection

db.on('error', function() {
  console.error('error')
})
db.once('open', function() {
  console.log('connected')
})

mongoose.connect('mongodb://young:sky7732@ds061601.mlab.com:61601/heroku_m63tz4jn', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000

const Test = require('./models/test')

const router = require('./routes')(app, Test)

const server = app.listen(port, () => console.log('server listen', port))