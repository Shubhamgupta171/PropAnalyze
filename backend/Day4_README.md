# Day 4: Property CRUD APIs & Data Seeding

## Overview
Implemented full Create, Read, Update, and Delete (CRUD) operations for properties. integrated geolocation searches, and seeded a diverse dataset of 22 properties across San Francisco.

## Backend Technical Highlights

### 1. Property Model & Database (`src/models/property.model.js`)
- Implemented **Raw SQL** queries for high-performance PostgreSQL interaction.
- Supported **JSONB** for storing GeoJSON location data (`{address, coordinates}`).
- Added a robust `create` method that automatically links properties to the authenticated **Agent ID**.

### 2. Advanced API Endpoints (`src/routes/property.routes.js`)
- **Full CRUD**:
    - `GET /properties`: Fetch all listings with optional filtering.
    - `GET /properties/:id`: Detailed property view.
    - `POST /properties`: Secure property creation (restricted to Agents).
    - `PATCH /properties/:id`: Ownership-checked updates.
    - `DELETE /properties/:id`: Secure deletion.
- **Geolocation Search**:
    - `GET /properties/properties-within/:distance/center/:latlng/unit/:unit`: Find properties within a specific radius using PostGIS-style logic.

### 3. Role-Based Access Control
- Extended `auth.middleware.js` with `restrictTo('agent', 'admin')`.
- Implemented ownership verification: Users can only modify or delete properties they own.

### 4. Extensive Data Seeding
- Created `src/scripts/seed_properties.js`.
- Seeded **22 diverse listings** across San Francisco (Fixer-uppers, Luxury High-rises, Multi-Family).
- Each listing includes a unique ID, price (from $675k to $12.5M), address, coordinates, and high-quality Unsplash images.

## How to Test
1. **API check**: 
   ```bash
   curl http://localhost:3000/api/v1/properties
   ```
2. **Seeding**:
   ```bash
   node src/scripts/seed_properties.js
   ```
