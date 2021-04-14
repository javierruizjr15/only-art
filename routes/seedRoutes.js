const router = require('express').Router()
const { User } = require('../models')
const { Listing } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

let users = [
  {
    name: "Javier",
    email: "javierruizjr15@gmail.com",
    username: "jruiz",
    password: "Admin"
  },
  {
    name: "Yafiet",
    email: "yafietisaac@msn.com",
    username: "yissac",
    password: "Admin"
  },
  {
    name: "William",
    email: "wramirez23@gmail.com",
    username: "wramirez",
    password: "Admin"
  },
  {
    name: "Tucker",
    email: "pikulatucker@gmail.com",
    username: "tpikula",
    password: "Admin"
  },
]

