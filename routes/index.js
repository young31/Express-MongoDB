module.exports = function(app, Test, SimpleFin) {
  // main
  app.get('/', function(req, res) {
    res.send('신한 해커톤 DB Server')
  })
}