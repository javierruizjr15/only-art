const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

//find all posts
router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find({})
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

//creating posts and pushing post into user's array of posts
router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    artist: req.user._id,
    artistName: req.body.artistName,
    title: req.body.title,
    image: req.body.image,
    body: req.body.body,
    price: req.body.price
  })

   
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => {
          res.json({
            id: post._id,
            artistName: post.artistName,
            title: post.title,
            image: post.image,
            body: post.body,
            price: post.price
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

//update posts
router.put('/posts/:id',(req,res)=>{
  Post.findByIdAndUpdate(req.params.id,req.body)
  .then(()=>res.sendStatus(200))
  .catch(err=>console.log(err))
})

//delete request with ID
router.delete('/post/:id', passport.authenticate('jwt'),(req,res)=>{
  Post.findByIdAndDelete(req.params.id)
  .then(()=>res.sendStatus(200))
  .catch(err=>res.json(err))
})


//router.get()




module.exports = router