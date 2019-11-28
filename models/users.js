const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema
const Float = require('mongoose-float').loadType(mongoose)

const userSchema = new Schema({
  userId: {
    type: String,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  master: {
    type: Boolean,
    default: false
  },
  like_movies: {
    type: Array
  },
  reviews: {
    type: Array
  },
  rate: {
    type: Array
  }
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }]
}, { collections: 'users' })

module.exports = mongoose.model('users', userSchema)