# MongoDB Compass Guide for Vibe Commerce Cart

This guide shows you how to use **MongoDB Compass** to visualize and manage your shopping cart database.

---

## 🎯 Quick Start

### Connect to Your Database

1. **Open MongoDB Compass**
2. **Connection String**: 
   ```
   mongodb://localhost:27017
   ```
3. Click **Connect**

If connection succeeds → MongoDB is running! ✅

---

## 📊 Database Structure

### Database Name
```
vibe-commerce
```

### Collections (3 total)

#### 1. **products** Collection
Contains 10 mock e-commerce products.

**Fields**:
- `id` - Product ID (1-10)
- `name` - Product name
- `price` - Product price
- `description` - Product description
- `image` - Product image URL
- `category` - Product category
- `stock` - Available stock
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "id": 1,
  "name": "Wireless Bluetooth Headphones",
  "price": 79.99,
  "description": "Premium noise-cancelling wireless headphones...",
  "image": "https://images.unsplash.com/...",
  "category": "Electronics",
  "stock": 50,
  "createdAt": "2024-10-29T...",
  "updatedAt": "2024-10-29T..."
}
```

#### 2. **carts** Collection
Stores shopping cart data (one cart per user).

**Fields**:
- `userId` - User identifier (mock-user-1)
- `items` - Array of cart items
  - `productId` - Product ID
  - `name` - Product name
  - `price` - Product price
  - `quantity` - Item quantity
  - `image` - Product image
- `total` - Cart total (auto-calculated)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "userId": "mock-user-1",
  "items": [
    {
      "productId": 1,
      "name": "Wireless Bluetooth Headphones",
      "price": 79.99,
      "quantity": 2,
      "image": "https://...",
      "_id": ObjectId("...")
    }
  ],
  "total": 159.98,
  "createdAt": "2024-10-29T...",
  "updatedAt": "2024-10-29T..."
}
```

#### 3. **orders** Collection
Stores completed orders.

**Fields**:
- `orderId` - Unique order ID (ORD-timestamp-random)
- `customerName` - Customer name
- `customerEmail` - Customer email
- `items` - Array of ordered items
- `total` - Order total
- `status` - Order status (completed)
- `timestamp` - Order timestamp
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

**Sample Document**:
```json
{
  "_id": ObjectId("..."),
  "orderId": "ORD-1698567890123-ABC12XYZ9",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "items": [
    {
      "productId": 1,
      "name": "Wireless Bluetooth Headphones",
      "price": 79.99,
      "quantity": 2
    }
  ],
  "total": 159.98,
  "status": "completed",
  "timestamp": "2024-10-29T...",
  "createdAt": "2024-10-29T...",
  "updatedAt": "2024-10-29T..."
}
```

---

## 🔄 Watching Real-Time Changes

### Initial Setup
1. Seed database: `npm run seed` (in backend folder)
2. In Compass, refresh databases
3. Open `vibe-commerce` database
4. You should see 3 collections

### During Application Use

#### When Adding Items to Cart
1. Add item in the web app
2. In Compass, go to `carts` collection
3. Click refresh 🔄
4. You'll see:
   - New cart document created (if first item)
   - Or existing cart updated with new item
   - `total` field automatically calculated

#### When Updating Quantities
1. Change quantity in cart (+ or - buttons)
2. Refresh `carts` collection
3. Watch:
   - Item `quantity` updates
   - `total` recalculates
   - `updatedAt` timestamp changes

#### When Removing Items
1. Remove item in cart
2. Refresh `carts` collection
3. Observe:
   - Item removed from `items` array
   - `total` decreases
   - If no items left, cart becomes empty

#### When Completing Checkout
1. Complete checkout with name/email
2. Refresh both collections:
   - **orders**: New order document appears
   - **carts**: Cart items cleared (empty array)

---

## 🔍 Useful Compass Features

### 1. Filter Documents

Click the filter bar and use MongoDB query syntax:

**Find Electronics**:
```json
{ "category": "Electronics" }
```

**Find Products Over $50**:
```json
{ "price": { "$gt": 50 } }
```

**Find Recent Orders**:
```json
{ "timestamp": { "$gte": "2024-10-29" } }
```

**Find Cart for Specific User**:
```json
{ "userId": "mock-user-1" }
```

### 2. Sort Documents

