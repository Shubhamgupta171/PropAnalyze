# Day 7: Analysis Engine Logic

## Goal
Implement advanced financial modeling and market aggregation using Raw SQL to give users deep investment insights.

## Checklist

### 1. Analysis Logic (`src/services/analysis.service.js`)
- [x] **Raw SQL ROI Calculator**:
    -   Calculates **NOI**, **Cap Rate**, and **Cash-on-Cash**.
    -   Includes **Loan Calculations** (Principal, Interest, Monthly Payments).
    -   Includes overrides for what-if scenarios (purchase price, rehab, interest rates).
- [x] **Max Allowable Offer (MAO)**:
    -   Iterative math engine to find the highest price an investor can pay to hit a target ROI.
- [x] **Market SQL Stats**:
    -   Uses SQL aggregate functions (`AVG`, `MIN`, `MAX`, `COUNT`) to provide market benchmarks.

### 2. API Endpoints
-   **Get ROI**: `GET /api/v1/analysis/roi/:propertyId`
    -   Returns: `{ annualGrossRent, operatingExpenses, noi, capRate, cashOnCash, monthlyMortgage, monthlyCashFlow }`.
-   **Get Max Offer**: `GET /api/v1/analysis/max-offer/:propertyId?targetCoC=12`
    -   Returns: `{ maxAllowableOffer, belowAsk, targetCoC }`.
-   **Get Market Overview**: `GET /api/v1/analysis/overview`

### 3. Testing
1.  **Market Overview**:
    -   Call `GET /api/v1/analysis/overview`.
    -   Should see stats for all properties in your PostgreSQL tables.
2.  **ROI**:
    -   Call `GET /api/v1/analysis/roi/:id`.
    -   Verify the **monthlyMortgage** and **monthlyCashFlow** match your manual calculations.
3.  **Max Offer**:
    -   Call `GET /api/v1/analysis/max-offer/:id?targetCoC=15`.
    -   Observe how the price decreases as you increase the target ROI!

## Next Steps
Congratulations! Your backend is now a high-performance, SQL-powered investment machine. You are ready to connect to the React/Next.js frontend.

