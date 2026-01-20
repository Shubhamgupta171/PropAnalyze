import api from './api';

const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

const signup = async (userData) => {
  const response = await api.post('/users/signup', userData);
  return response.data;
};

const getMe = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

const authService = {
  login,
  signup,
  getMe,
};

export default authService;
