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

router.get('/account', authController.isLoggedIn, userController.account)
router.post('/account',
  userController.upload,
  catchErrors(userController.resize),
  catchErrors(userController.updateAccount))

router.post('/api/add-to-cart/:id', cartController.addToCart)
module.exports = router
