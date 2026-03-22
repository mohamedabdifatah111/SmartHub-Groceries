// ─── src/services/api.js ───────────────────────────────────────────────────
// Central API service. All backend calls go through here.
// Set REACT_APP_API_URL in your .env file.

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// ── Token helpers ────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('smarthub_token');

const getHeaders = (includeAuth = true) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ── Core request handler ─────────────────────────────────────────────────────
const request = async (method, path, body = null, auth = true) => {
  const options = {
    method,
    headers: getHeaders(auth),
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();

  if (!res.ok || data.success === false) {
    const message =
      data?.error?.message ||
      data?.message ||
      `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
};

// ── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (name, email, password) =>
    request('POST', '/auth/register', { name, email, password }, false),

  login: (email, password) =>
    request('POST', '/auth/login', { email, password }, false),

  logout: () =>
    request('POST', '/auth/logout'),

  getMe: () =>
    request('GET', '/auth/me'),

  googleLogin: (token) =>
    request('POST', '/auth/google', { token }, false),
};

// ── Products ─────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search)                          query.set('search', params.search);
    if (params.category && params.category !== 'All') query.set('category', params.category);
    if (params.minPrice != null)                query.set('minPrice', params.minPrice);
    if (params.maxPrice != null)                query.set('maxPrice', params.maxPrice);
    if (params.sortBy)                          query.set('sortBy', params.sortBy);
    if (params.featured)                        query.set('featured', 'true');
    if (params.popular)                         query.set('popular', 'true');
    if (params.page)                            query.set('page', params.page);
    if (params.limit)                           query.set('limit', params.limit);
    const qs = query.toString();
    return request('GET', `/products${qs ? `?${qs}` : ''}`, null, false);
  },

  getById: (id) =>
    request('GET', `/products/${id}`, null, false),

  getRelated: (id) =>
    request('GET', `/products/${id}/related`, null, false),
};

// ── Categories ────────────────────────────────────────────────────────────────
export const categoriesAPI = {
  getAll: () =>
    request('GET', '/categories', null, false),

  getProducts: (categoryName) =>
    request('GET', `/categories/${encodeURIComponent(categoryName)}/products`, null, false),
};

// ── Orders ────────────────────────────────────────────────────────────────────
export const ordersAPI = {
  create: (items, delivery, paymentMethod) =>
    request('POST', '/orders', { items, delivery, paymentMethod }, false),

  getAll: () =>
    request('GET', '/orders'),

  getById: (id) =>
    request('GET', `/orders/${id}`),

  cancel: (id) =>
    request('PATCH', `/orders/${id}/cancel`),
};

// ── Cart (server-side — optional) ─────────────────────────────────────────────
export const cartAPI = {
  get: ()                          => request('GET',    '/cart'),
  addItem: (productId, quantity=1) => request('POST',   '/cart/items',           { productId, quantity }),
  updateItem: (productId, qty)     => request('PATCH',  `/cart/items/${productId}`, { quantity: qty }),
  removeItem: (productId)          => request('DELETE', `/cart/items/${productId}`),
  clear: ()                        => request('DELETE', '/cart'),
};

// ── Users ─────────────────────────────────────────────────────────────────────
export const usersAPI = {
  getProfile: ()         => request('GET',    '/users/profile'),
  updateProfile: (data)  => request('PUT',    '/users/profile', data),
  changePassword: (currentPassword, newPassword) =>
                            request('PUT',    '/users/password', { currentPassword, newPassword }),
  deleteAccount: ()      => request('DELETE', '/users/account'),
};

// ── Contact ───────────────────────────────────────────────────────────────────
export const contactAPI = {
  send: (name, email, message) =>
    request('POST', '/contact', { name, email, message }, false),

  subscribe: (email) =>
    request('POST', '/newsletter/subscribe', { email }, false),
};
