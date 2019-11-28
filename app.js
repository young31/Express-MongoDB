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



////
const movie = require('./routes/movies')
const user = require('./routes/user')

app.use('/api/movies', movie)
app.use('/user', user)



////
app.use(cors())
app.use(function(req, res, next) {
  // CORS에  x-access-token이 추가되었습니다. jwt로 생성된 토큰은 header의 x-access-token 항목을 통해 전달됩니다.
  // CORS(Cross-Origin Resource Sharing): 한 도메인에서 로드되어 다른 도메인에 있는 리소스와 상호 작용하는 클라이언트 웹 애플리케이션에 대한 방법을 정의
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});


// confirm connection
const server = app.listen(port, () => console.log('server listen', port))