const { pool } = require('../config/db');

class PortfolioService {
  async createPortfolio(userId, data) {
    const query = `
      INSERT INTO portfolios (user_id, name, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, data.name, data.description]);
    return rows[0];
  }

  async getAllPortfolios(userId) {
    const query = `
      SELECT p.*, COUNT(pp.property_id) as property_count
      FROM portfolios p
      LEFT JOIN portfolio_properties pp ON p.id = pp.portfolio_id
      WHERE p.user_id = $1
      GROUP BY p.id
      ORDER BY p.created_at DESC;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  async getPortfolio(userId, id) {
    const query = `
      SELECT p.*, 
             json_agg(prop.*) as properties
      FROM portfolios p
      LEFT JOIN portfolio_properties pp ON p.id = pp.portfolio_id
      LEFT JOIN properties prop ON pp.property_id = prop.id
      WHERE p.id = $1 AND p.user_id = $2
      GROUP BY p.id;
    `;
    const { rows } = await pool.query(query, [id, userId]);
    return rows[0];
  }

  async addPropertyToPortfolio(userId, portfolioId, propertyId) {
    // Check ownership
    const checkQuery = 'SELECT id FROM portfolios WHERE id = $1 AND user_id = $2';
    const { rows: checkRows } = await pool.query(checkQuery, [portfolioId, userId]);
    if (checkRows.length === 0) throw new Error('Portfolio not found or unauthorized');

    const query = `
      INSERT INTO portfolio_properties (portfolio_id, property_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [portfolioId, propertyId]);
    return rows[0];
  }

  async removePropertyFromPortfolio(userId, portfolioId, propertyId) {
    const checkQuery = 'SELECT id FROM portfolios WHERE id = $1 AND user_id = $2';
    const { rows: checkRows } = await pool.query(checkQuery, [portfolioId, userId]);
    if (checkRows.length === 0) throw new Error('Portfolio not found or unauthorized');

    const query = 'DELETE FROM portfolio_properties WHERE portfolio_id = $1 AND property_id = $2';
    await pool.query(query, [portfolioId, propertyId]);
  }

  async deletePortfolio(userId, id) {
    const query = 'DELETE FROM portfolios WHERE id = $1 AND user_id = $2';
    await pool.query(query, [id, userId]);
  }

  async updatePortfolio(userId, id, data) {
    const query = `
      UPDATE portfolios 
      SET name = $1, description = $2, updated_at = NOW()
      WHERE id = $3 AND user_id = $4
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [data.name, data.description, id, userId]);
    return rows[0];
  }
}

module.exports = new PortfolioService();
