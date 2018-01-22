const mongoose = require('mongoose')

const User = mongoose.model('User')
const Cart = require('../models/Cart')
const Prediction = mongoose.model('Prediction')
const Payment = mongoose.model('Payment')
const Order = mongoose.model('Order')

const promisify = require('es6-promisify')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter (req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if (isPhoto) {
      next(null, true)
    } else {
      next({ message: 'That filetype is not allowed' }, false)
    }
  }
}

exports.authenticatePhone = (req, res, next) => {
  res.render('phoneauth', { title: 'Phone Verification' })
}
exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' })
}

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' })
}

exports.forgotPassword = (req, res) => {
  res.render('forgot', {title: 'Reset Password'})
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('username')
  req.checkBody('username', 'You must supply a name!').notEmpty()
  req.checkBody('email', 'Email not valid!').isEmail()
  req.sanitizeBody('phone')
  req.checkBody('phone', 'You must supply a phone number!').notEmpty()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password cannot be blank!').notEmpty()
  req.checkBody('password-confirm', 'Confirm Password cannot be blank!').notEmpty()
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password)
  const errors = req.validationErrors()
  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() })
    return
  }
  next()
}

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone
  })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next()
}

exports.account = async (req, res, next) => {
  const payments = await Payment.find({user: req.user})
  res.render('account', { title: 'Account Settings', payments })
}

exports.updateAccount = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    { new: true, runValidators: true, context: 'query' }
  ).exec()
  req.flash('success', 'Profile updated')
  res.redirect(`/user/profile/${req.body.username}`)
}

exports.upload = multer(multerOptions).single('avatar')

exports.resize = async (req, res, next) => {
  // check if no new file
  if (!req.file) {
    next()
    return
  }
  const extension = req.file.mimetype.split('/')[1]
  req.body.avatar = `${uuid.v4()}.${extension}`
  // resize
  const avatar = await jimp.read(req.file.buffer)
  await avatar.resize(800, jimp.AUTO)
  await avatar.write(`./public/uploads/${req.body.avatar}`)
  // Once photo is written keep going
  next()
}

exports.getUserOrders = async (req, res, next) => {
  await Order.find({ user: req.user }, (err, orders) => {
    if (err) {
      return res.write('Error!')
    }
    let cart = {}
    orders.forEach((order) => {
      cart = new Cart(order.cart)
      order.items = cart.generateArray()
    })
    res.render('myorders', { title: 'Purchases', orders })
  }).sort({'_id': -1})
}

exports.getUserProfile = async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findOne({ username: userId })
  const predictions = await Prediction.find({ author: user }).sort([['_id', -1]]).populate('author')
  res.render('userprofile', { title: 'Profile', analyst: user, predictions })
}

exports.followUser = async (req, res, next) => {
  // User following
  const following = req.user.following.map(obj => obj.toString())
  const operator = following.includes(req.params.id) ? '$pull' : '$addToSet'
  const user = await User
    .findByIdAndUpdate(req.user._id,
      { [operator]: { following: req.params.id } },
      { new: true }
    )
  // Analyst followers
  const analyst = await User.findById(req.params.id)
  const checkfollower = analyst.followers.includes(req.user.id) ? '$pull' : '$addToSet'
  const analystUpdate = await User.findByIdAndUpdate(req.params.id,
    { [operator]: { followers: req.user.id } },
    { new: true }
  )
  res.json(analystUpdate)
}

// Search Users
exports.searchUsers = async (req, res) => {
  const users = await User
  // find users that match
  .find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  })
  // sort users
  .sort({
    score: { $meta: 'textScore' }
  })
  //  limit to only 10 results
  .limit(10)
  res.json(users)
}
