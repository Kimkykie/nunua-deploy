const mongoose = require('mongoose')
const User = mongoose.model('User')
const Payment = mongoose.model('Payment')
//  C2B VALIDATION
exports.c2bValidation = async (req, res) => {
  if (req.body.status === 'success') {
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
    console.log(user)
    res.json('Success')
  } else {
    res.json('Error')
  }
}
