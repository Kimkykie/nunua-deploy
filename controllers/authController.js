const passport = require('passport')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

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
    req.flash('error', 'You are already registered!')
    res.redirect('/')
  } else {
    next()
  }
}