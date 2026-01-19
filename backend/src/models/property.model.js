const db = require('../config/db');

class Property {
  static async create(propertyData, agentId) {
    const fields = Object.keys(propertyData);
    const columns = [...fields, 'agent_id'].join(', ');
    const placeholders = [...fields, 'agent_id'].map((_, i) => `$${i + 1}`).join(', ');
    const values = [...Object.values(propertyData), agentId];

    const query = `
      INSERT INTO properties (${columns})
      VALUES (${placeholders})
      RETURNING *;
    `;
    
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async findAll(filter = {}) {
    // Basic implementation - can be expanded for complex filtering
    let query = 'SELECT * FROM properties';
    const values = [];
    
    if (filter.category) {
      query += ' WHERE category = $1';
      values.push(filter.category);
    }

    const { rows } = await db.query(query, values);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM properties WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const setClause = fields.map((field, i) => `${field} = $${i + 2}`).join(', ');
    const values = [id, ...Object.values(updates)];

    const query = `
      UPDATE properties
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `;
    
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM properties WHERE id = $1';
    await db.query(query, [id]);
  }

  static async findWithinRadius(lat, lng, radiusInMiles) {
    // Basic JSONB containment or distance calculation if using PostGIS
    // For now, simple latitude/longitude range or custom logic
    const query = `
      SELECT * FROM properties 
      WHERE (location->'coordinates'->>1)::float BETWEEN $1 AND $2
      AND (location->'coordinates'->>0)::float BETWEEN $3 AND $4;
    `;
    // Approximate 1 degree ~ 69 miles
    const latDelta = radiusInMiles / 69;
    const lngDelta = radiusInMiles / (69 * Math.cos(lat * Math.PI / 180));
    
    const { rows } = await db.query(query, [
      lat - latDelta, lat + latDelta,
      lng - lngDelta, lng + lngDelta
    ]);
    return rows;
  }
}

module.exports = Property;
