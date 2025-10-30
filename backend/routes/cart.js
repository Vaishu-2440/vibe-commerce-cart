const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart - Get cart
router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: 'mock-user-1' });
    
    if (!cart) {
      cart = new Cart({ userId: 'mock-user-1', items: [], total: 0 });
      await cart.save();
    }
    
    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }
    
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }
    
    // Find the product
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ userId: 'mock-user-1' });
    if (!cart) {
      cart = new Cart({ userId: 'mock-user-1', items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }
    
    await cart.save();
    
    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
});

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = parseInt(req.params.id);
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }
    
    let cart = await Cart.findOne({ userId: 'mock-user-1' });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    
    res.json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    let cart = await Cart.findOne({ userId: 'mock-user-1' });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
});

// DELETE /api/cart - Clear cart
router.delete('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: 'mock-user-1' });
    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }
    
    res.json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message
    });
  }
});

module.exports = router;
