import { useState, useMemo } from 'react';
import { products } from '../data/products';

export function useProductSearch(initialCategory = 'all') {
  const [query, setQuery]           = useState('');
  const [category, setCategory]     = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy]         = useState('default');

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
      case 'name':       result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return result;
  }, [query, category, priceRange, sortBy]);

  return {
    query, setQuery,
    category, setCategory,
    priceRange, setPriceRange,
    sortBy, setSortBy,
    filtered,
    total: filtered.length,
  };
}
