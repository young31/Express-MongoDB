const express = require('express')
const router = express.Router()
const axios = require('axios')
const request = require('request')

router.get('/', function(req, res) {
  res.send('신한 해커톤 DB Server')
})

router.post('/', function(req, res) {

    const targeturl = req.body.urls
    const options = req.body.options

    function aa() {
      return axios.post('127.0.0.1:5000', options).then(response => {
        return response.data
      })
    }

    aa().then(data => {
      res.json({ data })
    })

  }

)




module.exports = router