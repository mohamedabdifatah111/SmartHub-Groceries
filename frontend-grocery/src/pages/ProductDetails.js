import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../styles/pages.css';

const badgeClass = { Sale: 'badge-sale', Organic: 'badge-organic', Fresh: 'badge-fresh', New: 'badge-new' };

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items, updateQuantity } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div className="page-wrapper" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 64 }}>😕</div>
      <h2 style={{ fontFamily: 'Fraunces, serif', marginTop: 16 }}>Product not found</h2>
      <button className="btn-primary-green mt-3" onClick={() => navigate('/products')}>Back to Shop</button>
    </div>
  );

  const cartItem = items.find(i => i.id === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAddQty = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${qty}× ${product.name} added to cart!`, { icon: '🛒', autoClose: 2000 });
  };

  return (
    <div className="page-wrapper">
      <div className="container py-4">
        <nav style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: 24 }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">/</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>Products</span>
          <span className="mx-2">/</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/products?category=${product.category}`)}>{product.category}</span>
          <span className="mx-2">/</span>
          <span style={{ color: '#1e4d2b', fontWeight: 600 }}>{product.name}</span>
        </nav>

        <div className="row g-4 align-items-start">
          <div className="col-md-5 fade-in-up">
            <div className="product-detail-img-wrap">
              <img src={product.image} alt={product.name} />
            </div>
            {product.badge && (
              <div className="mt-2">
                <span className={`product-badge ${badgeClass[product.badge] || ''}`} style={{ position: 'static', display: 'inline-block' }}>
                  {product.badge}
                </span>
                {discount && <span className="ms-2" style={{ fontWeight: 700, color: '#c0392b', fontSize: '0.9rem' }}>Save {discount}%</span>}
              </div>
            )}
          </div>

          <div className="col-md-7 fade-in-up stagger-2">
            <div style={{ fontSize: '0.78rem', color: '#2e7d32', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{product.category}</div>
            <h1 className="product-detail-title">{product.name}</h1>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{ display: 'flex', gap: 3, color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : i < product.rating ? '-half' : ''}`}></i>
                ))}
              </div>
              <span style={{ fontSize: '0.88rem', color: '#6c757d' }}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="d-flex align-items-baseline gap-2 mb-3">
              <span className="product-detail-price">${product.price.toFixed(2)}</span>
              <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>{product.unit}</span>
              {product.originalPrice && <span style={{ fontSize: '1rem', color: '#aaa', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>}
            </div>

            <p className="product-detail-desc">{product.description}</p>

            <div className="detail-meta">
              <div className="detail-meta-item"><div className="meta-label">Category</div><div className="meta-value">{product.category}</div></div>
              <div className="detail-meta-item"><div className="meta-label">Unit</div><div className="meta-value">{product.unit}</div></div>
              <div className="detail-meta-item"><div className="meta-label">Stock</div><div className="meta-value" style={{ color: '#2e7d32' }}>In Stock</div></div>
              <div className="detail-meta-item"><div className="meta-label">Rating</div><div className="meta-value">⭐ {product.rating}</div></div>
            </div>

            {cartItem ? (
              <div className="d-flex align-items-center gap-3 mt-3">
                <div className="qty-controls">
                  <button className="qty-btn" style={{ width: 38, height: 38 }} onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}>−</button>
                  <span className="qty-value" style={{ minWidth: 32, fontSize: '1.1rem' }}>{cartItem.quantity}</span>
                  <button className="qty-btn" style={{ width: 38, height: 38 }} onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}>+</button>
                </div>
                <span style={{ color: '#2e7d32', fontWeight: 600 }}>✓ In your cart</span>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3 mt-3 flex-wrap">
                <div className="qty-controls">
                  <button className="qty-btn" style={{ width: 38, height: 38 }} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span className="qty-value" style={{ minWidth: 32, fontSize: '1.1rem' }}>{qty}</span>
                  <button className="qty-btn" style={{ width: 38, height: 38 }} onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button className="detail-add-btn" onClick={handleAddQty}>
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </button>
              </div>
            )}

            <div className="d-flex gap-2 mt-3 flex-wrap">
              {['🚚 Free delivery over $30', '✅ Fresh quality guarantee', '🔄 Easy returns'].map(f => (
                <span key={f} style={{ background: '#e8f5e9', color: '#1e4d2b', padding: '5px 12px', borderRadius: 99, fontSize: '0.78rem', fontWeight: 600 }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-5 pt-4">
            <h3 style={{ fontFamily: 'Fraunces, serif', marginBottom: 6, color: '#1a3d22' }}>More in {product.category}</h3>
            <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: 24 }}>You might also enjoy these</p>
            <div className="row g-3">
              {related.map(p => (
                <div key={p.id} className="col-6 col-md-4 col-lg-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;