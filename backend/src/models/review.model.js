const db = require('../config/db');

class Review {
  static async create(reviewData) {
    const { review, rating, property_id, user_id } = reviewData;
    
    // Start transaction
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      
      const insertQuery = `
        INSERT INTO reviews (review, rating, property_id, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const { rows } = await client.query(insertQuery, [review, rating, property_id, user_id]);
      const newReview = rows[0];

      // Update property ratings
      await this.updatePropertyRatings(property_id, client);

      await client.query('COMMIT');
      return newReview;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async findByPropertyId(propertyId) {
    const query = `
      SELECT r.*, u.name as user_name, u.photo as user_photo
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.property_id = $1
      ORDER BY r.created_at DESC;
    `;
    const { rows } = await db.query(query, [propertyId]);
    return rows;
  }

  static async updatePropertyRatings(propertyId, client = db) {
    const statsQuery = `
      SELECT COUNT(*) as count, AVG(rating) as average
      FROM reviews
      WHERE property_id = $1;
    `;
    const { rows: stats } = await client.query(statsQuery, [propertyId]);
    
    const count = parseInt(stats[0].count);
    const average = parseFloat(stats[0].average) || 4.5;

    const updateQuery = `
      UPDATE properties
      SET ratings_quantity = $1, ratings_average = $2
      WHERE id = $3;
    `;
    await client.query(updateQuery, [count, average, propertyId]);
  }
}

module.exports = Review;
