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

  static async findAll(queryOptions = {}) {
    // 1. Base Query with ROI Metrics
    let query = `
      SELECT p.*, 
             (a.metrics->>'capRate')::numeric as latest_cap_rate,
             (a.metrics->>'cashOnCash')::numeric as latest_coc
      FROM properties p
      LEFT JOIN LATERAL (
        SELECT metrics 
        FROM analyses 
        WHERE property_id = p.id 
        ORDER BY updated_at DESC 
        LIMIT 1
      ) a ON true
    `;
    let countQuery = 'SELECT COUNT(*) FROM properties p';
    const values = [];
    const conditions = [];

    // 2. Build Filters
    // Price Range
    if (queryOptions.minPrice) {
      conditions.push(`price >= $${values.length + 1}`);
      values.push(queryOptions.minPrice);
    }
    if (queryOptions.maxPrice) {
      conditions.push(`price <= $${values.length + 1}`);
      values.push(queryOptions.maxPrice);
    }
    
    // Beds & Baths
    if (queryOptions.minBeds) {
      conditions.push(`beds >= $${values.length + 1}`);
      values.push(queryOptions.minBeds);
    }
    if (queryOptions.minBaths) {
      conditions.push(`baths >= $${values.length + 1}`);
      values.push(queryOptions.minBaths);
    }

    // Category / Asset Class
    if (queryOptions.category) {
      conditions.push(`category = $${values.length + 1}`);
      values.push(queryOptions.category);
    }

    // Text Search (Title/Address)
    if (queryOptions.search) {
      conditions.push(`(title ILIKE $${values.length + 1} OR location->>'address' ILIKE $${values.length + 1})`);
      values.push(`%${queryOptions.search}%`);
    }

    // Apply WHERE clause if conditions exist
    if (conditions.length > 0) {
      const whereClause = ' WHERE ' + conditions.join(' AND ');
      query += whereClause;
      countQuery += whereClause;
    }

    // 3. Sorting
    const sortMap = {
      'price': 'price ASC',
      '-price': 'price DESC',
      'newest': 'created_at DESC',
      'oldest': 'created_at ASC',
      'beds': 'beds DESC',
      'sqft': 'sqft DESC'
    };
    
    const sortField = queryOptions.sort && sortMap[queryOptions.sort] ? sortMap[queryOptions.sort] : 'created_at DESC';
    query += ` ORDER BY ${sortField}`;

    // 4. Pagination
    const page = parseInt(queryOptions.page, 10) || 1;
    const limit = parseInt(queryOptions.limit, 10) || 20;
    const offset = (page - 1) * limit;

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    // 5. Execute Queries (Parallel)
    const [propertiesResult, countResult] = await Promise.all([
      db.query(query, values),
      db.query(countQuery, values.slice(0, values.length - 2)) // Exclude limit/offset for count
    ]);

    return {
      properties: propertiesResult.rows,
      total: parseInt(countResult.rows[0].count, 10),
      page,
      limit,
      totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit)
    };
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
