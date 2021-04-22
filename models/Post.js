const { model, Schema } = require('mongoose')

const Post = new Schema({
  artist:
  {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  image: String,
  body: String,
  price: Number,
})

module.exports = model('Post', Post)
