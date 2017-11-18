const mongoose = require('mongoose')
const User = mongoose.model('User')
const Payment = mongoose.model('Payment')
//  C2B VALIDATION
exports.c2bValidation = async (req, res) => {
  console.log('-----------C2B VALIDATION REQUEST-----------')
  const user = await User.findOneAndUpdate({phone: parseInt((req.body.source).replace('+', ''))},
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
  console.log('-----------------------')
  res.json('Success')
}
