const express = require('express')
const router = express.Router()
const predictionController = require('../controllers/predictionController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const cartController = require('../controllers/cartController')

const { catchErrors } = require('../handlers/errorHandlers')

/* PREDICTION CONTROLLER */
router.get('/', catchErrors(predictionController.getPredictions))
router.get('/predictions', catchErrors(predictionController.getPredictions))
router.get('/add', authController.isLoggedIn, predictionController.addPrediction)
router.post('/add', catchErrors(predictionController.createPrediction))
/* USER PREDICTION ROUTES */
router.get('/mypredictions', catchErrors(predictionController.getUserPredictions))

router.get('/predictions/:slug', catchErrors(predictionController.getPredictionBySlug))

/* USER CONTROLLER */
router.get('/phone', authController.isPhoneVerified, userController.authenticatePhone)
router.get('/register', userController.registerForm)

// Login
router.get('/login', userController.loginForm)
router.post('/login', authController.login)

// 1. validate
// 2. Register
// 3. Log user in
router.post('/register',
  userController.validateRegister,
  userController.register,
  userController.authenticatePhone
)
router.get('/logout', authController.logout)

router.get('/user/account', authController.isLoggedIn, userController.account)
router.post('/user/account',
  userController.upload,
  catchErrors(userController.resize),
  catchErrors(userController.updateAccount))

// Shopping Cart
router.get('/shopping-cart', cartController.getShoppingCart)
router.post('/api/add-to-cart/:id', cartController.addToCart)
router.post('/api/remove-from-cart/:id', cartController.removeFromCart)

// Checkout
router.get('/checkout', authController.isLoggedIn, cartController.getCheckout)
router.post('/checkout', authController.isLoggedIn, cartController.saveOrder)

// Orders
router.get('/user/orders', authController.isLoggedIn, userController.getUserOrders)

// User Profile

router.get('/user/profile/:id', userController.getUserProfile)
router.post('/api/user/:id/follow', catchErrors(userController.followUser))
router.get('/api/search', catchErrors(userController.searchUsers))
module.exports = router;
