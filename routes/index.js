const express = require('express')
const router = express.Router()
const predictionController = require('../controllers/predictionController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const cartController = require('../controllers/cartController')
const reviewController = require('../controllers/reviewController')
const mpesaController = require('../controllers/mpesaController')
const feedBackController = require('../controllers/feedBackController')

const { catchErrors } = require('../handlers/errorHandlers')

/* PREDICTION CONTROLLER */
router.get('/', catchErrors(predictionController.getPredictions))
router.get('/page/:page', catchErrors(predictionController.getPredictions))
router.get('/predictions', catchErrors(predictionController.getPredictions))
router.get('/predictions/page/:page', catchErrors(predictionController.getPredictions))
router.get('/add', authController.isLoggedIn, predictionController.addPrediction)
router.post('/add', catchErrors(predictionController.createPrediction))
/* USER PREDICTION ROUTES */
router.get('/user/games', authController.isLoggedIn, catchErrors(predictionController.getUserPredictions))

router.get('/prediction/:slug', catchErrors(predictionController.getPredictionBySlug))

/* USER CONTROLLER */
router.get('/auth', authController.isPhoneVerified, userController.authenticatePhone)
router.get('/register', authController.isRegistered, userController.registerForm)

// Login
router.get('/login', authController.isRegistered, userController.loginForm)
router.post('/login', authController.login)

// 1. validate
// 2. Register
// 3. Log user in
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
)

router.get('/logout', authController.logout)

router.get('/user/account', authController.isLoggedIn, userController.account)
router.post('/user/account/:id',
  userController.upload,
  catchErrors(userController.resize),
  catchErrors(userController.updateAccount))
router.get('/account/forgot', userController.forgotPassword)
router.post('/account/forgot', catchErrors(authController.forgot))
router.get('/account/reset/:token', catchErrors(authController.reset))
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.updatePassword)
)

// Shopping Cart
router.get('/shopping-cart', cartController.getShoppingCart)
router.post('/api/add-to-cart/:id', cartController.addToCart)
router.post('/api/remove-from-cart/:id', cartController.removeFromCart)

// Review
router.post('/review/:id',
  authController.isLoggedIn,
  catchErrors(reviewController.addReview))
// Checkout
router.get('/checkout', authController.isLoggedIn, cartController.getCheckout)
router.post('/checkout', authController.isLoggedIn, cartController.saveOrder)

// Orders
router.get('/user/orders', authController.isLoggedIn, userController.getUserOrders)

// User Profile

router.get('/user/profile/:id', userController.getUserProfile)
router.post('/api/user/:id/follow', catchErrors(userController.followUser))
router.get('/api/search', catchErrors(userController.searchUsers))

// MPESA
router.post('/c2b/validation', mpesaController.c2bValidation)

//  FEEDBACK
router.get('/help', feedBackController.help)
module.exports = router
