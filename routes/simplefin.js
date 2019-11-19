const express = require('express')
const router = express.Router()
const SimpleFin = require('../models/simplefin')

router.get('/', function(req, res) {
  SimpleFin.find(function(err, info) {
    if (err) { return res.status(500).send({ error: fail }) }
    res.json(info)
  })
})

module.exports = router