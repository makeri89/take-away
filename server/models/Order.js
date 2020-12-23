const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  date: {
    type: 'string',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'
    }
  ]
})

module.exports = mongoose.model('Order', schema)