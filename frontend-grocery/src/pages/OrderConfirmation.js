import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/pages.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderNum = state?.orderNum || 'SH-000000';
  const total = state?.total || '0.00';
  const email = state?.email || '';
  const estimated = new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="page-wrapper confirm-page">
      <div className="container">
        <div className="confirm-card mx-auto">
          <div className="confirm-icon">✅</div>
          <h1 className="confirm-title">Order Confirmed!</h1>
          <p className="confirm-sub">
            Thank you for shopping with SmartHub Groceries.{email && ` A confirmation has been sent to ${email}.`}
          </p>

          <div className="confirm-details">
            <div className="confirm-row">
              <span style={{ color: '#6c757d' }}>Order Number</span>
              <span style={{ fontWeight: 700, color: '#1a3d22' }}>{orderNum}</span>
            </div>
            <div className="confirm-row">
              <span style={{ color: '#6c757d' }}>Order Total</span>
              <span style={{ fontWeight: 700, color: '#1a3d22' }}>${total}</span>
            </div>
            <div className="confirm-row">
              <span style={{ color: '#6c757d' }}>Estimated Delivery</span>
              <span style={{ fontWeight: 700, color: '#2e7d32' }}>Today by {estimated}</span>
            </div>
            <div className="confirm-row">
              <span style={{ color: '#6c757d' }}>Status</span>
              <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '3px 10px', borderRadius: 99, fontWeight: 600, fontSize: '0.8rem' }}>Processing</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
            <button className="btn-primary-green w-100" style={{ justifyContent: 'center' }} onClick={() => navigate('/products')}>
              <i className="bi bi-bag me-2"></i>Continue Shopping
            </button>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: '2px solid #e9ecef', borderRadius: 12, padding: '12px', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', color: '#6c757d' }}>
              Back to Home
            </button>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f8f9fa', borderRadius: 10 }}>
            <p style={{ fontSize: '0.82rem', color: '#6c757d', margin: 0, textAlign: 'center' }}>
              Need help? Call us at <strong>+254 700 123 456</strong> or email <strong>hello@smarthub.co.ke</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
