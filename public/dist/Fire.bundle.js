/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = {
  apiKey: 'AIzaSyCNanfZEbn0m0PNRE-UxkwIrDFiCDWfRF8',
  authDomain: 'nunua-bet.firebaseapp.com',
  databaseURL: 'https://nunua-bet.firebaseio.com',
  projectId: 'nunua-bet',
  storageBucket: 'nunua-bet.appspot.com',
  messagingSenderId: '515605342765'
};
firebase.initializeApp(config);

var uiConfig = {
  signInSuccessUrl: '/register',
  signInOptions: [{
    // Leave the lines as is for the providers you want to offer your users.
    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    recaptchaParameters: {
      size: 'normal', // 'invisible' or 'compact'
      badge: 'bottomleft' // ' bottomright' or 'inline' applies to invisible.
    },
    defaultCountry: 'KE' // Set default country to the United Kingdom (+44).
  }],
  // Terms of service url.
  tosUrl: 'https://nunuatips.com/terms-and-conditions'
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

var initApp = function initApp() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is verified
      var phoneNumber = user.phoneNumber;
      localStorage.setItem('phone', phoneNumber.replace(/^(\+254)+/, '0'));
    }
  }, function (error) {
    console.log(error);
  });
};

window.addEventListener('load', function () {
  initApp();
});

/***/ })

/******/ });
//# sourceMappingURL=Fire.bundle.js.map