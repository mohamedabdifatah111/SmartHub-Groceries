import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/components.css';

const Footer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.', { icon: '✉️' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4 mb-4">

          {/* Brand */}
          <div className="col-lg-3 col-md-6">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ background: '#6abf69', width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛒</div>
              <div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', color: 'white', fontWeight: 700 }}>SmartHub</div>
                <div style={{ fontSize: '0.65rem', color: '#6abf69', letterSpacing: 1, textTransform: 'uppercase' }}>Groceries</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 16 }}>
              Fresh groceries delivered to your doorstep. Quality produce, unbeatable prices.
            </p>
            <div className="social-icons">
              <a href="#!" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="#!" className="social-icon"><i className="bi bi-twitter-x"></i></a>
              <a href="#!" className="social-icon"><i className="bi bi-instagram"></i></a>
              <a href="#!" className="social-icon"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            {['Home', 'Shop', 'Cart', 'Login', 'Register'].map(link => (
              <button key={link} className="footer-link" onClick={() => navigate(`/${link === 'Home' ? '' : link.toLowerCase()}`)}>
                <i className="bi bi-chevron-right me-1" style={{ fontSize: '0.7rem' }}></i>{link}
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6">
            <h5>Categories</h5>
            {['Fruits', 'Vegetables', 'Dairy', 'Juices', 'Snacks', 'Household'].map(cat => (
              <button key={cat} className="footer-link" onClick={() => navigate(`/products?category=${cat}`)}>
                <i className="bi bi-chevron-right me-1" style={{ fontSize: '0.7rem' }}></i>{cat}
              </button>
            ))}
          </div>

          {/* Store Info */}
          <div className="col-lg-2 col-md-6">
            <h5>Store Info</h5>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}>
              <div><i className="bi bi-geo-alt me-2"></i>Wakulima Market</div>
              <div style={{ paddingLeft: 20 }}>Nairobi, Kenya</div>
              <div><i className="bi bi-telephone me-2"></i>+254 724 294 617</div>
              <div><i className="bi bi-envelope me-2"></i>hello@smarthub.co.ke</div>
              <div><i className="bi bi-clock me-2"></i>Mon–Sat: 8am–8pm</div>
              <div style={{ paddingLeft: 20 }}>Sun: 9am–5pm</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-3 col-md-12">
            <h5>Get In Touch</h5>
            <form className="footer-contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              <textarea rows={3} placeholder="Your message…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: 'none' }} />
              <button type="submit" className="footer-submit">Send Message <i className="bi bi-send ms-1"></i></button>
            </form>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="footer-bottom">
          <span>© 2026 SmartHub Groceries. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
