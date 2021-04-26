const { model, Schema } = require('mongoose')

const Post = new Schema({
  artist:
  {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  artistName: String,
  title: String,
  image: String,
  body: String,
  price: Number,
  email: String,
})

module.exports = model('Post', Post)
