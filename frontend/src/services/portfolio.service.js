import api from './api';

const portfolioService = {
  getPortfolios: async () => {
    const response = await api.get('/portfolios');
    return response.data;
  },

  getPortfolio: async (id) => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
  },

  createPortfolio: async (data) => {
    const response = await api.post('/portfolios', data);
    return response.data;
  },

  addProperty: async (id, propertyId) => {
    const response = await api.post(`/portfolios/${id}/properties`, { propertyId });
    return response.data;
  },

  removeProperty: async (id, propertyId) => {
    const response = await api.delete(`/portfolios/${id}/properties/${propertyId}`);
    return response.data;
  },

  deletePortfolio: async (id) => {
    const response = await api.delete(`/portfolios/${id}`);
    return response.data;
  }
};

export default portfolioService;
