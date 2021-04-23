const { model, Schema } = require('mongoose')

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Delivered', 'Cancelled']
  }
});

module.exports = model('CartItem', CartItemSchema);

const CartSchema = new Schema ({
  products: [CartItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Cart', CartSchema);