const mongoose = require('mongoose')
const User = mongoose.model('User')
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
      next({message: 'That filetype is not allowed'}, false)
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

exports.account = (req, res, next) => {
  res.render('account', {title: 'Account Settings'})
}

exports.updateAccount = async (req, res) => {
  const updates = {
    username: req.body.username,
    email: req.body.email,
    avatar: req.body.avatar
  }

  const user = await User.findOneAndUpdate(
    {_id: req.user._id},
    { $set: updates },
    {new: true, runValidators: true, context: 'query'}
  )
  req.flash('success', 'Profile updated')
  res.redirect('back')
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
  await avatar.resize(300, jimp.AUTO)
  await avatar.write(`./public/uploads/${req.body.avatar}`)
  // Once photo is written keep going
  next()
}
