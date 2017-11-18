const mongoose = require('mongoose')
const User = mongoose.model('User')

//  C2B VALIDATION
exports.c2bValidation = async (req, res) => {
  console.log('-----------C2B VALIDATION REQUEST-----------')
  const user = await User.findOneAndUpdate({phone: parseInt((req.body.source).replace('+', ''))},
    {$inc: {
      balance: parseInt((req.body.value).replace('KES ', ''))
    }}
  )
  console.log(user)
  console.log('-----------------------')
  res.json('Success')
}
