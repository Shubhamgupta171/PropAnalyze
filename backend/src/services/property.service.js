const Property = require('../models/property.model');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

class PropertyService {
  async getAllProperties(queryString) {
    const features = new APIFeatures('properties p', queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const { query, params } = features.build();
    // Inject a JOIN to get the latest analysis metrics for each property
    const finalQuery = `
      SELECT sub.*, 
             a.metrics->>'capRate' as latest_cap_rate,
             a.metrics->>'cashOnCash' as latest_coc
      FROM (${query}) sub
      LEFT JOIN LATERAL (
        SELECT metrics 
        FROM analyses 
        WHERE property_id = sub.id 
        ORDER BY updated_at DESC 
        LIMIT 1
      ) a ON true;
    `;
    
    const { rows } = await require('../config/db').query(finalQuery, params);
    return rows;
  }

  async getPropertyById(id) {
    // Basic implementation without Mongoose populate
    // Can be expanded to JOIN with users for agent info
    const query = `
      SELECT p.*, u.name as agent_name, u.email as agent_email
      FROM properties p
      LEFT JOIN users u ON p.agent_id = u.id
      WHERE p.id = $1;
    `;
    const { rows } = await require('../config/db').query(query, [id]);
    const property = rows[0];
    
    if (!property) {
      throw new AppError('No property found with that ID', 404);
    }
    return property;
  }

  async createProperty(data, userId) {
    // Ensure agent_id is set
    const propertyData = { ...data };
    delete propertyData.agentId; // Clean up camelCase if exists
    
    return await Property.create(propertyData, userId);
  }

  async updateProperty(id, data, userId, userRole) {
    const property = await Property.findById(id);

    if (!property) {
      throw new AppError('No property found with that ID', 404);
    }

    // Check ownership (SQL field is agent_id)
    if (userRole !== 'admin' && property.agent_id.toString() !== userId.toString()) {
      throw new AppError('You are not authorized to update this property', 403);
    }

    return await Property.update(id, data);
  }

  async deleteProperty(id, userId, userRole) {
    const property = await Property.findById(id);

    if (!property) {
      throw new AppError('No property found with that ID', 404);
    }

    if (userRole !== 'admin' && property.agent_id.toString() !== userId.toString()) {
      throw new AppError('You are not authorized to delete this property', 403);
    }

    await Property.delete(id);
    return null;
  }

  async getPropertiesWithinRadius(lat, lng, radius, unit = 'mi') {
    return await Property.findWithinRadius(parseFloat(lat), parseFloat(lng), parseFloat(radius));
  }
}

module.exports = new PropertyService();
