import api from './api';

const reportService = {
  getReports: async () => {
    const response = await api.get('/reports');
    return response.data;
  },

  createReport: async (data) => {
    const response = await api.post('/reports', data);
    return response.data;
  },

  deleteReport: async (id) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  }
};

export default reportService;
