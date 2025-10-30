const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// POST /api/checkout - Process checkout
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body;
    
    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and email are required'
      });
    }
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create order
    const order = new Order({
      orderId,
      customerName,
      customerEmail,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      timestamp: new Date()
    });
    
    await order.save();
    
    // Clear the cart
    const cart = await Cart.findOne({ userId: 'mock-user-1' });
    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }
    
    res.json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order.orderId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        total: order.total,
        timestamp: order.timestamp,
        status: 'completed'
      }
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process checkout',
      error: error.message
    });
  }
});

// GET /api/checkout/orders - Get all orders (bonus feature)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

module.exports = router;
