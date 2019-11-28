const secretObj = require('./jwt')

const auth = function(req) {
  let token = req.cookies.user;

  let decoded = jwt.verify(token, secretObj.secret)

  return decoded
}

module.exports = auth