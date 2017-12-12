const mongoose = require('mongoose')

const Prediction = mongoose.model('Prediction')
const Cart = require('../models/Cart')
const Order = mongoose.model('Order')

exports.homePage = (req, res) => {
  res.render('layout', { title: 'Home' })
}

exports.addPrediction = (req, res) => {
  res.render('addPrediction', { title: 'Add Prediction' })
}

exports.createPrediction = async (req, res) => {
  // Trim to remove empty strings from array
  const homearr = req.body.home.filter(e => String(e.trim()))
  const awayarr = req.body.away.filter(e => String(e.trim()))
  const predictionarr = req.body.prediction.filter(e => String(e.trim()))

  // Only push data to model if more than 5
  if (homearr.length >= 5 && awayarr.length >= 5 && predictionarr.length >= 5) {
    const prediction = new Prediction({
      author: req.user._id
    })

    for (let i = 0; i < req.body.home.length; i += 1) {
      //  If all the required inputs are filled save to database else ignore the incomplete fields
      if (req.body.home[i] !== '' && req.body.away[i] !== '' && req.body.prediction[i] !== '' && req.body.date[i] !== null) {
        prediction.team.push({
          home: req.body.home[i],
          away: req.body.away[i],
          prediction: req.body.prediction[i],
          date: req.body.date[i]
        })
      }
      // If predictions length are more than 10 games add 1 to default price for each game
      if (req.body.home.length > 10) {
        prediction.price = 20
        for (let i = 10; i < req.body.home.length; i += 1) {
          prediction.price += 1
        }
      }
    }
    await prediction.save()
    req.flash('success', 'Successfully created prediction')
    res.redirect('/user/games')
  } else {
    req.flash('error', 'You must enter 5 or more predictions')
    res.render('addPrediction', { title: 'Add Prediction', body: req.body, flashes: req.flash() })
  }
}

exports.getPredictions = async (req, res) => {
   // Find logged in users orders
  const orders = await Order.find({ user: req.user })
   // cart to generate array of purchased predictions
  let cart = []
   // array to hold all predictions bought by user
  let userOrder = []
   // array to hold predictions ids
  let orderId = []
   // Get users orders
  orders.forEach((order) => {
    cart = new Cart(order.cart)
    order.items = cart.generateArray()
  })
   // Get specific predictions bought
  orders.forEach((order) => {
    for (var i = 0; i < order.items.length; i++) {
      userOrder.push(order.items[i])
    }
  })
   // Store predictions Ids
  userOrder.forEach((order) => {
    orderId.push(order.item._id)
  })
  // Pagination
  const page = req.params.page || 1
  const limit = 9
  const skip = (page * limit) - limit
  // 1. Query database for list of all stores
  const predictions = await Prediction
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' })
    .populate('author')
  const count = await Prediction.count()
  const pages = Math.ceil(count / limit)
  if (!predictions.length && skip) {
    req.flash('info', `Hey you asked for page ${page}. But that doesn't exist. You are on page ${pages}`)
    res.redirect(`/predictions/page/${pages}`)
    return
  }
  res.render('predictions', { title: 'Predictions', predictions, user: req.user, orders: orderId, page, pages, count })
}

exports.getPredictionBySlug = async (req, res, next) => {
  // Find logged in users orders
  const orders = await Order.find({ user: req.user })
  // cart to generate array of purchased predictions
  let cart = []
  // array to hold all predictions bought by user
  let userOrder = []
  // array to hold predictions ids
  let orderId = []
  // Get users orders
  orders.forEach((order) => {
    cart = new Cart(order.cart)
    order.items = cart.generateArray()
  })
  // Get specific predictions bought
  orders.forEach((order) => {
    for (let i = 0; i < order.items.length; i += 1) {
      userOrder.push(order.items[i])
    }
  })
  // Store predictions Ids
  userOrder.forEach((order) => {
    orderId.push(order.item._id)
  })
  // Find One Prediction
  const prediction = await Prediction.findOne({ slug: req.params.slug }).populate('author reviews')
  // Check if user has purchased prediction
  const purchased = orderId.includes(prediction._id.toString())
  res.render('prediction', { prediction, title: 'Prediction', purchased })
}

exports.getUserPredictions = async (req, res) => {
  // 1. Query database for list of all stores
  const predictions = await Prediction.find({ author: req.user }).sort([['_id', -1]]).populate('author')
  res.render('userpredictions', { title: 'My Games', predictions })
}
