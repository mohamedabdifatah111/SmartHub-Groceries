// ─── src/components/Footer.js ─────────────────────────────────────────────────
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { contactAPI } from '../services/api';
import '../styles/components.css';

const Footer = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  // ── Contact form ────────────────────────────────────────────────────────────
  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await contactAPI.send(form.name, form.email, form.message);
      toast.success("Message sent! We'll get back to you soon.", { icon: '✉️' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  // ── Newsletter ──────────────────────────────────────────────────────────────
  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletter) return;
    setSubscribing(true);
    try {
      await contactAPI.subscribe(newsletter);
      toast.success('Subscribed! Check your inbox for a welcome email.', { icon: '📧' });
      setNewsletter('');
    } catch (err) {
      toast.error(err.message || 'Subscription failed. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4 mb-4">

          {/* Brand + Newsletter */}
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

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: 6 }}>
              <input type="email" placeholder="Your email…" value={newsletter}
                onChange={e => setNewsletter(e.target.value)} required
                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: '0.82rem', outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
              <button type="submit" disabled={subscribing}
                style={{ background: '#6abf69', border: 'none', color: 'white', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: '0.82rem', fontFamily: 'DM Sans, sans-serif' }}>
                {subscribing ? '…' : 'Sub'}
              </button>
            </form>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 5 }}>
              Subscribe for deals & updates
            </div>

            <div className="social-icons mt-3">
              {[['bi-facebook','#'], ['bi-twitter-x','#'], ['bi-instagram','#'], ['bi-whatsapp','#']].map(([icon, href]) => (
                <a key={icon} href={href} className="social-icon"><i className={`bi ${icon}`}></i></a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            {[['Home', '/'], ['Shop', '/products'], ['Cart', '/cart'], ['Login', '/login'], ['Register', '/register']].map(([label, path]) => (
              <button key={label} className="footer-link" onClick={() => navigate(path)}>
                <i className="bi bi-chevron-right me-1" style={{ fontSize: '0.7rem' }}></i>{label}
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
              <div><i className="bi bi-geo-alt me-2"></i>Wakulima market</div>
              <div style={{ paddingLeft: 20 }}>Nairobi, Kenya</div>
              <div><i className="bi bi-telephone me-2"></i>+254 724 294  617</div>
              <div><i className="bi bi-envelope me-2"></i>hello@smarthub.co.ke</div>
              <div><i className="bi bi-clock me-2"></i>Mon–Sat: 8am–8pm</div>
              <div style={{ paddingLeft: 20 }}>Sun: 9am–5pm</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-3 col-md-12">
            <h5>Get In Touch</h5>
            <form className="footer-contact-form" onSubmit={handleContact}>
              <input type="text" placeholder="Your name" required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input type="email" placeholder="Email address" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <textarea rows={3} placeholder="Your message…" required style={{ resize: 'none' }}
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              <button type="submit" className="footer-submit" disabled={sending}>
                {sending
                  ? <><span className="spinner-border spinner-border-sm me-2" style={{ width: 12, height: 12 }}></span>Sending…</>
                  : <>Send Message <i className="bi bi-send ms-1"></i></>
                }
              </button>
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
