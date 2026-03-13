import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import '../styles/components.css';

const badgeClass = { Sale: 'badge-sale', Organic: 'badge-organic', Fresh: 'badge-fresh', New: 'badge-new' };

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {[...Array(full)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
      {half && <i className="bi bi-star-half"></i>}
      {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => <i key={i} className="bi bi-star"></i>)}
    </span>
  );
};

const ProductCard = ({ product }) => {
  const { addItem, items, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [justAdded, setJustAdded] = useState(false);
  const cartItem = items.find(i => i.id === product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    toast.success(`${product.name} added to cart!`, { icon: '🛒', autoClose: 2000 });
    setTimeout(() => setJustAdded(false), 700);
  };

  const handleQty = (e, delta) => {
    e.stopPropagation();
    updateQuantity(product.id, cartItem.quantity + delta);
  };

  return (
    <div className="product-card fade-in-up" onClick={() => navigate(`/products/${product.id}`)} style={{ cursor: 'pointer' }}>
      <div className="product-card-img">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className={`product-badge ${badgeClass[product.badge] || ''}`}>{product.badge}</span>}
        {cartItem && <span className="product-qty-badge">{cartItem.quantity}</span>}
      </div>
      <div className="product-card-body">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-unit">{product.unit}</div>
        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-price-row">
          <div>
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="product-original">${product.originalPrice.toFixed(2)}</span>}
          </div>
          {cartItem ? (
            <div className="qty-controls" onClick={e => e.stopPropagation()}>
              <button className="qty-btn" onClick={e => handleQty(e, -1)}>−</button>
              <span className="qty-value">{cartItem.quantity}</span>
              <button className="qty-btn" onClick={e => handleQty(e, 1)}>+</button>
            </div>
          ) : (
            <button className={`add-to-cart-btn ${justAdded ? 'added' : ''}`} onClick={handleAdd}>
              <i className="bi bi-plus"></i> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
