# Day 9: Portfolios & Reports APIs 

## Goal
Implement portfolio management and report generation tracking.

## Checklist

### 1. Portfolio Management (`src/services/portfolio.service.js`)
- [ ] **CRUD for Portfolios**: Create, Read, Update, Delete portfolios.
- [ ] **Add/Remove Properties**: Manage properties within a portfolio via the `portfolio_properties` junction table.

### 2. Reports Tracking (`src/services/report.service.js`)
- [ ] **Track Reports**: Record generated reports (PDF links) in the `reports` table.
- [ ] **List Reports**: Get all reports for the current user.

### 3. API Endpoints
-   **Portfolios**: `/api/v1/portfolios`
-   **Reports**: `/api/v1/reports`

## Verification
1.  Verify many-to-many relationship between properties and portfolios.
2.  Verify report metadata persists across sessions.
