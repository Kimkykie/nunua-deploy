const mongoose = require('mongoose')
const User = mongoose.model('User')
const Payment = mongoose.model('Payment')
const options = {
  apiKey: process.env.B2C,         // Use sandbox API key for sandbox development
  username: 'kimkiragu'      // Use "sandbox" for sandbox development
}
const AfricasTalking = require('africastalking')(options)
const payments = AfricasTalking.PAYMENTS

//  C2B VALIDATION
exports.c2bValidation = async (req, res) => {
  if (req.body.status === 'Success') {
    const user = await User.findOneAndUpdate({phone: (req.body.source).replace(/^(\+254)+/, '0')},
      {$inc: {
        balance: parseInt((req.body.value).replace('KES ', ''))
      }},
    {new: true}
    )
    const payment = new Payment({
      user: user.id,
      category: req.body.category,
      transactionId: req.body.transactionId,
      provider: req.body.provider,
      clientAccount: req.body.clientAccount,
      source: req.body.source,
      value: req.body.value,
      status: req.body.status
    })
    await payment.save()
    res.json('Success')
  } else {
    res.json('Error')
  }
}

// B2C WITHDRAWAL

exports.b2cValidation = async(req, res) => {
  if ((req.body.phone === req.user.phone) && (req.body.amount !== '') && (req.user.balance > req.body.amount)) {
    const useropts = {
      'username': 'kimkiragu',
      'productName': 'NUNUATIPs',
      'recipients': [
        {
          'name': req.user.username,
          'phoneNumber': req.user.phone.replace(/^(0)+/, '+254'),
          'currencyCode': 'KES',
          'amount': parseInt(req.body.amount),
          'reason': payments.REASON.SALARY,
          'metadata': {
            'description': 'Withdrawal',
            'employeeId': req.user.username
          }
        }
      ]
    }
    await payments.mobileB2C(useropts)
      .then(async (response) => {
        await response.entries.forEach(async (entry) => {
          if (entry.status === 'Queued') {
            // Find User and update balance
            const user = await User.findOneAndUpdate({phone: (entry.phoneNumber).replace(/^(\+254)+/, '0')},
              {$inc: {
                balance: -(parseInt((entry.value).replace('KES ', '')))
              }},
            {new: true}
          )
          // Save Payment
            const payment = new Payment({
              user: user.id,
              category: 'MobileB2C',
              transactionId: entry.transactionId,
              provider: entry.provider,
              source: entry.phoneNumber,
              value: entry.value,
              status: entry.status
            })
            await payment.save()
          // Reload page
            req.flash('success', 'Withdrawal request successful.')
            res.redirect('back')
          } else {
            req.flash('error', 'Sorry! Could not process your withdrawal request.')
            res.redirect('back')
          }
        })
      })
      .catch(function (err) {
        console.log('Encountered an error while making the call: ' + err)
      })
  } else {
    req.flash('error', 'Sorry! Could not process your withdrawal request.')
    res.redirect('back')
  }
}
