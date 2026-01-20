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
    // If there are images, we might need multipart/form-data
    // For now, assume JSON
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  updateProperty: async (id, propertyData) => {
    const response = await api.patch(`/properties/${id}`, propertyData);
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
