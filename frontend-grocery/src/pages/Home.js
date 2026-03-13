import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products, categories } from '../data/products';
import '../styles/pages.css';

const features = [
  { icon: '🚚', title: 'Free Delivery', desc: 'On orders above $30' },
  { icon: '🌿', title: '100% Organic', desc: 'Certified fresh produce' },
  { icon: '⏱', title: '2-Hour Delivery', desc: 'Same-day in Nairobi' },
  { icon: '🔄', title: 'Easy Returns', desc: 'No questions asked' },
];

const Home = () => {
  const navigate = useNavigate();
  const featured = products.filter(p => p.featured).slice(0, 8);
  const popular = products.filter(p => p.popular).slice(0, 4);

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 fade-in-up">
              <div className="hero-eyebrow">Fresh Delivered Daily</div>
              <h1 className="hero-title">
                Your Freshest <span>Grocery</span> Store Online
              </h1>
              <p className="hero-desc">
                Hand-picked produce, farm-fresh dairy, and pantry staples delivered straight to your door. Quality you can taste.
              </p>
              <div className="hero-ctas">
                <button className="hero-cta-primary" onClick={() => navigate('/products')}>
                  Shop Now <i className="bi bi-arrow-right ms-1"></i>
                </button>
                <button className="hero-cta-secondary" onClick={() => navigate('/products?category=Fruits')}>
                  🍎 Browse Produce
                </button>
              </div>
              <div className="hero-badges">
                {['🚚 Free Delivery', '🌿 Organic Options', '⭐ 4.8 Rated'].map(b => (
                  <span key={b} className="hero-badge">{b}</span>
                ))}
              </div>
            </div>
            <div className="col-lg-6 fade-in-up stagger-2">
              <div className="hero-image-wrap">
                <img
                  className="hero-main-img"
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=85"
                  alt="Fresh Groceries"
                />
                <div className="hero-floating-card">
                  <div className="icon">🛍</div>
                  <div>
                    <div className="label">Happy Customers</div>
                    <div className="value">12,000+ Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="features-strip">
        <div className="container">
          <div className="row g-3">
            {features.map((f, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="feature-item">
                  <div className="feature-icon">{f.icon}</div>
                  <div>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle mb-0">Find everything you need in one place</p>
            </div>
            <button className="btn-outline-green d-none d-md-block" style={{ fontSize: '0.85rem', padding: '8px 20px' }} onClick={() => navigate('/products')}>
              View All
            </button>
          </div>
          <div className="row g-3">
            {categories.map((cat, i) => (
              <div key={cat.id} className={`col-6 col-md-4 col-lg-2 fade-in-up stagger-${(i % 4) + 1}`}>
                <CategoryCard category={cat} onClick={() => navigate(`/products?category=${cat.name}`)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="py-2">
        <div className="container">
          <div className="promo-banner">
            <div>
              <p className="promo-title">Fresh Deals Every Week! 🎉</p>
              <p className="promo-sub">Up to 30% off on selected organic produce. Limited time offer.</p>
            </div>
            <button className="promo-btn" onClick={() => navigate('/products?category=Fruits')}>
              Grab the Deal <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle mb-0">Handpicked favorites from our store</p>
            </div>
            <button className="btn-outline-green d-none d-md-block" style={{ fontSize: '0.85rem', padding: '8px 20px' }} onClick={() => navigate('/products')}>
              View All
            </button>
          </div>
          <div className="row g-3">
            {featured.map((product, i) => (
              <div key={product.id} className={`col-6 col-md-4 col-lg-3 stagger-${(i % 4) + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="py-3 pb-5" style={{ background: 'white' }}>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="section-title">🔥 Most Popular</h2>
              <p className="section-subtitle mb-0">What our customers love most</p>
            </div>
          </div>
          <div className="row g-3">
            {popular.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND PROMO */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1a3d22, #2d7a3a)' }}>
        <div className="container text-center text-white">
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', marginBottom: 12 }}>
            Download Our App & Get <span style={{ color: '#6abf69' }}>20% Off</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Order groceries on the go. Exclusive app-only deals, real-time order tracking, and faster checkout.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button style={{ background: 'white', color: '#1a3d22', border: 'none', padding: '12px 28px', borderRadius: 99, fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-apple" style={{ fontSize: 18 }}></i> App Store
            </button>
            <button style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '12px 28px', borderRadius: 99, fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-google-play" style={{ fontSize: 18 }}></i> Google Play
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
