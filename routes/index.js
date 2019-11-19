module.exports = function(app, Test) {
  // main
  app.get('/', function(req, res) {
    res.send('신한 해커톤 DB Server')
  })

  app.get('/simplefin', function(req, res) {
    SimpleFin.find(function(err, info) {
      if (err) { return res.status(500).send({ error: fail }) }
      res.json(info)
    })
  })

  // test
  app.get('/test', function(req, res) {
    Test.find(function(err, tests) {
      if (err) { return res.status(500).send({ error: 'fail' }) }
      res.json(tests)
    })
  })

  // post
  app.post('/test', function(req, res) {
    let test = new Test()
    test.name = req.query.name
    test.hobby = req.query.hobby

    test.save(function(err) {
      if (err) {
        res.status(400).json({ result: 'error' })
        return
      }

      res.status(200).json({ result: 1 })
    })
  })

  // put
  app.put('/test/:test_name', function(req, res) {
    Test.updateOne({ name: req.params.test_name }, { $set: req.query }, function(err, output) {
      if (err) { res.status(500).json({ err: 'connect failed' }) }
      if (!output.n) return res.status(404).json({ err: 'nout founded' })
      res.json({ res: 'success' })
    })
  })

  // delete
  app.delete('/test/:test_name', function(req, res) {
    Test.remove({ name: req.params.test_name }, function(err, output) {
      if (err) return res.status(500).json({ error: 'connect failed' })
      res.status(204).end()
    })
  })
}