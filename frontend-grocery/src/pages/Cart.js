import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/pages.css';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  return (
    <div className="page-wrapper">
      <div style={{ background: '#1e4d2b', padding: '32px 0', color: 'white', marginBottom: 32 }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Fraunces, serif', marginBottom: 4 }}>🛒 Shopping Cart</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container pb-5">
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
            <h3 style={{ fontFamily: 'Fraunces, serif', color: '#1a3d22', marginBottom: 8 }}>Your cart is empty</h3>
            <p style={{ color: '#6c757d', marginBottom: 28 }}>Add some fresh groceries to get started!</p>
            <button className="btn-primary-green" onClick={() => navigate('/products')}>
              <i className="bi bi-shop me-2"></i>Start Shopping
            </button>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 style={{ fontFamily: 'Fraunces, serif', color: '#1a3d22' }}>Cart Items</h5>
                <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif' }}>
                  <i className="bi bi-trash me-1"></i>Clear All
                </button>
              </div>
              {items.map(item => (
                <div key={item.id} className="cart-page-item">
                  <img className="cart-page-img" src={item.image} alt={item.name} />
                  <div className="cart-page-info">
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', fontWeight: 700, color: '#1a3d22', marginBottom: 2 }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#2e7d32', fontWeight: 600, marginBottom: 2 }}>{item.category}</div>
                    <div style={{ fontSize: '0.82rem', color: '#6c757d' }}>{item.unit}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1a3d22' }}>${(item.price * item.quantity).toFixed(2)}</div>
                    <div style={{ fontSize: '0.78rem', color: '#6c757d' }}>${item.price.toFixed(2)} each</div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 18, padding: '0 4px', alignSelf: 'flex-start' }}>
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="order-summary-card">
                <h5>Order Summary</h5>
                <div className="summary-row"><span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="summary-row"><span>Delivery</span><span style={{ color: '#2e7d32', fontWeight: 600 }}>FREE</span></div>
                <div className="summary-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-row summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button className="checkout-btn" style={{ marginTop: 20 }} onClick={() => navigate('/checkout')}>
                  Proceed to Checkout <i className="bi bi-arrow-right ms-1"></i>
                </button>
                <button onClick={() => navigate('/products')} style={{ width: '100%', background: 'none', border: '2px solid #e9ecef', borderRadius: 12, padding: '11px', marginTop: 10, cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', color: '#6c757d' }}>
                  <i className="bi bi-arrow-left me-1"></i>Continue Shopping
                </button>

                <div style={{ marginTop: 20, padding: 14, background: '#e8f5e9', borderRadius: 10 }}>
                  <div style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: '#1a3d22' }}>
                    <i className="bi bi-shield-check" style={{ fontSize: 18 }}></i>
                    <span>Secure checkout powered by SmartHub. Your data is safe.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
