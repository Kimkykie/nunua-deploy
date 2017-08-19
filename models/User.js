const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
const md5 = require('md5')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [
      validator.isEmail, 'Invalid Email Address'
    ],
    required: 'Please supply an email address'
  },

  username: {
    type: String,
    required: 'Please supply a name'
  },

  phone: {
    type: Number,
    required: 'Please supply a phone number',
    trim: true
    /* validate: {
      validator: function(v) {
        return /d{10}/.test(v);
      },
      message: '{VALUE} is not a valid 10 digit number!'
    } */
  },
  avatar: String
})

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email)
  return `https://gravatar.com/avatar/${hash}?s=200`
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'phone' })
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)
