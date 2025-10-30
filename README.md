# vibe-commerce-cart[README.md](https://github.com/user-attachments/files/23227175/README.md)
# Vibe Commerce - Full Stack Shopping Cart Application

A modern, full-stack e-commerce shopping cart application built with React, Node.js, Express, and MongoDB. This project demonstrates complete cart functionality including product listing, cart management, and checkout flow.

![Vibe Commerce](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [MongoDB Compass Guide](#mongodb-compass-guide)
- [API Documentation](#api-documentation)
- [Additional Features](#additional-features)
- [Author](#author)

## ✨ Features

### Core Features
- **Product Listing**: Display 10 mock products with images, prices, and descriptions
- **Shopping Cart**: Add, remove, and update item quantities
- **Real-time Cart Updates**: Instant feedback on all cart operations
- **Checkout Flow**: User information form with validation
- **Order Receipt**: Mock order confirmation with order ID and timestamp
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Additional Features Implemented
- ✅ **MongoDB Database Integration**: Full data persistence with Mongoose ODM
- ✅ **Error Handling**: Comprehensive error handling on both frontend and backend
- ✅ **Form Validation**: Client-side validation for checkout form
- ✅ **Toast Notifications**: Real-time user feedback using react-hot-toast
- ✅ **Modern UI/UX**: Beautiful gradient design with smooth animations
- ✅ **Mock User System**: Simulates user-specific cart management
- ✅ **Order History**: Backend support for order tracking

## 🛠️ Tech Stack

### Frontend
- **React** (v18.2.0) - UI Framework
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.18.2) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v7.6.3) - MongoDB ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── products.js          # Product routes
│   │   ├── cart.js              # Cart routes
│   │   └── checkout.js          # Checkout routes
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── seedData.js              # Database seeding script
│   └── server.js                # Express server
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.js   # Product display component
│   │   │   ├── CartSidebar.js   # Shopping cart sidebar
│   │   │   ├── CheckoutModal.js # Checkout form modal
│   │   │   └── ReceiptModal.js  # Order receipt modal
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main application component
│   │   ├── App.css              # Application styles
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── .gitignore
│   └── package.json
│
└── README.md                    # This file
```

## 🚀 Installation & Setup

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** (recommended for database visualization) - [Download](https://www.mongodb.com/try/download/compass)
- **npm** or **yarn** package manager

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd vibe-commerce-cart
```

### Step 2: Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system:

**Verify with MongoDB Compass**:
- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`
- If connection succeeds, MongoDB is running! ✅

**If MongoDB is not running**:
```bash
# On Windows (if installed as service, it should auto-start)
# Start service:
net start MongoDB
# Or start manually:
mongod

# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod
```

4. Seed the database with mock products:
```bash
node seedData.js
```

5. Start the backend server:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The backend server will start on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

### Step 4: Test the Application

1. The application should now be running with:
   - Backend API: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

2. Try the following:
   - Browse products on the home page
   - Click "Add to Cart" on any product
   - Open the cart sidebar by clicking the cart icon
   - Update quantities or remove items
   - Click "Proceed to Checkout"
   - Fill in the checkout form
   - View your order receipt!

### Step 5: Monitor with MongoDB Compass (Optional)

Keep MongoDB Compass open to visualize real-time data changes:

**Database**: `vibe-commerce`

**Collections to watch**:
1. **products** - Your 10 seeded products
2. **carts** - Updates when you add/remove items (userId: `mock-user-1`)
3. **orders** - New documents created when you complete checkout

**Tips**:
- Click refresh 🔄 after each action to see updates
- View cart total calculation in the `carts` collection
- Each order has a unique `orderId` with timestamp
- Use filters to search: `{ "category": "Electronics" }` or `{ "price": { "$gt": 50 } }`

## 🗄️ MongoDB Compass Guide

For detailed instructions on using MongoDB Compass with this project, including:
- Database structure and collections
- Real-time monitoring
- Filtering and querying
- Import/export data
- Troubleshooting tips

**See the complete guide**: [MONGODB_COMPASS_GUIDE.md](MONGODB_COMPASS_GUIDE.md)

**Quick Access**:
- **Connection**: `mongodb://localhost:27017`
- **Database**: `vibe-commerce`
- **Collections**: `products`, `carts`, `orders`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Products

**GET /api/products**
- Description: Get all products
- Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 79.99,
      "description": "Product description",
      "image": "https://...",
      "category": "Electronics",
      "stock": 50
    }
  ]
}
```

**GET /api/products/:id**
- Description: Get a single product by ID
- Response: Single product object

#### Cart

**GET /api/cart**
- Description: Get current user's cart
- Response:
```json
{
  "success": true,
  "data": {
    "userId": "mock-user-1",
    "items": [
      {
        "productId": 1,
        "name": "Product Name",
        "price": 79.99,
        "quantity": 2,
        "image": "https://..."
      }
    ],
    "total": 159.98
  }
}
```

**POST /api/cart**
- Description: Add item to cart
- Body:
```json
{
  "productId": 1,
  "quantity": 1
}
```

**PUT /api/cart/:id**
- Description: Update cart item quantity
- Body:
```json
{
  "quantity": 3
}
```

**DELETE /api/cart/:id**
- Description: Remove item from cart
- Response: Updated cart

**DELETE /api/cart**
- Description: Clear entire cart
- Response: Empty cart

#### Checkout

**POST /api/checkout**
- Description: Process checkout and create order
- Body:
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "cartItems": [...]
}
```
- Response:
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-1234567890-ABC123",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [...],
    "total": 159.98,
    "timestamp": "2024-10-29T10:30:00.000Z",
    "status": "completed"
  }
}
```

**GET /api/checkout/orders**
- Description: Get all orders (bonus feature)
- Response: Array of all orders

  
## Additional Features

### 1. Database Persistence
- All data is stored in MongoDB
- Cart persists across sessions
- Order history is maintained
- Efficient queries with Mongoose

### 2. Error Handling
- Try-catch blocks on all async operations
- User-friendly error messages
- Backend validation
- Network error handling

### 3. Form Validation
- Real-time validation on checkout form
- Email format validation
- Required field checking
- Clear error messages

### 4. User Experience
- Toast notifications for all actions
- Loading states on buttons
- Smooth animations and transitions
- Intuitive UI/UX design

### 5. Code Quality
- Clean, organized code structure
- Component-based architecture
- Separation of concerns
- Reusable components
- Well-commented code



## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.6.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "body-parser": "^1.20.2"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.0",
  "react-hot-toast": "^2.4.1"
}
```

