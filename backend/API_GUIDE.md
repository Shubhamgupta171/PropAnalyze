# PropAnalyze Day 7: Analysis Engine API Guide

This guide details the investment analysis endpoints available for the frontend team.

## Base URL
`http://localhost:5000/api/v1`

## 1. Get ROI Analysis
Calculates deep investment metrics (NOI, Cap Rate, CoC) based on property data and optional overrides.

### Endpoint
`GET /analysis/roi/:propertyId`

### Query Parameters (Optional Overrides)
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `purchasePrice` | number | Property Price | The price being analyzed |
| `rehabCost` | number | 0 | Estimated repair costs |
| `downPayment` | number | 20 | Down payment percentage |
| `interestRate` | number | 6.5 | Annual mortgage interest rate |
| `monthlyRent` | number | ~0.8% of price | Expected monthly rental income |

### Curl Example
```bash
curl -X GET "http://localhost:5000/api/v1/analysis/roi/60183063-e47d-411a-8288-51834f3ad96f?interestRate=7.5&rehabCost=5000"
```

---

## 2. Get Max Allowable Offer (MAO)
Calculates the maximum purchase price to hit a specific target Cash-on-Cash Return.

### Endpoint
`GET /analysis/max-offer/:propertyId`

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `targetCoC` | number | Yes | The desired CoC % (e.g., 12) |
| `rehabCost` | number | No | Estimated repair costs |

### Curl Example
```bash
curl -X GET "http://localhost:5000/api/v1/analysis/max-offer/60183063-e47d-411a-8288-51834f3ad96f?targetCoC=15"
```

---

## 3. Get Market Overview
Provides aggregated data across all properties in the platform.

### Endpoint
`GET /analysis/overview`

### Curl Example
```bash
curl -X GET "http://localhost:5000/api/v1/analysis/overview"
```

---

## Core Financial Terms
- **NOI (Net Operating Income)**: Annual income minus operating expenses (before mortgage).
- **Cap Rate**: NOI / Purchase Price. Measures the "unleveraged" return.
- **Cash-on-Cash (CoC)**: Annual Cash Flow / Total Cash Invested. The "actual" return on your cash.
