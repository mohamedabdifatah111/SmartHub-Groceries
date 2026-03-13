import React from 'react';
import '../styles/components.css';

const SearchBar = ({ value, onChange, placeholder = 'Search products…' }) => (
  <div className="search-bar-wrap">
    <i className="bi bi-search search-bar-icon"></i>
    <input
      type="text"
      className="search-bar-input"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
