const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Mock products data
const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 6499,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 24999,
    description: 'Advanced smartwatch with fitness tracking and heart rate monitor',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 3999,
    description: 'Durable water-resistant backpack with padded laptop compartment',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 100
  },
  {
    id: 4,
    name: 'Portable Phone Charger',
    price: 2499,
    description: '20000mAh power bank with fast charging technology',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    category: 'Electronics',
    stock: 75
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 1999,
    description: 'Ergonomic wireless mouse with adjustable DPI settings',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    category: 'Electronics',
    stock: 120
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 3299,
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    category: 'Accessories',
    stock: 60
  },
  {
    id: 7,
    name: 'Mechanical Keyboard',
    price: 7499,
    description: 'RGB backlit mechanical gaming keyboard with blue switches',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Electronics',
    stock: 45
  },
  {
    id: 8,
    name: 'Webcam HD 1080p',
    price: 4999,
    description: 'Full HD webcam with auto-focus and built-in microphone',
    image: 'https://images.unsplash.com/photo-1574056993011-b30fc28e7f55?w=500',
    category: 'Electronics',
    stock: 40
  },
  {
    id: 9,
    name: 'Phone Stand',
    price: 1199,
    description: 'Adjustable aluminum phone stand for desk',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    category: 'Accessories',
    stock: 150
  },
  {
    id: 10,
    name: 'LED Desk Lamp',
    price: 2899,
    description: 'Dimmable LED desk lamp with USB charging port',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home & Office',
    stock: 80
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully seeded database with 10 products');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
