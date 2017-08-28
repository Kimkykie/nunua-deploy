const mongoose = require('mongoose')
const Cart = require('../models/Cart')
const Prediction = mongoose.model('Prediction')

exports.addToCart = async(req, res, next) => {
  const predictionId = req.params.id
  const cart = new Cart(req.session.cart ? req.session.cart : {})

  const prediction = await Prediction.findById(predictionId, function (err, prediction) {
    if (err) {
      console.log(err)
      return res.redirect('/')
    }
    cart.add(prediction, prediction.id)
    cart.content.push(predictionId)
    req.session.cart = cart
    res.json(req.session.cart)
    console.log(req.session.cart)
  })
}
