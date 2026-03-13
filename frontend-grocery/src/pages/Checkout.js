import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/pages.css';

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: '', cardNum: '', cardExp: '', cardCvv: '' });
  const [loading, setLoading] = useState(false);
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      clearCart();
      navigate('/order-confirmation', { state: { orderNum: `SH-${Date.now().toString().slice(-6)}`, total: total.toFixed(2), email: form.email } });
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="page-wrapper" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: 56 }}>🛒</div>
        <h3 style={{ fontFamily: 'Fraunces, serif', marginTop: 16, marginBottom: 8 }}>Your cart is empty</h3>
        <button className="btn-primary-green mt-2" onClick={() => navigate('/products')}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div style={{ background: '#1e4d2b', padding: '32px 0', color: 'white', marginBottom: 32 }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Fraunces, serif', marginBottom: 4 }}>Checkout</h1>
          <div style={{ display: 'flex', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
            <span style={{ color: '#6abf69', fontWeight: 600 }}>✓ Cart</span>
            <span>›</span><span style={{ color: 'white', fontWeight: 600 }}>Delivery & Payment</span>
            <span>›</span><span>Confirmation</span>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-lg-8">
              {/* Delivery */}
              <div className="checkout-form-card">
                <h4 className="checkout-section-title"><i className="bi bi-geo-alt me-2"></i>Delivery Information</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, display: 'block' }}>First Name *</label>
                    <input name="firstName" required className="form-control-custom" placeholder="John" value={form.firstName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, display: 'block' }}>Last Name *</label>
                    <input name="lastName" required className="form-control-custom" placeholder="Doe" value={form.lastName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, display: 'block' }}>Email Address *</label>
                    <input type="email" name="email" required className="form-control-custom" placeholder="john@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, display: 'block' }}>Phone Number *</label>
                    <input name="phone" required className="form-control-custom" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, display: 'block' }}>Street Address *</label>
                    <input name="address" required className="form-control-custom" placeholder="123 Market Street, Apt 4B" value={form.address} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, display: 'block' }}>City *</label>
                    <input name="city" required className="form-control-custom" placeholder="Nairobi" value={form.city} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, display: 'block' }}>Postal Code</label>
                    <input name="zip" className="form-control-custom" placeholder="00100" value={form.zip} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="checkout-form-card">
                <h4 className="checkout-section-title"><i className="bi bi-credit-card me-2"></i>Payment Method</h4>
                {[
                  { id: 'card', icon: 'bi-credit-card-2-front', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
                  { id: 'mpesa', icon: 'bi-phone', label: 'M-Pesa', sub: 'Mobile money payment' },
                  { id: 'cod', icon: 'bi-cash-coin', label: 'Cash on Delivery', sub: 'Pay when you receive' },
                ].map(m => (
                  <div key={m.id} className={`payment-method ${payment === m.id ? 'selected' : ''}`} onClick={() => setPayment(m.id)}>
                    <div style={{ width: 18, height: 18, borderRadius: 99, border: `2px solid ${payment === m.id ? '#1e4d2b' : '#ced4da'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {payment === m.id && <div style={{ width: 9, height: 9, borderRadius: 99, background: '#1e4d2b' }}></div>}
                    </div>
                    <i className={`bi ${m.icon}`} style={{ fontSize: 20, color: payment === m.id ? '#1e4d2b' : '#6c757d' }}></i>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{m.label}</div>
                      <div style={{ fontSize: '0.78rem', color: '#6c757d' }}>{m.sub}</div>
                    </div>
                  </div>
                ))}

                {payment === 'card' && (
                  <div className="row g-3 mt-2">
                    <div className="col-12">
                      <input name="cardNum" className="form-control-custom" placeholder="Card number (e.g. 4111 1111 1111 1111)" value={form.cardNum} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                      <input name="cardExp" className="form-control-custom" placeholder="MM / YY" value={form.cardExp} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                      <input name="cardCvv" className="form-control-custom" placeholder="CVV" value={form.cardCvv} onChange={handleChange} />
                    </div>
                  </div>
                )}
                {payment === 'mpesa' && (
                  <div className="mt-2">
                    <input name="phone" className="form-control-custom" placeholder="M-Pesa number (e.g. 0712 345 678)" value={form.phone} onChange={handleChange} />
                    <p style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: 6 }}>You'll receive a push notification to complete payment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="col-lg-4">
              <div className="order-summary-card">
                <h5>Order Summary</h5>
                <div style={{ maxHeight: 260, overflowY: 'auto', marginBottom: 16 }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
                      <img src={item.image} alt={item.name} style={{ width: 46, height: 46, borderRadius: 8, objectFit: 'cover' }} />
                      <div style={{ flex: 1, fontSize: '0.85rem' }}>
                        <div style={{ fontWeight: 600, color: '#1a3d22' }}>{item.name}</div>
                        <div style={{ color: '#6c757d' }}>x{item.quantity}</div>
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="summary-row"><span>Delivery</span><span style={{ color: '#2e7d32', fontWeight: 600 }}>FREE</span></div>
                <div className="summary-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-row summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button type="submit" className="place-order-btn" style={{ marginTop: 20 }} disabled={loading}>
                  {loading ? <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Placing Order…</> : <>Place Order · ${total.toFixed(2)} <i className="bi bi-check-circle ms-1"></i></>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
