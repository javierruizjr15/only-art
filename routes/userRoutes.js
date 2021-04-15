const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// register user
router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

// login user
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

// update user
router.put('/users/:id', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.json(err))
})

//delete a user
router.delete('/users', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndDelete(req.user._id)
    .then(() => res.sendStatus(200))
    .catch(err => res.json(err))
})

module.exports = router
