const router = require('express').Router()
const { Order, Cart, Post } = require('../models')
const passport = require('passport')
const mailgun = require('mailgun-js')
const taxConfig = require('../config/tax')
const stripeConfig = require('../config/stripe')
const stripe = require('stripe')

router.post('/add', passport.authenticate('jwt'), async (req, res) => {
  try {
    const cart = req.body.cartId;
    const total = req.body.total;
    const user = req.user._id;

    const order = new Order({
      cart,
      user,
      total
    });

    const orderDoc = await order.save();

    await Order.findById(orderDoc._id).populate('cart user', '-password');

    const cartDoc = await Cart.findById(orderDoc.cart._id).populate({
      path: 'Posts.Post',
      populate: {
        path: 'brand'
      }
    });

    const newOrder = {
      _id: orderDoc._id,
      created: orderDoc.created,
      user: orderDoc.user,
      total: orderDoc.total,
      Posts: cartDoc.Posts
    };

    await mailgun.sendEmail(order.user.email, 'order-confirmation', newOrder);

    res.status(200).json({
      success: true,
      message: `Your order has been placed successfully!`,
      order: { _id: orderDoc._id }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all orders api
router.get('/list', passport.authenticate('jwt'), async (req, res) => {
  try {
    const user = req.user._id;

    const orders = await Order.find({ user }).populate({
      path: 'cart'
    });

    const newOrders = orders.filter(order => order.cart);

    if (newOrders.length > 0) {
      const newDataSet = [];

      newOrders.map(async doc => {
        const cartId = doc.cart._id;

        const cart = await Cart.findById(cartId).populate({
          path: 'Posts.Post',
          populate: {
            path: 'brand'
          }
        });

        const order = {
          _id: doc._id,
          total: parseFloat(Number(doc.total.toFixed(2))),
          created: doc.created,
          Posts: cart.Posts
        };

        newDataSet.push(order);

        if (newDataSet.length === newOrders.length) {
          newDataSet.sort((a, b) => b.created - a.created);
          res.status(200).json({
            orders: newDataSet
          });
        }
      });
    } else {
      res.status(200).json({
        orders: []
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch order api
router.get('/:orderId', passport.authenticate('jwt'), async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const user = req.user._id;

    const orderDoc = await Order.findOne({ _id: orderId, user }).populate({
      path: 'cart'
    });

    if (!orderDoc) {
      res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }

    const cart = await Cart.findById(orderDoc.cart._id).populate({
      path: 'Posts.Post',
      populate: {
        path: 'brand'
      }
    });

    let order = {
      _id: orderDoc._id,
      cartId: orderDoc.cart._id,
      total: orderDoc.total,
      totalTax: 0,
      created: cart.created,
      Posts: cart.Posts
    };

    order = caculateTaxAmount(order);

    res.status(200).json({
      order
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/cancel/:orderId', passport.authenticate('jwt'), async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    const foundCart = await Cart.findOne({ _id: order.cart });

    increaseQuantity(foundCart.Posts);

    await Order.deleteOne({ _id: orderId });
    await Cart.deleteOne({ _id: order.cart });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/cancel/item/:itemId', passport.authenticate('jwt'), async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const orderId = req.body.orderId;
    const cartId = req.body.cartId;

    const foundCart = await Cart.findOne({ 'Posts._id': itemId });
    const foundCartPost = foundCart.Posts.find(p => p._id === itemId);

    await Cart.updateOne(
      { 'Posts._id': itemId },
      {
        'Posts.$.status': 'Cancelled'
      }
    );

    await Post.updateOne(
      { _id: foundCartPost.Post },
      { $inc: { quantity: 1 } }
    );

    const cart = await Cart.findOne({ _id: cartId });
    const items = cart.Posts.filter(item => item.status === 'Cancelled');

    // All items are cancelled => Cancel order
    if (cart.Posts.length === items.length) {
      await Order.deleteOne({ _id: orderId });
      await Cart.deleteOne({ _id: cartId });

      return res.status(200).json({
        success: true,
        orderCancelled: true,
        message: 'You order has been cancelled successfully!'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item has been cancelled successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// calculate order tax amount
const caculateTaxAmount = order => {
  const taxRate = taxConfig.stateTaxRate;

  order.totalTax = 0;

  if (order.Posts && order.Posts.length > 0) {
    order.Posts.map(item => {
      if (item.Post) {
        if (item.Post.taxable) {
          const price = Number(item.Post.price).toFixed(2);
          const taxAmount = Math.round(price * taxRate * 100) / 100;
          item.priceWithTax = parseFloat(price) + parseFloat(taxAmount);
          order.totalTax += taxAmount;
        }

        item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
      }
    });
  }

  order.totalWithTax = order.total + order.totalTax;

  order.total = parseFloat(Number(order.total.toFixed(2)));
  order.totalTax = parseFloat(
    Number(order.totalTax && order.totalTax.toFixed(2))
  );
  order.totalWithTax = parseFloat(Number(order.totalWithTax.toFixed(2)));
  return order;
};

const increaseQuantity = Posts => {
  let bulkOptions = Posts.map(item => {
    return {
      updateOne: {
        filter: { _id: item.Post },
        update: { $inc: { quantity: +item.quantity } }
      }
    };
  });

  Post.bulkWrite(bulkOptions);
};

module.exports = router;