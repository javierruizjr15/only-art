const router = require('express').Router()
const { Cart, Post } = require('../models')
const passport = require('passport')

router.post('/add', passport.authenticate('jwt'), (req, res) => {
  const user = req.user._id;
  const products = req.body.products;

  const cart = new Cart({
    user,
    products
  });

  cart.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    decreaseQuantity(products);

    res.status(200).json({
      success: true,
      cartId: data.id
    });
  });
});

router.delete('/delete/:cartId', passport.authenticate('jwt'), (req, res) => {
  Cart.deleteOne({ _id: req.params.cartId }, err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

router.post('/add/:cartId', passport.authenticate('jwt'), (req, res) => {
  const product = req.body.product;
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $push: { products: product } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

router.delete('/delete/:cartId/:productId', passport.authenticate('jwt'), (req, res) => {
  const product = { product: req.params.productId };
  const query = { _id: req.params.cartId };

  Cart.updateOne(query, { $pull: { products: product } }).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json({
      success: true
    });
  });
});

const decreaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  Post.bulkWrite(bulkOptions);
};

module.exports = router;