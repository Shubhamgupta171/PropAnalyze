# Day 4: Property CRUD APIs

## Goal
Implement full Create, Read, Update, Delete (CRUD) operations for properties, ensuring that only authorized users (Agents/Admin) can manage data.

## Checklist

### 1. Architecture Update
- [x] **Auth Middleware** (`src/middlewares/auth.middleware.js`):
    -   Extracted `protect` for better organization.
    -   Added `restrictTo` for role-based access (e.g., only 'agent' can create).
- [x] **Property Service** (`src/services/property.service.js`):
    -   Replaced mock data with real **Raw SQL** queries via the `Property` model.
    -   Added authorization logic (User can only update their own property).

### 2. API Endpoints (`src/routes/property.routes.js`)
-   **Method**: `GET /api/v1/properties`
    -   **Access**: Public
    -   **Desc**: Fetch all properties.
-   **Method**: `GET /api/v1/properties/:id`
    -   **Access**: Public
    -   **Desc**: Fetch property details.
-   **Method**: `POST /api/v1/properties`
    -   **Access**: Protected (Agent/Admin)
    -   **Desc**: Create a new property.
-   **Method**: `PATCH /api/v1/properties/:id`
    -   **Access**: Protected (Owner/Admin)
    -   **Desc**: Update details.
-   **Method**: `DELETE /api/v1/properties/:id`
    -   **Access**: Protected (Owner/Admin)
    -   **Desc**: Remove property.

### 3. Testing with Postman
1.  **Login as Agent**: Get your Bearer Token.
2.  **Create Property**:
    -   POST to `/properties`.
    -   Header: `Authorization: Bearer <your_token>`
    -   Body:
        ```json
        {
          "title": "Modern Loft",
          "price": 500000,
          "description": "Beautiful view",
          "location": {
            "coordinates": [-73.98, 40.75],
            "address": "NY"
          }
        }
        ```
3.  **Verify**:
    -   Check the `properties` table in PostgreSQL to see `agent_id` is correctly linked to your UUID.
    -   Try to DELETE it as a different user (should return 403 Forbidden).
