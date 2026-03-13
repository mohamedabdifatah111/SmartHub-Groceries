import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/pages.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [agree, setAgree] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (!agree) { toast.error('Please accept the terms'); return; }
    register({ name: form.name, email: form.email });
    toast.success('Account created! Welcome to SmartHub 🎉', { icon: '🛒' });
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div style={{ background: '#1e4d2b', width: 50, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 10px' }}>🛒</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', color: '#1e4d2b', fontWeight: 700 }}>SmartHub Groceries</div>
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Join thousands of happy shoppers</p>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Full Name</label>
          <input type="text" required className="auth-input" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <label className="auth-label">Email Address</label>
          <input type="email" required className="auth-input" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <label className="auth-label">Password</label>
          <input type="password" required minLength={6} className="auth-input" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <label className="auth-label">Confirm Password</label>
          <input type="password" required className="auth-input" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 18, fontSize: '0.83rem', color: '#6c757d' }}>
            <input type="checkbox" id="agree" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 2, accentColor: '#1e4d2b', width: 15, height: 15 }} />
            <label htmlFor="agree">I agree to the <span style={{ color: '#1e4d2b', fontWeight: 600, cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#1e4d2b', fontWeight: 600, cursor: 'pointer' }}>Privacy Policy</span></label>
          </div>

          <button type="submit" className="auth-btn">Create Account <i className="bi bi-person-plus ms-1"></i></button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.88rem', color: '#6c757d' }}>
          Already have an account?{' '}
          <span style={{ color: '#1e4d2b', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign in</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
