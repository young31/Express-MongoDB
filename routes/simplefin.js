const express = require('express')
const router = express.Router()

router.get('/simplefin', function(req, res) {
  SimpleFin.find(function(err, info) {
    if (err) { return res.status(500).send({ error: fail }) }
    res.json(info)
  })
})

module.exports = router