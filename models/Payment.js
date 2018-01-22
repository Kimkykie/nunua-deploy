const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  category: {
    type: String
  },
  transactionId: {
    type: String
  },
  provider: {
    type: String
  },
  clientAccount: {
    type: String
  },
  source: {
    type: String
  },
  value: {
    type: String
  },
  status: {
    type: String
  }
})

module.exports = mongoose.model('Payment', paymentSchema)
