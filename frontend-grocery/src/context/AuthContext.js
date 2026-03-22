// ─── src/context/AuthContext.js ───────────────────────────────────────────────
import React, { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('smarthub_user') || 'null'); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const persist = (token, userData) => {
    localStorage.setItem('smarthub_token', token);
    localStorage.setItem('smarthub_user',  JSON.stringify(userData));
    setUser(userData);
  };

  const clear = () => {
    localStorage.removeItem('smarthub_token');
    localStorage.removeItem('smarthub_user');
    setUser(null);
  };

  const login = useCallback(async (email, password) => {
    setLoading(true); setError(null);
    try {
      const data = await authAPI.login(email, password);
      persist(data.token, data.user);
      return data.user;
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true); setError(null);
    try {
      const data = await authAPI.register(name, email, password);
      persist(data.token, data.user);
      return data.user;
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  }, []);

  const logout = useCallback(async () => {
    try { await authAPI.logout(); } catch {}
    finally { clear(); }
  }, []);

  const googleLogin = useCallback(async (googleToken) => {
    setLoading(true); setError(null);
    try {
      const data = await authAPI.googleLogin(googleToken);
      persist(data.token, data.user);
      return data.user;
    } catch (err) { setError(err.message); throw err; }
    finally { setLoading(false); }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const data = await authAPI.getMe();
      localStorage.setItem('smarthub_user', JSON.stringify(data.data));
      setUser(data.data);
    } catch { clear(); }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, isLoggedIn: !!user, login, register, logout, googleLogin, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
