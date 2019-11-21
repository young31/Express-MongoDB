// model schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const simpleFinSchema = new Schema({
  item: {
    type: Object
  }

}, { collection: 'simplefin' })

module.exports = mongoose.model('simplefin', simpleFinSchema)