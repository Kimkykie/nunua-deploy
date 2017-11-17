const prettyjson = require('prettyjson')
const options = {
  noColor: true
}
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// B2C RESULT
exports.b2cResult = (req, res) => {
  console.log('-----------B2C CALLBACK------------')
  console.log(prettyjson.render(req.body, options))
  console.log('-----------------------')

  let message = {
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  }

  res.json(message)
}

// B2C TIMEOUT
exports.b2cTimeOut = (req, res) => {
  console.log('-----------B2C TIMEOUT------------')
  console.log(prettyjson.render(req.body, options))
  console.log('-----------------------')

  let message = {
    'ResponseCode': '00000000',
    'ResponseDesc': 'success'
  }

  res.json(message)
}

//  C2B VALIDATION
exports.c2bValidation = (req, res) => {
  console.log('-----------C2B VALIDATION REQUEST-----------')
  console.log(req.body)
  console.log('-----------------------')
}

// C2B CONFIRMATION
exports.c2bConfirmation = (req, res) => {
  console.log('-----------C2B CONFIRMATION REQUEST------------')
  console.log(prettyjson.render(req.body, options))
  console.log('-----------------------')

  let message = {
    'ResultCode': 0,
    'ResultDesc': 'Success'
  }
  res.json(message)
}

exports.stkPush = (req, res) => {
  console.log('-----------STK CONFIRMATION REQUEST------------')
  console.log(prettyjson.render(req.body, options))
  console.log('-----------------------')

  let message = {
    'ResultCode': 0,
    'ResultDesc': 'Success'
  }
  res.json(message)
}
