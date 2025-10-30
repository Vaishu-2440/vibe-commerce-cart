import React from 'react';

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal receipt" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <h3>Thank you for your purchase</h3>
        
        <div className="receipt-details">
          <div className="receipt-row">
            <span>Order ID:</span>
            <strong>{receipt.orderId}</strong>
          </div>
          <div className="receipt-row">
            <span>Name:</span>
            <span>{receipt.customerName}</span>
          </div>
          <div className="receipt-row">
            <span>Email:</span>
            <span>{receipt.customerEmail}</span>
          </div>
          <div className="receipt-row">
            <span>Date:</span>
            <span>{new Date(receipt.timestamp).toLocaleString()}</span>
          </div>
          <div className="receipt-row">
            <span>Items:</span>
            <span>{receipt.items.length}</span>
          </div>
          <div className="receipt-row">
            <span>Total Amount:</span>
            <strong style={{ color: '#667eea', fontSize: '1.3rem' }}>
              ₹{receipt.total.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>
        
        <p style={{ color: '#636e72', marginBottom: '20px' }}>
          A confirmation email has been sent to {receipt.customerEmail}
        </p>
        
        <button className="close-receipt-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