Click column headers to sort:
- Sort by price (ascending/descending)
- Sort by timestamp (newest first)
- Sort by name (alphabetical)

### 3. View Options

- **List View**: Compact list of documents
- **JSON View**: Raw JSON format
- **Table View**: Spreadsheet-like view

### 4. Export Data

1. Select collection
2. Click "Export Collection"
3. Choose format (JSON or CSV)
4. Save for backup or analysis

### 5. Import Data

1. Select collection
2. Click "Add Data" → "Import File"
3. Choose JSON or CSV file
4. Map fields and import

---

## 🛠️ Common Tasks

### Reset Database (Fresh Start)

**Method 1: Drop entire database**
1. Right-click `vibe-commerce` database
2. Click "Drop Database"
3. Confirm deletion
4. Run `npm run seed` to recreate with fresh data

**Method 2: Drop specific collection**
1. Right-click collection (e.g., `orders`)
2. Click "Drop Collection"
3. Confirm deletion

### Clear All Orders
1. Go to `orders` collection
2. Select all documents
3. Click "Delete" (trash icon)
4. Confirm deletion

### Clear Cart
1. Go to `carts` collection
2. Find the cart document
3. Delete it OR
4. Edit it to set `items: []` and `total: 0`

### Add New Product Manually
1. Go to `products` collection
2. Click "Insert Document"
3. Add fields:
```json
{
  "id": 11,
  "name": "Your Product Name",
  "price": 99.99,
  "description": "Product description",
  "image": "https://...",
  "category": "Category Name",
  "stock": 100
}
```
4. Click "Insert"

---

## 📈 Monitoring Tips

### Performance
- Use Compass's **Explain Plan** to optimize queries
- Check **Indexes** tab for query optimization
- Monitor **Schema** tab to understand data structure

### Debugging
- Check `updatedAt` timestamps to verify recent changes
- Compare web app cart with database cart
- Verify `total` calculation matches item prices × quantities

### Data Integrity
- Ensure all products have valid `id` fields
- Check that cart `productId` matches actual products
- Verify order totals match sum of items

---

## 🎓 Advanced Features

### Create Index for Better Performance
1. Go to `products` collection
2. Click "Indexes" tab
3. Click "Create Index"
4. Add field: `{ "id": 1 }`
5. This speeds up product lookups by ID

### Aggregation Pipeline
Use Compass's aggregation builder to:
- Calculate total sales from orders
- Find most popular products
- Get average order value

**Example: Total Revenue**
```json
[
  {
    "$group": {
      "_id": null,
      "totalRevenue": { "$sum": "$total" }
    }
  }
]
```

### Validation Rules
Ensure data quality by adding schema validation:
1. Database Tools → Validation
2. Set validation rules for required fields
3. Prevent invalid data entry

---

## 🚨 Troubleshooting

### "Unable to connect to server"
**Solution**:
- Ensure MongoDB service is running
- Windows: `net start MongoDB`
- Check if port 27017 is open
- Verify no firewall blocking

### "Database not showing"
**Solution**:
- Click refresh button
- Disconnect and reconnect
- Ensure backend has run `npm run seed`

### "Collections are empty"
**Solution**:
- Run `npm run seed` in backend folder
- Check terminal for success message
- Refresh Compass

### "Data not updating"
**Solution**:
- Click refresh 🔄 button
- Disconnect and reconnect
- Ensure backend server is running
- Check backend console for errors

---

## 📚 Resources

- [MongoDB Compass Documentation](https://www.mongodb.com/docs/compass/)
- [MongoDB Query Syntax](https://www.mongodb.com/docs/manual/tutorial/query-documents/)
- [Aggregation Pipeline](https://www.mongodb.com/docs/manual/aggregation/)

---

## ✨ Quick Reference

| Action | Steps |
|--------|-------|
| Connect | `mongodb://localhost:27017` |
| View Products | `vibe-commerce` → `products` |
| View Cart | `vibe-commerce` → `carts` |
| View Orders | `vibe-commerce` → `orders` |
| Refresh Data | Click 🔄 button |
| Filter | Click filter bar, enter query |
| Drop Database | Right-click → Drop Database |
| Export | Collection menu → Export |

---

**Happy Database Monitoring!** 🎉

Use MongoDB Compass to gain insights into your e-commerce application's data flow and ensure everything works perfectly.
