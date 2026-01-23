import api from './api';

const propertyService = {
  getAllProperties: async (params) => {
    const response = await api.get('/properties', { params });
    return response.data;
  },

  getPropertyById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  createProperty: async (propertyData) => {
    // Check if propertyData is FormData, if not, it will be sent as JSON by default
    const response = await api.post('/properties', propertyData, {
      headers: propertyData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
    return response.data;
  },

  updateProperty: async (id, propertyData) => {
    const response = await api.patch(`/properties/${id}`, propertyData, {
      headers: propertyData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
    return response.data;
  },

  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  getPropertiesWithin: async (distance, latlng, unit = 'mi') => {
    const response = await api.get(`/properties/properties-within/${distance}/center/${latlng}/unit/${unit}`);
    return response.data;
  }
};

export default propertyService;
