// model schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const testSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  hobby: String,

}, { collection: 'tests' })

module.exports = mongoose.model('test', testSchema)