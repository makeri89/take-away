const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'OrderProduct'
    }
  ],
  totalProducts: {
    type: Number
  },
  totalUniqueProducts: {
    type: Number
  },
  subTotal: {
    type: Number
  }
})

module.exports = mongoose.model('Order', schema)