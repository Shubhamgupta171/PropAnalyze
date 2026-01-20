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
    // Parse JSON strings if they come from multipart/form-data
    const propertyData = { ...data };
    if (typeof propertyData.location === 'string') {
      try { propertyData.location = JSON.parse(propertyData.location); } catch (e) {}
    }
    if (typeof propertyData.features === 'string') {
      try { propertyData.features = JSON.parse(propertyData.features); } catch (e) {}
    }

    // Filter allowed fields
    const allowedFields = [
      'title', 'description', 'price', 'beds', 'baths', 'sqft', 
      'year_built', 'lot_size', 'zoning', 'hoa_fees', 'mls_number', 
      'days_on_market', 'is_fixer_upper', 'status', 'asset_class', 
      'price_unit', 'category', 'location', 'images', 'features'
    ];
    
    const filteredData = {};
    Object.keys(propertyData).forEach(el => {
      if (allowedFields.includes(el)) filteredData[el] = propertyData[el];
    });

    return await Property.create(filteredData, userId);
  }

  async updateProperty(id, data, userId, userRole) {
    const property = await Property.findById(id);

    if (!property) {
      throw new AppError('No property found with that ID', 404);
    }

    // Check ownership
    if (userRole !== 'admin' && String(property.agent_id) !== String(userId)) {
      throw new AppError('You are not authorized to update this property', 403);
    }

    const updates = { ...data };
    if (typeof updates.location === 'string') {
      try { updates.location = JSON.parse(updates.location); } catch (e) {}
    }
    if (typeof updates.features === 'string') {
      try { updates.features = JSON.parse(updates.features); } catch (e) {}
    }

    // Filter allowed fields
    const allowedFields = [
      'title', 'description', 'price', 'beds', 'baths', 'sqft', 
      'year_built', 'lot_size', 'zoning', 'hoa_fees', 'mls_number', 
      'days_on_market', 'is_fixer_upper', 'status', 'asset_class', 
      'price_unit', 'category', 'location', 'images', 'features'
    ];
    
    const filteredUpdates = {};
    Object.keys(updates).forEach(el => {
      if (allowedFields.includes(el)) filteredUpdates[el] = updates[el];
    });

    if (Object.keys(filteredUpdates).length === 0) return property;

    return await Property.update(id, filteredUpdates);
  }

  async deleteProperty(id, userId, userRole) {
    const property = await Property.findById(id);

    if (!property) {
      throw new AppError('No property found with that ID', 404);
    }

    if (userRole !== 'admin' && String(property.agent_id) !== String(userId)) {
      throw new AppError('You are not authorized to delete this property', 403);
    }

    await Property.delete(id);
    return null;
  }

  async getPropertiesWithinRadius(lat, lng, radius, unit = 'mi') {
    const radiusInMiles = unit === 'km' ? radius / 1.60934 : radius;
    return await Property.findWithinRadius(parseFloat(lat), parseFloat(lng), parseFloat(radiusInMiles));
  }
}

module.exports = new PropertyService();
