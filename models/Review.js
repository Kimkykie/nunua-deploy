const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply author'
  },
  prediction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Prediction',
    required: 'You must supply a prediction'
  },
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a reviewer'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
})

module.exports = mongoose.model('Review', reviewSchema)
