const db = require('../config/db');

class Analysis {
  static async create(analysisData) {
    const { property_id, user_id, strategy, status, metrics, inputs } = analysisData;
    const query = `
      INSERT INTO analyses (property_id, user_id, strategy, status, metrics, inputs)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const { rows } = await db.query(query, [
      property_id,
      user_id,
      strategy,
      status || 'Draft',
      metrics ? JSON.stringify(metrics) : null,
      inputs ? JSON.stringify(inputs) : null
    ]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM analyses WHERE user_id = $1';
    const { rows } = await db.query(query, [userId]);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM analyses WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const { status, metrics, inputs } = updates;
    const query = `
      UPDATE analyses
      SET status = COALESCE($2, status),
          metrics = COALESCE($3, metrics),
          inputs = COALESCE($4, inputs),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await db.query(query, [
      id,
      status,
      metrics ? JSON.stringify(metrics) : null,
      inputs ? JSON.stringify(inputs) : null
    ]);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM analyses WHERE id = $1';
    await db.query(query, [id]);
  }
}

module.exports = Analysis;
