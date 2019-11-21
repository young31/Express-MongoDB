const express = require('express')
const router = express.Router()
const Test = require('../models/test')

router.get('/', function(req, res) {
  Test.find(function(err, tests) {
    if (err) { return res.status(500).send({ error: 'fail' }) }
    res.json(tests)
  })
})

router.post('/', function(req, res) {
  console.log(req.body)
  let test = new Test()
  test.name = req.body.name
  test.hobby = req.body.hobby

  test.save(function(err) {
    if (err) {
      res.status(400).json({ result: 'error' })
      return
    }

    res.status(200).json({ result: 1 })
  })
})

router.put('/:test_name', function(req, res) {
  Test.updateOne({ name: req.params.test_name }, { $set: req.query }, function(err, output) {
    if (err) { res.status(500).json({ err: 'connect failed' }) }
    if (!output.n) return res.status(404).json({ err: 'nout founded' })
    res.json({ res: 'success' })
  })
})

router.delete('/:test_name', function(req, res) {
  Test.remove({ name: req.params.test_name }, function(err, output) {
    if (err) return res.status(500).json({ error: 'connect failed' })
    res.status(204).end()
  })
})


module.exports = router