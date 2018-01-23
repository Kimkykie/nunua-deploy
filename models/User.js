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
    unique: true,
    required: 'Please supply a name'
  },

  phone: {
    type: String,
    unique: true,
    required: 'Please supply a phone number',
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  },
  avatar: String,
  rated: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ],
  followers: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ],
  following: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

userSchema.index({
  username: 'text'
})

userSchema.path('username').validate(function (v) {
  return v.length <= 15
}, 'Sorry! Maximum username length is 15.')

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email)
  return `https://gravatar.com/avatar/${hash}?s=200`
})

userSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'author'
})

function autopopulate (next) {
  this.populate('reviews')
  next()
}

userSchema.pre('find', autopopulate)
userSchema.pre('findOne', autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'phone' })
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)
