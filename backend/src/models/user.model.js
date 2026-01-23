const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, role, plan, title, phone, countryCode } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO users (name, email, password, role, plan, title, phone, country_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, email, role, plan, title, phone, country_code, photo, favorites, created_at;
    `;
    
    const { rows } = await db.query(query, [
      name, 
      email, 
      hashedPassword, 
      role || 'user', 
      plan || 'Free', 
      title || 'Investor',
      phone,
      countryCode || '+1'
    ]);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, name, email, role, plan, title, phone, country_code AS "countryCode", photo, favorites FROM users WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    if (fields.length === 0) return this.findById(id);

    const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
    const values = [id, ...Object.values(updates)];

    const query = `
      UPDATE users
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, name, email, role, plan, title, phone, country_code AS "countryCode", photo, favorites, created_at;
    `;
    
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async updateFavorites(userId, favorites) {
    const query = 'UPDATE users SET favorites = $1 WHERE id = $2 RETURNING favorites';
    const { rows } = await db.query(query, [JSON.stringify(favorites), userId]);
    return rows[0].favorites;
  }

  static async comparePassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
}

module.exports = User;
