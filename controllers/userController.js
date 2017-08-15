const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

exports.authenticatePhone = (req, res, next) => {
  res.render('phoneauth')
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
