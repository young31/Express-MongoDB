// model schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const simpleFinSchema = new Schema({
  보험: {
    type: Object
  },
  예금: {
    tpye: Object
  },
  카드: {
    tpye: Object
  },

}, { collection: 'simplefin' })

module.exports = mongoose.model('simplefin', simpleFinSchema)