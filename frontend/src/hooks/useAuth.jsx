import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth as authApi } from '../api/ApiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    // refresh user if token exists but no user object
    const token = localStorage.getItem('token');
    if (token && !user) {
      authApi.me().then(res => {
        if (res?.success && res.user) {
          setUser(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }).catch(()=>{});
    }
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res?.success) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      return res;
    }
    throw new Error(res?.message || 'Login failed');
  };

  const register = async (payload) => {
    const res = await authApi.register(payload);
    if (res?.success) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      return res;
    }
    throw new Error(res?.message || 'Register failed');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
