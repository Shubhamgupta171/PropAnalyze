# Day 11: Advanced Search Engine & Pagination

## Overview
Move beyond basic listings to a professional-grade search engine. Currently, the system fetches *all* properties at once, which is not scalable. We will implement database-level filtering, pagination, and sorting to handle thousands of property records efficiently.

## Objectives
1.  **Advanced Filtering**: Allow users to filter by price range, bed/bath count, square footage, year built, and asset class.
2.  **Pagination**: Implement cursor or offset-based pagination to load data in chunks (e.g., 20 items per page).
3.  **Sorting**: Enable dynamic sorting (e.g., "Price: Low to High", "Newest First", "Highest Cap Rate").
4.  **Security**: Sanitize all filter inputs to prevent SQL injection in the dynamic query builder.

## Technical Implementation Plan

### 1. Update `src/models/property.model.js`
Refactor `findAll` to accept a `queryOptions` object.
- **Dynamic Query Builder**: detailed variable array construction.
- **Filters Support**:
    - `min_price` / `max_price`
    - `beds` (min)
    - `baths` (min)
    - `sqft_min`
- **Pagination Logic**:
    - Calculate `OFFSET` based on `page` and `limit`.
- **Sorting Logic**:
    - Whitelist allowed sort columns to prevent errors.

### 2. Update `src/controllers/property.controller.js`
- Parse query parameters from `req.query`.
- Set default values (e.g., `page=1`, `limit=20`).
- Pass clean objects to the Service layer.

### 3. API Specification
**GET /api/v1/properties**
```
Query Query Params:
?page=1&limit=20
?minPrice=500000&maxPrice=1500000
?beds=3&baths=2
?sortBy=price&order=desc
```

## Deliverables
- [ ] Refactored `Property.findAll` with safe dynamic SQL.
- [ ] Pagination metadata in API response (total pages, current page).
- [ ] Updated Swagger documentation for new search parameters.
