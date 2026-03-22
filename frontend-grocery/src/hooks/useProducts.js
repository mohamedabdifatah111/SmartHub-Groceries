// ─── src/hooks/useProducts.js ─────────────────────────────────────────────────
// Fetches products from the backend API with search, filter, sort and pagination.
// Falls back to local static data when the API is unavailable (dev convenience).

import { useState, useEffect, useCallback } from 'react';
import { productsAPI } from '../services/api';
import { products as localProducts } from '../data/products'; // fallback

const USE_API = process.env.REACT_APP_API_URL !== undefined;

export const useProducts = () => {
  const [products, setProducts]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(null);
  const [pagination, setPagination]           = useState(null);

  // Filter/search/sort state
  const [searchQuery, setSearchQuery]         = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange]           = useState([0, 20]);
  const [sortBy, setSortBy]                   = useState('featured');
  const [page, setPage]                       = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    // ── API mode ───────────────────────────────────────────────────────────
    if (USE_API) {
      try {
        const data = await productsAPI.getAll({
          search:      searchQuery,
          category:    selectedCategory,
          minPrice:    priceRange[0],
          maxPrice:    priceRange[1],
          sortBy,
          page,
          limit: 20,
        });
        setProducts(data.data);
        if (data.pagination) setPagination(data.pagination);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── Local fallback (when REACT_APP_API_URL is not set) ─────────────────
    await new Promise(r => setTimeout(r, 500)); // simulate network delay
    let result = [...localProducts];
    if (searchQuery)
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (selectedCategory !== 'All')
      result = result.filter(p => p.category === selectedCategory);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'price_asc')  result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'name')       result.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(result);
    setLoading(false);
  }, [searchQuery, selectedCategory, priceRange, sortBy, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return {
    products,
    loading,
    error,
    pagination,
    page,
    setPage,
    searchQuery,   setSearchQuery,
    selectedCategory, setSelectedCategory,
    priceRange,    setPriceRange,
    sortBy,        setSortBy,
    refetch:       fetchProducts,
  };
};
