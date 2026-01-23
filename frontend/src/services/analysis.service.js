import api from './api';

const analysisService = {
  /**
   * Get ROI metrics for a specific property
   * @param {string} propertyId 
   * @param {object} params - Optional overrides like purchasePrice, rehabCost, interestRate, etc.
   */
  getROI: async (propertyId, params = {}) => {
    try {
      const response = await api.get(`/analysis/roi/${propertyId}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get Max Allowable Offer for a target CoC
   * @param {string} propertyId 
   * @param {number} targetCoC 
   * @param {object} params 
   */
  getMaxOffer: async (propertyId, targetCoC, params = {}) => {
    try {
      const response = await api.get(`/analysis/max-offer/${propertyId}`, {
        params: { ...params, targetCoC }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get global market overview stats
   */
  getMarketOverview: async () => {
    try {
      const response = await api.get('/analysis/overview');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Save an analysis for future reference
   */
  saveAnalysis: async (propertyId, data) => {
    try {
      const response = await api.post(`/analysis/${propertyId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get all past analyses for the logged-in user
   */
  getHistory: async () => {
    try {
      const response = await api.get('/analysis/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete a specific analysis
   */
  deleteAnalysis: async (id) => {
    try {
      const response = await api.delete(`/analysis/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default analysisService;
