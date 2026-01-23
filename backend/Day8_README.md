# Day 8: User Dashboard & History APIs 

## Goal
Implement APIs to track user investment history and persistent underwriting models.

## Checklist

### 1. Analysis History (`src/services/analysis.service.js`)
- [ ] **Save Analysis**: Save input assumptions and calculated metrics to the `analyses` table.
- [ ] **Get History**: Retrieve a list of past analyses for the current user with pagination.
- [ ] **Delete Analysis**: Allow users to remove old analyses.

### 2. API Endpoints
-   **Save**: `POST /api/v1/analysis/:propertyId`
-   **List**: `GET /api/v1/analysis`
-   **Delete**: `DELETE /api/v1/analysis/:id`

### 3. Frontend Integration
- [ ] Connect `History.jsx` to the new list endpoint.
- [ ] Implement "Save Analysis" button in `PropertyAnalysis.jsx`.

## Verification
1.  Verify analyses are saved correctly in the PostgreSQL table.
2.  Verify users can only see their own history.
