// REGISTER
$('.validate-form')
  .form({
    fields: {
      username: {
        identifier: 'username',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your name'
        }]
      },
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your email'
          }
        ]
      },
      phone: {
        identifier: 'phone',
        rules: [{
          type: 'regExp',
          value: /^(0){1}(7(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/,
          prompt: 'Phone number format should be 0712345678'
        }]
      },
      password: {
        identifier: 'password',
        rules: [{
          type: 'empty',
          prompt: 'Please enter a password'
        },
        {
          type: 'minLength[8]',
          prompt: 'Your password must be at least {ruleValue} characters'
        }
        ]
      },
      confirmpassword: {
        identifier: 'password-confirm',
        rules: [{
          type: 'match[password]',
          prompt: 'Sorry! Password do not match'
        }]
      },
      terms: {
        identifier: 'terms',
        rules: [{
          type: 'checked',
          prompt: 'You must agree to the terms and conditions'
        }]
      }
    }
  })

// Add Predictions
$('.add-prediction-form')
.form({
  fields: {
    date: {
      identifier: 'date[]',
      rules: [{
        type: 'empty',
        prompt: 'Please select a date'
      }]
    },
    home: {
      identifier: 'home[]',
      rules: [{
        type: 'empty'
      }]
    },
    away: {
      identifier: 'away[]',
      rules: [{
        type: 'empty'
      }]
    },
    prediction: {
      identifier: 'prediction[]',
      rules: [{
        type: 'empty'
      }]
    }
  }
})

// Forgot password
$('.reset-form')
.form({
  fields: {
    password: {
      identifier: 'password',
      rules: [{
        type: 'empty',
        prompt: 'Please enter a password'
      },
      {
        type: 'minLength[8]',
        prompt: 'Your password must be at least {ruleValue} characters'
      }
      ]
    },
    confirmpassword: {
      identifier: 'password-confirm',
      rules: [{
        type: 'match[password]',
        prompt: 'Sorry! Password do not match'
      }]
    }
  }
})

// LOGIN
$('.login-form')
.form({
  fields: {
    phone: {
      identifier: 'phone',
      rules: [{
        type: 'regExp',
        value: /^(0){1}(7(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/,
        prompt: 'Phone number format should be 0712345678'
      }]
    },
    password: {
      identifier: 'password',
      rules: [{
        type: 'empty',
        prompt: 'Please enter a password'
      },
      {
        type: 'minLength[8]',
        prompt: 'Your password must be at least {ruleValue} characters'
      }
      ]
    }
  }
})

// WITHDRAWAL
$('#withdraw_form')
.form({
  fields: {
    amount: {
      identifier: 'amount',
      rules: [{
        type: 'empty',
        prompt: 'Please enter an amount to withdraw'
      }
      ]
    }
  }
})
