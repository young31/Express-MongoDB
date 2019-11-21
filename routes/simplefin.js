const express = require('express')
const router = express.Router()
const SimpleFin = require('../models/simplefin')

router.get('/', function(req, res) {
  const data = SimpleFin.find({})
  res.send(data)
})

router.post('/', function(req, res) {
  // console.log(req.body)
  SimpleFin.create(req.body)
    .then(res.status(200).json({ result: 1 }))
    .catch(res.status(400).json({ result: 'error' }))
})

module.exports = router