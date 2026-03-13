import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import { categories } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import '../styles/pages.css';

const Products = () => {
  const { products, loading, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, priceRange, setPriceRange, sortBy, setSortBy } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const topRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    const search = params.get('search');
    if (cat) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
  }, [location.search, setSearchQuery, setSelectedCategory]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange([0, 20]);
    setSortBy('featured');
    navigate('/products');
  };

  return (
    <div className="page-wrapper">
      <div className="products-page-header">
        <div className="container">
          <h1>🛍 Our Products</h1>
          <p>Fresh, quality groceries at your fingertips</p>
        </div>
      </div>

      <div className="container py-4" ref={topRef}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 24, scrollbarWidth: 'none' }}>
          {['All', ...categories.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              style={{ background: selectedCategory === cat ? '#1e4d2b' : 'white', color: selectedCategory === cat ? 'white' : '#343a40', border: `2px solid ${selectedCategory === cat ? '#1e4d2b' : '#e9ecef'}`, borderRadius: 99, padding: '8px 18px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.18s', flexShrink: 0 }}>
              {categories.find(c => c.name === cat)?.icon || '🛒'} {cat}
            </button>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-3 col-md-12">
            <div className="filter-sidebar">
              <div className="filter-card">
                <div className="filter-title"><i className="bi bi-search"></i> Search</div>
                <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search products…" />
              </div>

              <div className="filter-card">
                <div className="filter-title"><i className="bi bi-grid"></i> Categories</div>
                <button className={`filter-cat-btn ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => setSelectedCategory('All')}>
                  <span className="cat-icon">🛒</span> All Products
                  <span className="ms-auto" style={{ fontSize: '0.75rem', color: '#6c757d' }}>{products.length}</span>
                </button>
                {categories.map(cat => (
                  <button key={cat.id} className={`filter-cat-btn ${selectedCategory === cat.name ? 'active' : ''}`} onClick={() => setSelectedCategory(cat.name)}>
                    <span className="cat-icon">{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>

              <div className="filter-card">
                <div className="filter-title"><i className="bi bi-tag"></i> Price Range</div>
                <div className="price-range">
                  <input type="range" min={0} max={20} step={0.5} value={priceRange[1]} onChange={e => setPriceRange([0, parseFloat(e.target.value)])} />
                  <div className="price-label"><span>$0</span><span>Up to ${priceRange[1].toFixed(2)}</span></div>
                </div>
              </div>

              <div className="filter-card">
                <div className="filter-title"><i className="bi bi-sort-down"></i> Sort By</div>
                <select className="sort-select w-100" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>

              <button onClick={clearFilters} style={{ width: '100%', background: 'none', border: '2px solid #e9ecef', borderRadius: 10, padding: '10px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'DM Sans, sans-serif', color: '#6c757d', transition: 'all 0.18s' }}>
                <i className="bi bi-x-circle me-1"></i> Clear Filters
              </button>
            </div>
          </div>

          <div className="col-lg-9 col-md-12">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="results-count"><strong>{products.length}</strong> products found</span>
                {selectedCategory !== 'All' && (
                  <span className="active-filter-badge">
                    {selectedCategory}
                    <button className="clear-filter" onClick={() => setSelectedCategory('All')}><i className="bi bi-x"></i></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="active-filter-badge">
                    "{searchQuery}"
                    <button className="clear-filter" onClick={() => setSearchQuery('')}><i className="bi bi-x"></i></button>
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <Spinner />
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#6c757d' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
                <h4 style={{ fontFamily: 'Fraunces, serif', marginBottom: 8 }}>No products found</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: 20 }}>Try adjusting your filters or search term.</p>
                <button className="btn-primary-green" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className="row g-3">
                {products.map((product, i) => (
                  <div key={product.id} className={`col-6 col-md-4 col-xl-3 stagger-${(i % 4) + 1}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;