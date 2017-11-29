const mongoose = require('mongoose')
const Cart = require('../models/Cart')
const User = mongoose.model('User')
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
}

// Shopping cart route
exports.getShoppingCart = (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shopping-cart', { title: 'Shopping Cart', predictions: null })
  }
  const cart = new Cart(req.session.cart)
  res.render('shopping-cart', { title: 'Shopping Cart', predictions: cart.generateArray(), totalPrice: cart.totalPrice })
}

// Remove prediction from cart
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

// Get the Checkout Page
exports.getCheckout = (req, res, next) => {
  if (!req.session.cart || req.session.cart.totalQuantity <= 0) {
    req.flash('error', 'You have no items to checkout')
    return res.redirect('/shopping-cart')
  }
  const cart = new Cart(req.session.cart)
  res.render('checkout', { title: 'Checkout', total: cart.totalPrice, predictions: cart.generateArray() })
}

// Save Order, Increase analyst balance and deduct user's balance
exports.saveOrder = async (req, res, next) => {
  // If user has no items in cart
  if (req.session.cart.totalQuantity <= 0) {
    req.flash('error', 'You have no items to checkout')
    return res.redirect('/shopping-cart')
  }
  //  Save Order
  const cart = new Cart(req.session.cart)
  const order = new Order({
    user: req.user,
    cart
  })
  // Check user's balance and deduct totalprice
  const user = await User.findById(req.user._id)
  if (user.balance >= cart.totalPrice) {
    await user.update({$inc: { balance: -cart.totalPrice }})
  } else {
    req.flash('error', 'Sorry! Your balance is low')
    res.redirect('/shopping-cart')
    return
  }
  // update individual analyst's balance
  const authOrder = await cart.generateArray()
  await authOrder.forEach(async (item) => {
    await User.findByIdAndUpdate(item.item.author._id,
      {$inc: {
        balance: (0.6 * item.price)
      }},
      {new: true})
  })
  // Save order
  await order.save((err, result) => {
    if (err) {
      req.flash('error', 'Error processing your order')
    } else {
      req.flash('success', 'Succesfully bought product')
      req.session.cart = null
      return res.redirect('/user/orders')
    }
  })
}
