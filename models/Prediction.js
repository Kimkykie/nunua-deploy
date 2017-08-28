const mongoose = require('mongoose')
const uuid = require('uuid')
mongoose.Promise = global.Promise

const slug = require('slugs')

const teamSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  team1: {
    type: String,
    trim: true
  },
  team2: {
    type: String,
    trim: true
  },
  prediction: {
    type: String,
    trim: true
  },
  time: {
    type: String
  }
})

const predictionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  slug: String,
  team: [ teamSchema ],
  price: {
    type: Number
  }
})

predictionSchema.pre('save', function (next) {
  this.slug = slug(uuid.v4())
  next()
})

module.exports = mongoose.model('Prediction', predictionSchema)
