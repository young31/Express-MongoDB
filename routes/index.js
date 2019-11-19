const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  res.send('신한 해커톤 DB Server')
})


module.exports = router