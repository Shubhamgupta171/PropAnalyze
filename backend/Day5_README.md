# Day 5: Search, Filter & Maps API

## Goal
Enable advanced data retrieval including filtering, sorting, pagination, and geospatial searches to power the Map Dashboard.

## Checklist

### 1. New Features
- [x] **SQL APIFeatures** (`src/utils/APIFeatures.js`):
    -   Generates raw SQL statements (`WHERE`, `ORDER BY`, `LIMIT`) from query parameters.
    -   Handles standard filtering (`price[gte]=100`).
    -   Handles sorting (`sort=-price`).
    -   Handles field selection (`fields=title,price`).
    -   Handles pagination (`page=1&limit=10`).
- [x] **Geospatial & Metrics** (`src/services/property.service.js`):
    -   All properties now include **Latest Cap Rate** and **CoC** via a LATERAL JOIN for the Map Dashboard.

### 2. API Endpoints
-   **Advanced Search**: `GET /api/v1/properties?price[lt]=500000&sort=-price&limit=5`
-   **Map Search**: `GET /api/v1/properties/properties-within/:distance/center/:latlng/unit/:unit`
    -   Example: `/api/v1/properties/properties-within/10/center/40.75,-73.98/unit/mi`
    -   Desc: Finds properties within 10 miles of NYC.

### 3. Frontend Integration Tips
-   **Search Bar**: Just map the form state to the query string:
    ```js
    const queryString = \`?price[lte]=\${maxPrice}&rooms[gte]=\${minRooms}\`;
    fetch(\`/api/v1/properties\${queryString}\`)
    ```
-   **Map Dashboard**: When the user moves the map, get the center coordinates and fetch:
    ```js
    const { lat, lng } = map.getCenter();
    fetch(\`/api/v1/properties/properties-within/10/center/\${lat},\${lng}/unit/mi\`)
    ```

## Verification
1.  **Filter**: Create a property with price 500. Search for `price[lt]=600`. It should appear. Search `price[lt]=400`. It should NOT appear.
2.  **Geo**: Create a property in NY. Search within 10mi of NY. It should appear. Search within 10mi of LA. It should NOT appear.
