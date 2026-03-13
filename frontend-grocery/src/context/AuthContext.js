import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('smarthub_user') || 'null'));

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('smarthub_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smarthub_user');
  };

  const register = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUser(newUser);
    localStorage.setItem('smarthub_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
