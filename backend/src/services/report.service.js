const { pool } = require('../config/db');
const pdfService = require('./pdf.service');
const Property = require('../models/property.model');
const Analysis = require('../models/analysis.model');

class ReportService {
  /**
   * Generate PDF report for a property analysis
   */
  async generatePDFReport(userId, propertyId, analysisId) {
    try {
      // Fetch property data
      const property = await Property.findById(propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      // Fetch analysis data
      const analysis = await Analysis.findById(analysisId);
      if (!analysis) {
        throw new Error('Analysis not found');
      }

      // Verify ownership
      if (analysis.user_id !== userId) {
        throw new Error('Unauthorized: You do not own this analysis');
      }

      // Fetch user data
      const userQuery = 'SELECT id, name, email FROM users WHERE id = $1';
      const { rows: userRows } = await pool.query(userQuery, [userId]);
      const userData = userRows[0];

      // Generate and upload PDF
      const result = await pdfService.generateAndUploadReport(property, analysis, userData);

      // Save report record to database
      const reportName = `${property.title} - ${analysis.strategy} Analysis`;
      const report = await this.createReport(userId, {
        propertyId,
        analysisId,
        name: reportName,
        fileUrl: result.url,
        status: 'Ready'
      });

      return {
        report,
        downloadUrl: result.url,
        fileName: result.fileName
      };
    } catch (error) {
      console.error('Report Generation Error:', error);
      throw error;
    }
  }

  /**
   * Generate PDF and stream directly (without saving to cloud)
   */
  async generatePDFStream(userId, propertyId, analysisId) {
    try {
      // Fetch property data
      const property = await Property.findById(propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      // Fetch analysis data
      const analysis = await Analysis.findById(analysisId);
      if (!analysis) {
        throw new Error('Analysis not found');
      }

      // Verify ownership
      if (analysis.user_id !== userId) {
        throw new Error('Unauthorized: You do not own this analysis');
      }

      // Fetch user data
      const userQuery = 'SELECT id, name, email FROM users WHERE id = $1';
      const { rows: userRows } = await pool.query(userQuery, [userId]);
      const userData = userRows[0];

      // Generate PDF buffer
      const pdfBuffer = await pdfService.generateReport(property, analysis, userData);

      return {
        buffer: pdfBuffer,
        fileName: `${property.title.replace(/[^a-z0-9]/gi, '_')}_Report.pdf`
      };
    } catch (error) {
      console.error('PDF Stream Generation Error:', error);
      throw error;
    }
  }

  /**
   * Create report record in database
   */
  async createReport(userId, data) {
    const query = `
      INSERT INTO reports (user_id, property_id, analysis_id, name, file_url, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [
      userId, 
      data.propertyId, 
      data.analysisId, 
      data.name, 
      data.fileUrl, 
      data.status || 'Ready'
    ]);
    return rows[0];
  }

  /**
   * Get all reports for a user
   */
  async getAllReports(userId) {
    const query = `
      SELECT r.*, p.title as property_title, a.strategy
      FROM reports r
      LEFT JOIN properties p ON r.property_id = p.id
      LEFT JOIN analyses a ON r.analysis_id = a.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  /**
   * Get report by ID
   */
  async getReportById(userId, reportId) {
    const query = `
      SELECT r.*, p.title as property_title, a.strategy
      FROM reports r
      LEFT JOIN properties p ON r.property_id = p.id
      LEFT JOIN analyses a ON r.analysis_id = a.id
      WHERE r.id = $1 AND r.user_id = $2;
    `;
    const { rows } = await pool.query(query, [reportId, userId]);
    return rows[0];
  }

  /**
   * Delete report
   */
  async deleteReport(userId, id) {
    const query = 'DELETE FROM reports WHERE id = $1 AND user_id = $2 RETURNING *';
    const { rows } = await pool.query(query, [id, userId]);
    return rows[0];
  }
}

module.exports = new ReportService();
