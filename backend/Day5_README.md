# Day 5: Search, Filter & Maps API

## Goal
Enable advanced data retrieval including filtering, sorting, pagination, and geospatial searches to power the Map Dashboard.

## Checklist

### 1. Robust Features
- [x] **SQL APIFeatures** (`src/utils/APIFeatures.js`):
    -   Handles bracketed operators like `price[gte]=100000`.
    -   Supports `sort`, `fields`, and `page` parameters.
    -   Automatically includes `id` in field selection for logic robustness.
- [x] **Geospatial & Metrics** (`src/services/property.service.js`):
    -   Integrated **Latest Cap Rate** and **CoC** via a `LATERAL JOIN` from the `analyses` table.
    -   Implemented distance-based search in `property.model.js`.

### 2. API Reference

#### Fetch Properties
`GET /api/v1/properties`
- **Filters**: `price[gte]=500000`, `beds=3`, `title=Modern`
- **Sorting**: `sort=-price` (descending), `sort=created_at` (ascending)
- **Fields**: `fields=title,price,beds`
- **Example**: `/api/v1/properties?price[lt]=1000000&sort=-price&limit=10`

#### Map Search
`GET /api/v1/properties/properties-within/:distance/center/:latlng/unit/:unit`
- **Example**: `/api/v1/properties/properties-within/10/center/37.7849,-122.3994/unit/mi`
- **Desc**: Finds properties within 10 miles of San Francisco.

### 3. Frontend Implementation
The `MarketSearch.jsx` page is updated with:
- **Advanced Filter Panel**: Supports range searches for price and beds.
- **Geospatial Trigger**: "Search Here" button hits the radius API.
- **Dynamic Pins**: Renders SVG pins on the map based on listing coordinates.

## Verification
Use the `curl` commands provided in the `api_test_guide.md` or run the manual verification steps in the walkthrough to ensure the data flow is correct.
