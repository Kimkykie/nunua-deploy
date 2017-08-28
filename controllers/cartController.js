const mongoose = require('mongoose')
const Cart = require('../models/Cart')
const Prediction = mongoose.model('Prediction')

// Route to add predction to cart
exports.addToCart = async(req, res, next) => {
  const predictionId = req.params.id
  const cart = new Cart(req.session.cart ? req.session.cart : {})

  const prediction = await Prediction.findById(predictionId).populate('author')
  cart.add(prediction, prediction.id)
  cart.content.push(predictionId)
  req.session.cart = cart
  res.json(req.session.cart)
  console.log(req.session.cart)
}

// Shopping cart route
exports.getShoppingCart = (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shopping-cart', {title: 'Shopping Cart', predictions: null})
  }
  const cart = new Cart(req.session.cart)
  res.render('shopping-cart', {title: 'Shopping Cart', predictions: cart.generateArray(), totalPrice: cart.totalPrice})
  console.log(cart)
}

// Route to remove prediction from cart
exports.removeFromCart = (req, res, next) => {
  const predictionId = req.params.id
  const cart = new Cart(req.session.cart ? req.session.cart : {})
  // Remove prediction from cart
  cart.removeItem(predictionId)
  // Filter content array in cart to exclude remove items from content array
  const filteredContent = cart.content.filter(item => item !== predictionId)
  cart.content = filteredContent
  req.session.cart = cart
  res.json(req.session.cart)
}
