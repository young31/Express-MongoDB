const express = require('express')
const router = express.Router()
const SimpleFin = require('../models/simplefin')

router.get('/', function(req, res) {
  SimpleFin.find(function(err, tests) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    console.log(tests)
    res.json(tests)
  })
})

router.post('/', function(req, res) {
  console.log(req.body.card)
  let fin = new SimpleFin()
  console.log(fin.schema)

  fin.insure = req.body.insure
  fin.deposit = req.body.deposit
  fin.card = req.body.card
  console.log(fin.card)
  fin.save(function(err) {
    if (err) {
      console.log(err)
      res.status(400).json({ result: 'error' })
      return
    }
    console.log(fin.card)
    res.status(200).json({ result: 1 })
  })
})

module.exports = router