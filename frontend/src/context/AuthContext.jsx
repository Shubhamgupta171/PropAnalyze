import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.getMe();
          setUser(response.data.user);
        } catch (err) {
          console.error('Failed to fetch user', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);
      setUser(response.data.user);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signup(userData);
      localStorage.setItem('token', response.token);
      setUser(response.data.user);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateMe = async (formData) => {
    setLoading(true);
    try {
      const response = await authService.updateMe(formData);
      setUser(response.data.user);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      setLoading(false);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, updateMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
