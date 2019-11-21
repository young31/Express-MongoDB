const express = require('express')
const router = express.Router()
const SimpleFin = require('../models/simplefin')

router.get('/', function(req, res) {
  SimpleFin.find(function(err, info) {
    if (err) { return res.status(500).send({ error: fail }) }
    res.json(info)
  })
})

router.post('/', function(req, res) {
  console.log(req.body)
  let fin = new SimpleFin()
  fin = req.doby
  fin.save()
    // fin.name = req.body.name
    // fin.hobby = req.body.hobby

  fin.save(function(err) {
    if (err) {
      res.status(400).json({ result: 'error' })
      return
    }

    res.status(200).json({ result: 1 })
  })
})

module.exports = router