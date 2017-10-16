const mongoose = require('mongoose')
const Prediction = mongoose.model('Prediction')
const Review = mongoose.model('Review')
const User = mongoose.model('User')

exports.addReview = async (req, res) => {
  const prediction = await Prediction.findById(req.params.id)
  const user = await User.findByIdAndUpdate(req.user.id,
    { '$addToSet': { rated: prediction.id } },
    { new: true }
  )
  req.body.author = prediction.author
  req.body.prediction = req.params.id
  req.body.reviewer = user
  const newReview = new Review(req.body)
  await newReview.save()
  req.flash('success', 'Review Saved!')
  res.redirect('back')
}
