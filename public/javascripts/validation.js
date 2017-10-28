$('.validate-form')
  .form({
    fields: {
      username: {
        identifier: 'username',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your name',
        }],
      },
      email: {
        identifier: 'email',
        rules: [{
          type: 'empty',
          prompt: 'Please enter your email',
        }],
      },
      phone: {
        identifier: 'phone',
        rules: [{
          type: 'regExp',
          value: /^(?:254)?(7(?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/,
          prompt: 'Your phone number should be in the form 254712345678'
        }],
      },
      password: {
        identifier: 'password',
        rules: [{
          type: 'empty',
          prompt: 'Please enter a password',
        },
        {
          type: 'minLength[8]',
          prompt: 'Your password must be at least {ruleValue} characters',
        },
        ],
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
          prompt: 'You must agree to the terms and conditions',
        }],
      },
    },
  });
