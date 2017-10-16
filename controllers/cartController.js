const mongoose = require('mongoose')
const Cart = require('../models/Cart')

const Prediction = mongoose.model('Prediction')
const Order = mongoose.model('Order')

// Route to add predction to cart
exports.addToCart = async (req, res, next) => {
  const predictionId = req.params.id
  const cart = new Cart(req.session.cart ? req.session.cart : {})

  // Get prediction id from the url
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
    return res.render('shopping-cart', { title: 'Shopping Cart', predictions: null })
  }
  const cart = new Cart(req.session.cart)
  res.render('shopping-cart', { title: 'Shopping Cart', predictions: cart.generateArray(), totalPrice: cart.totalPrice })
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

exports.getCheckout = (req, res, next) => {
  if (!req.session.cart || req.session.cart.totalQuantity <= 0) {
    req.flash('error', 'You have no items to checkout')
    return res.redirect('/shopping-cart')
  }
  const cart = new Cart(req.session.cart)
  res.render('checkout', { title: 'Checkout', total: cart.totalPrice, predictions: cart.generateArray() })
}

exports.saveOrder = async (req, res, next) => {
  if (req.session.cart.totalQuantity <= 0) {
    req.flash('error', 'You have no items to checkout')
    return res.redirect('/shopping-cart')
  }
  const cart = new Cart(req.session.cart)
  const order = new Order({
    user: req.user,
    cart
  })
  await order.save((err, result) => {
    if (err) {
      req.flash('error', 'Error processing your order')
    }
    req.flash('success', 'Succesfully bought product')
    req.session.cart = null
    res.redirect('/')
  })
}