## 🚧 Future Enhancements

Potential improvements for future versions:
- User authentication and authorization
- Product search and filtering
- Product categories and pagination
- Wishlist functionality
- Order tracking
- Payment gateway integration
- Admin dashboard
- Product reviews and ratings
- Multi-currency support
- Dark mode toggle

## 📝 Notes

- This is a **mock application** - no real payments are processed
- The application uses a single mock user (`mock-user-1`) for demonstration
- Products are seeded from the `seedData.js` script
- All images are fetched from external URLs (Unsplash)
- The application is designed for educational and demonstration purposes

## 🐛 Troubleshooting

### MongoDB Connection Issues
If you see "Failed to connect to MongoDB":
1. Ensure MongoDB is running (`mongod` command)
2. Check the connection string in `.env`
3. Verify MongoDB is installed correctly

### Port Already in Use
If port 5000 or 3000 is busy:
1. Change the PORT in backend `.env`
2. Update the proxy in frontend `package.json`
3. Update API_BASE_URL in `frontend/src/services/api.js`

### CORS Issues
If you see CORS errors:
1. Verify backend CORS configuration
2. Check that frontend is making requests to correct URL
3. Ensure proxy is set up correctly in `package.json`

## 👨‍💻 Author

**[Sri VaishnaviV]**
- GitHub: [Vaishu-2440]

## 📄 License

This project is created for demo purpose only.

---
