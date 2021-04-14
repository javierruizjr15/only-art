const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')
const reactDom = require('react-dom')

router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find({})
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    artist: req.user._id,
    title: req.body.title,
    image: req.body.image,
    body: req.body.body,
    category: req.body.category,
    price: req.body.price
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => {
          res.json({
            id: post._id,
            title: post.title,
            image: post.image,
            body: post.body,
            category: post.category,
            price: post.price,
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router