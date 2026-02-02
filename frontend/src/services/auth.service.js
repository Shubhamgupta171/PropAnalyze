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

const updateMe = async (formData) => {
  const response = await api.patch('/users/updateMe', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const toggleFavorite = async (propertyId) => {
  const response = await api.patch('/users/toggleFavorite', { propertyId });
  return response.data;
};

const authService = {
  login,
  signup,
  getMe,
  updateMe,
  toggleFavorite,
};

export default authService;
