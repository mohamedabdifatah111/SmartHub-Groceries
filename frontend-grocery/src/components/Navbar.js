import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = ({ onSearch }) => {
  const { cartCount, openSidebar } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (val) => {
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar-main">
        <div className="navbar-inner">
          <a href="/" className="navbar-brand" onClick={e => { e.preventDefault(); navigate('/'); }}>
            <div className="brand-icon">🛒</div>
            <div className="brand-text">
              <div className="name">SmartHub</div>
              <div className="tag">Groceries</div>
            </div>
          </a>

          <div className="navbar-search">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder="Search fresh produce, dairy, snacks…"
              value={query}
              onChange={e => handleSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
            {query && (
              <button className="clear-btn" onClick={() => handleSearch('')}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          <div className="navbar-actions">
            <button className="nav-link-btn" onClick={() => navigate('/')}>
              <i className="bi bi-house"></i> Home
            </button>
            <button className="nav-link-btn" onClick={() => navigate('/products')}>
              <i className="bi bi-grid"></i> Shop
            </button>
            {isLoggedIn ? (
              <button className="nav-link-btn" onClick={() => { logout(); navigate('/'); }}>
                <i className="bi bi-person-check"></i> {user?.name?.split(' ')[0]}
              </button>
            ) : (
              <button className="nav-link-btn" onClick={() => navigate('/login')}>
                <i className="bi bi-person"></i> Login
              </button>
            )}
            <button className="cart-btn" onClick={openSidebar}>
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              <span>Cart</span>
            </button>
          </div>

          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <i className={`bi bi-${mobileOpen ? 'x' : 'list'}`}></i>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <input
          className="mobile-menu-search"
          placeholder="Search products…"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />
        <button className="mobile-nav-link" onClick={() => { navigate('/'); setMobileOpen(false); }}>🏠 Home</button>
        <button className="mobile-nav-link" onClick={() => { navigate('/products'); setMobileOpen(false); }}>🛍 Shop</button>
        <button className="mobile-nav-link" onClick={() => { navigate('/cart'); setMobileOpen(false); }}>🛒 Cart ({cartCount})</button>
        {isLoggedIn
          ? <button className="mobile-nav-link" onClick={() => { logout(); setMobileOpen(false); }}>👤 Logout ({user?.name})</button>
          : <button className="mobile-nav-link" onClick={() => { navigate('/login'); setMobileOpen(false); }}>👤 Login</button>
        }
        {!isLoggedIn && <button className="mobile-nav-link" onClick={() => { navigate('/register'); setMobileOpen(false); }}>📝 Register</button>}
      </div>
    </>
  );
};

export default Navbar;
