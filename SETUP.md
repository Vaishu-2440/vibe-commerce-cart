# Quick Setup Guide

This guide will help you get the Vibe Commerce application running in 5 minutes.

## Prerequisites

- Node.js (v14+)
- MongoDB installed and running
- Terminal/Command Prompt

## Quick Start

### 1. Install Backend Dependencies (Terminal 1)

```bash
cd backend
npm install
```

### 2. Start MongoDB

**If you have MongoDB Compass installed**, MongoDB is likely already running as a service.

**To verify**:
1. Open **MongoDB Compass**
2. Use connection string: `mongodb://localhost:27017`
3. Click **Connect**
4. If it connects successfully, MongoDB is running! ✅

**If MongoDB is not running**:

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
# Or manually:
mongod
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Seed Database & Start Backend

```bash
# Still in backend folder
node seedData.js
npm start
```

You should see:
```
Connected to MongoDB
Successfully seeded database with 10 products
Server running on port 5000
```

**Verify in MongoDB Compass**:
1. In Compass, refresh the databases
2. Find the `vibe-commerce` database
3. Open the `products` collection
4. You should see **10 products** 🎉

### 4. Install Frontend Dependencies (Terminal 2)

Open a NEW terminal window:

```bash
cd frontend
npm install
```

### 5. Start Frontend

```bash
npm start
```

Browser should automatically open to `http://localhost:3000`

## Testing the App

1. **Browse Products**: You'll see 10 products on the home page
2. **Add to Cart**: Click any "Add to Cart" button
3. **View Cart**: Click the cart icon in the header
4. **Update Quantity**: Use +/- buttons in cart
5. **Checkout**: Click "Proceed to Checkout" button
6. **Complete Order**: Fill in name and email, click "Place Order"
7. **View Receipt**: See your order confirmation!

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check if port 27017 is available

### "Port 5000 already in use"
- Change PORT in `backend/.env` to 5001
- Update proxy in `frontend/package.json` to `http://localhost:5001`

### "Failed to load data"
- Make sure backend is running first
- Check console for error messages
- Verify MongoDB connection

## API Health Check

Visit: `http://localhost:5000/api/health`

Should return:
```json
{
  "success": true,
  "message": "Vibe Commerce API is running",
  "timestamp": "..."
}
```

## Default URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017/vibe-commerce`

## Need Help?

Check the main README.md for detailed documentation and API reference.

---

**Happy Shopping!** 🛍️
