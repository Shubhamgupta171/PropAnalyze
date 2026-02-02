import api from './api';

const reportService = {
  /**
   * Get all reports for current user
   */
  getReports: async () => {
    const response = await api.get('/reports');
    return response.data;
  },

  /**
   * Get a specific report by ID
   */
  getReport: async (id) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  /**
   * Generate PDF report and upload to cloud
   */
  generateReport: async (propertyId, analysisId) => {
    const response = await api.post('/reports/generate', {
      propertyId,
      analysisId
    });
    return response.data;
  },

  /**
   * Generate and download PDF report directly
   */
  downloadReport: async (propertyId, analysisId) => {
    const response = await api.post('/reports/download', {
      propertyId,
      analysisId
    }, {
      responseType: 'blob' // Important for binary data
    });
    return response.data;
  },

  /**
   * Create a report record manually
   */
  createReport: async (data) => {
    const response = await api.post('/reports', data);
    return response.data;
  },

  /**
   * Delete a report
   */
  deleteReport: async (id) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  }
};

export default reportService;

