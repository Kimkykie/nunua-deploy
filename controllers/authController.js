const passport = require('passport')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
const mongoose = require('mongoose')
const crypto = require('crypto')
const promisify = require('es6-promisify')
const mail = require('../handlers/mail')
const User = mongoose.model('User')

exports.login = passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  successFlash: 'You are now logged in!',
  failureRedirect: '/login',
  failureFlash: 'Failed Login!'
})

exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You are now logged out')
  res.redirect('/')
}

// Check if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  req.flash('error', 'Oops! You must be logged in!')
  req.session.returnTo = req.url
  res.redirect('/login')
}

// If user is logged in and verified they cannot access phone route
exports.isPhoneVerified = (req, res, next) => {
  // check if user is authenticated
  if (req.isAuthenticated()) {
    req.flash('error', 'You are already verified!')
    res.redirect('/')
  } else {
    next()
  }
}

// If user is registered

exports.isRegistered = (req, res, next) => {
  // check if user is authenticated
  if (req.isAuthenticated()) {
    req.flash('error', 'You are already logged in!')
    res.redirect('/')
  } else {
    next()
  }
}

exports.forgot = async (req, res) => {
  // Check if user exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    req.flash('error', 'Email does not exist')
    return res.redirect('/login')
  }
  // Set reset token
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000
  await user.save()
  // Send email with token
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`
  mail.send({
    user,
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL
  })
  req.flash('success', `You have been emailed password reset link`)
  // Redirect to login page
  res.redirect('/login')
}

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  })
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired')
    return res.redirect('/login')
  }
  // If user show password rest form
  res.render('reset', { title: 'Reset your password' })
}

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next()
    return
  }
  req.flash('error', 'Passwords do not match')
}

exports.updatePassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  })
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired')
    return res.redirect('/login')
  }
  const setPassword = promisify(user.setPassword, user)
  await setPassword(req.body.password)
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  const updatedUser = await user.save()
  await req.login(updatedUser)
  req.flash('success', 'Nice, Your password has been reset! You are now logged in!')
  res.redirect('/')
}
