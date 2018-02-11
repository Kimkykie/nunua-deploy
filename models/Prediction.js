const mongoose = require('mongoose')
const uuid = require('uuid')
mongoose.Promise = global.Promise

const slug = require('slugs')

const teamSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  home: {
    type: String,
    trim: true
  },
  away: {
    type: String,
    trim: true
  },
  prediction: {
    type: String,
    trim: true
  }
})

const predictionSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  slug: String,
  team: [ teamSchema ],
  price: {
    type: Number,
    default: 20
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

predictionSchema.pre('save', function (next) {
  this.slug = slug(uuid.v4())
  next()
})

module.exports = mongoose.model('Prediction', predictionSchema)
