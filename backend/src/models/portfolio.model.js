const db = require('../config/db');

class Portfolio {
  static async create(portfolioData) {
    const { name, description, user_id } = portfolioData;
    const query = `
      INSERT INTO portfolios (name, description, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await db.query(query, [name, description, user_id]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM portfolios WHERE user_id = $1';
    const { rows } = await db.query(query, [userId]);
    return rows;
  }

  static async addProperty(portfolioId, propertyId) {
    const query = `
      INSERT INTO portfolio_properties (portfolio_id, property_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING;
    `;
    await db.query(query, [portfolioId, propertyId]);
  }

  static async getPortfolioDetails(portfolioId) {
    const query = `
      SELECT p.*, 
             COALESCE(json_agg(prop.*) FILTER (WHERE prop.id IS NOT NULL), '[]') as properties
      FROM portfolios p
      LEFT JOIN portfolio_properties pp ON p.id = pp.portfolio_id
      LEFT JOIN properties prop ON pp.property_id = prop.id
      WHERE p.id = $1
      GROUP BY p.id;
    `;
    const { rows } = await db.query(query, [portfolioId]);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM portfolios WHERE id = $1';
    await db.query(query, [id]);
  }
}

module.exports = Portfolio;
