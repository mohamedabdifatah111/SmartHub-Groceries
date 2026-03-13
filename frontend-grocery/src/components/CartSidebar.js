import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/components.css';

const CartSidebar = () => {
  const { items, isOpen, closeSidebar, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeSidebar} />
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3><i className="bi bi-cart3 me-2"></i>Your Cart ({items.length})</h3>
          <button className="cart-close" onClick={closeSidebar}><i className="bi bi-x-lg"></i></button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p style={{ fontWeight: 600, marginBottom: 6, color: '#343a40' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Add some fresh groceries!</p>
              <button className="btn-primary-green mt-3" style={{ fontSize: '0.88rem', padding: '10px 20px' }} onClick={() => { closeSidebar(); navigate('/products'); }}>
                Shop Now
              </button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img className="cart-item-img" src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="qty-controls mt-1">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
              <div style={{ marginTop: 12 }}>
                <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#c0392b', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                  <i className="bi bi-trash me-1"></i>Clear cart
                </button>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="cart-total-row"><span>Delivery</span><span style={{ color: '#2e7d32', fontWeight: 600 }}>FREE</span></div>
            <div className="cart-total-row"><span>Tax (8%)</span><span>${(cartTotal * 0.08).toFixed(2)}</span></div>
            <div className="cart-total-row grand"><span>Total</span><span>${(cartTotal * 1.08).toFixed(2)}</span></div>
            <button className="checkout-btn" onClick={() => { closeSidebar(); navigate('/checkout'); }}>
              Proceed to Checkout <i className="bi bi-arrow-right ms-1"></i>
            </button>
            <button onClick={() => { closeSidebar(); navigate('/cart'); }} style={{ width: '100%', background: 'none', border: '2px solid #e9ecef', borderRadius: 12, padding: '11px', marginTop: 8, cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', color: '#6c757d' }}>
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
