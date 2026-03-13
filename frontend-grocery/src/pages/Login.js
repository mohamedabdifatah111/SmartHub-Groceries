import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/pages.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: form.email.split('@')[0], email: form.email });
    toast.success('Welcome back!', { icon: '👋' });
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div style={{ background: '#1e4d2b', width: 50, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 10px' }}>🛒</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', color: '#1e4d2b', fontWeight: 700 }}>SmartHub Groceries</div>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Sign in to your account to continue shopping</p>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Email Address</label>
          <input type="email" required className="auth-input" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <label className="auth-label">Password</label>
          <input type="password" required className="auth-input" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <div style={{ textAlign: 'right', marginBottom: 16, marginTop: -8 }}>
            <span style={{ fontSize: '0.82rem', color: '#1e4d2b', cursor: 'pointer', fontWeight: 600 }}>Forgot password?</span>
          </div>
          <button type="submit" className="auth-btn">Sign In <i className="bi bi-arrow-right ms-1"></i></button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.88rem', color: '#6c757d' }}>
          Don't have an account?{' '}
          <span style={{ color: '#1e4d2b', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/register')}>Create one</span>
        </div>

        <div style={{ position: 'relative', textAlign: 'center', margin: '20px 0', color: '#aaa', fontSize: '0.82rem' }}>
          <hr />
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'white', padding: '0 10px' }}>or continue with</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {[{ icon: 'bi-google', label: 'Google' }, { icon: 'bi-facebook', label: 'Facebook' }].map(s => (
            <button key={s.label} style={{ flex: 1, background: 'white', border: '2px solid #e9ecef', borderRadius: 10, padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.88rem', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#1e4d2b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e9ecef'}>
              <i className={`bi ${s.icon}`} style={{ fontSize: 16 }}></i> {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
