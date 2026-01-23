const { pool } = require('../config/db');

class ReportService {
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

  async getAllReports(userId) {
    const query = `
      SELECT r.*, p.title as property_title
      FROM reports r
      LEFT JOIN properties p ON r.property_id = p.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  async deleteReport(userId, id) {
    const query = 'DELETE FROM reports WHERE id = $1 AND user_id = $2';
    await pool.query(query, [id, userId]);
  }
}

module.exports = new ReportService();
