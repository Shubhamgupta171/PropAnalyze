const db = require('../config/db');

class Report {
  static async create(reportData) {
    const { name, user_id, property_id, analysis_id, file_url, status } = reportData;
    const query = `
      INSERT INTO reports (name, user_id, property_id, analysis_id, file_url, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows } = await db.query(query, [
      name,
      user_id,
      property_id,
      analysis_id,
      file_url,
      status || 'Ready'
    ]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at DESC';
    const { rows } = await db.query(query, [userId]);
    return rows;
  }

  static async delete(id) {
    const query = 'DELETE FROM reports WHERE id = $1';
    await db.query(query, [id]);
  }
}

module.exports = Report;
