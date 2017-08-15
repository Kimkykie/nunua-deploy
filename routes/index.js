const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const { catchErrors } = require('../handlers/errorHandlers');

/*PREDICTION CONTROLLER*/
router.get('/', catchErrors(predictionController.getPredictions));
router.get('/predictions', catchErrors(predictionController.getPredictions));
router.get('/add', authController.isLoggedIn, predictionController.addPrediction);
router.post('/add', catchErrors(predictionController.createPrediction));

router.get('/predictions/:slug', catchErrors(predictionController.getPredictionBySlug));

/* USER CONTROLLER */
router.get('/phone', authController.isPhoneVerified, userController.authenticatePhone);
router.get('/register', userController.registerForm);

//Login
router.get('/login', userController.loginForm);
router.post('/login', authController.login);

//1. validate
//2. Register
//3. Log user in
router.post('/register',
  userController.validateRegister,
  userController.register,
  userController.authenticatePhone
);
router.get('/logout', authController.logout);

module.exports = router;
