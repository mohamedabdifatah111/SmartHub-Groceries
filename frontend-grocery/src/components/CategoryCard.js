import React from 'react';
import '../styles/components.css';

const CategoryCard = ({ category, onClick }) => (
  <div className="category-card" onClick={onClick}>
    <img src={category.image} alt={category.name} loading="lazy" />
    <div className="category-card-overlay">
      <div className="category-card-icon">{category.icon}</div>
      <div className="category-card-name">{category.name}</div>
    </div>
  </div>
);

export default CategoryCard;
