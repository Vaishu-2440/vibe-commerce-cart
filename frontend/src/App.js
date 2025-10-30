import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import {
  getProducts,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  checkout,
} from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [addingProduct, setAddingProduct] = useState(null);
  const [processingCheckout, setProcessingCheckout] = useState(false);

  // Fetch products and cart on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, cartData] = await Promise.all([
        getProducts(),
        getCart(),
      ]);
      
      if (productsData.success) {
        setProducts(productsData.data);
      }
      
      if (cartData.success) {
        setCart(cartData.data);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please make sure the backend server is running.');
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      setAddingProduct(product.id);
      const response = await addToCart(product.id, 1);
      
      if (response.success) {
        setCart(response.data);
        toast.success(`${product.name} added to cart!`);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add item to cart');
    } finally {
      setAddingProduct(null);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await updateCartItem(productId, newQuantity);
      if (response.success) {
        setCart(response.data);
        toast.success('Cart updated');
      }
    } catch (err) {
      console.error('Error updating cart:', err);
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      if (response.success) {
        setCart(response.data);
        toast.success('Item removed from cart');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutSubmit = async (name, email) => {
    try {
      setProcessingCheckout(true);
      const response = await checkout(name, email, cart.items);
      
      if (response.success) {
        setReceipt(response.data);
        setIsCheckoutModalOpen(false);
        setIsReceiptModalOpen(true);
        setCart({ items: [], total: 0 });
        toast.success('Order placed successfully!');
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      toast.error('Failed to process checkout');
    } finally {
      setProcessingCheckout(false);
    }
  };

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <h2>Loading Vibe Commerce...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>⚠️ {error}</h2>
          <button
            onClick={fetchData}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4757',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="container">
        <header className="header">
          <h1>🛍️ Vibe Commerce</h1>
          <div className="header-right">
            <button
              className="cart-button"
              onClick={() => setIsCartOpen(true)}
            >
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </header>

        <main className="products-section">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isAdding={addingProduct === product.id}
              />
            ))}
          </div>
        </main>
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSubmit={handleCheckoutSubmit}
        isProcessing={processingCheckout}
      />

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        receipt={receipt}
      />
    </div>
  );
}

export default App;
