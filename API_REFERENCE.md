# API Reference - PDF Reporting System

## 🔌 Complete API Endpoints for Frontend Integration

This document contains all the API endpoints and curl commands needed for the PDF reporting system.

---

## 🔑 Authentication

All endpoints require JWT authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get Your Token

First, login to get a JWT token:

```bash
# Login
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "yourpassword"
  }'

# Response:
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

**Save the token** - You'll need it for all subsequent requests.

---

## 📄 PDF Report Endpoints

### 1. Generate PDF Report (Upload to Cloud)

**Endpoint**: `POST /api/v1/reports/generate`

**Description**: Generates a PDF report, uploads it to Cloudinary, and saves the record in the database.

**Request**:
```bash
curl -X POST http://localhost:5001/api/v1/reports/generate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": 1,
    "analysisId": 1
  }'
```

**Response**:
```json
{
  "status": "success",
  "message": "PDF report generated successfully",
  "data": {
    "report": {
      "id": 1,
      "user_id": 1,
      "property_id": 1,
      "analysis_id": 1,
      "name": "123 Main St - Long-term Analysis",
      "file_url": "https://res.cloudinary.com/your-cloud/raw/upload/reports/report_1_1_1738358910123.pdf",
      "status": "Ready",
      "created_at": "2026-02-01T00:08:30.123Z",
      "updated_at": "2026-02-01T00:08:30.123Z"
    },
    "downloadUrl": "https://res.cloudinary.com/your-cloud/raw/upload/reports/report_1_1_1738358910123.pdf",
    "fileName": "report_1_1_1738358910123.pdf"
  }
}
```

**Frontend Usage**:
```javascript
const result = await reportService.generateReport(propertyId, analysisId);
console.log('Download URL:', result.data.downloadUrl);
```

---

### 2. Download PDF Report (Direct Stream)

**Endpoint**: `POST /api/v1/reports/download`

**Description**: Generates a PDF report and streams it directly to the client without saving to cloud.

**Request**:
```bash
curl -X POST http://localhost:5001/api/v1/reports/download \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": 1,
    "analysisId": 1
  }' \
  --output report.pdf
```

**Response**: Binary PDF file stream

**Response Headers**:
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="Property_Title_Report.pdf"
Content-Length: 245678
```

**Frontend Usage**:
```javascript
const blob = await reportService.downloadReport(propertyId, analysisId);

// Create download link
const url = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'report.pdf';
link.click();
window.URL.revokeObjectURL(url);
```

---

### 3. Get All Reports

**Endpoint**: `GET /api/v1/reports`

**Description**: Retrieves all reports for the authenticated user.

**Request**:
```bash
curl -X GET http://localhost:5001/api/v1/reports \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response**:
```json
{
  "status": "success",
  "results": 3,
  "data": {
    "reports": [
      {
        "id": 1,
        "user_id": 1,
        "property_id": 1,
        "analysis_id": 1,
        "name": "123 Main St - Long-term Analysis",
        "file_url": "https://res.cloudinary.com/your-cloud/raw/upload/reports/report_1_1.pdf",
        "status": "Ready",
        "created_at": "2026-02-01T00:08:30.123Z",
        "updated_at": "2026-02-01T00:08:30.123Z",
        "property_title": "123 Main St, San Francisco, CA",
        "strategy": "Long-term"
      },
      {
        "id": 2,
        "user_id": 1,
        "property_id": 2,
        "analysis_id": 2,
        "name": "456 Oak Ave - Cash Analysis",
        "file_url": "https://res.cloudinary.com/your-cloud/raw/upload/reports/report_2_2.pdf",
        "status": "Ready",
        "created_at": "2026-01-31T22:15:00.000Z",
        "updated_at": "2026-01-31T22:15:00.000Z",
        "property_title": "456 Oak Ave, San Francisco, CA",
        "strategy": "Cash"
      }
    ]
  }
}
```

**Frontend Usage**:
```javascript
const response = await reportService.getReports();
const reports = response.data.reports;
```

---

### 4. Get Specific Report

**Endpoint**: `GET /api/v1/reports/:id`

**Description**: Retrieves a specific report by ID.

**Request**:
```bash
curl -X GET http://localhost:5001/api/v1/reports/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "report": {
      "id": 1,
      "user_id": 1,
      "property_id": 1,
      "analysis_id": 1,
      "name": "123 Main St - Long-term Analysis",
      "file_url": "https://res.cloudinary.com/your-cloud/raw/upload/reports/report_1_1.pdf",
      "status": "Ready",
      "created_at": "2026-02-01T00:08:30.123Z",
      "updated_at": "2026-02-01T00:08:30.123Z",
      "property_title": "123 Main St, San Francisco, CA",
      "strategy": "Long-term"
    }
  }
}
```

**Frontend Usage**:
```javascript
const response = await reportService.getReport(reportId);
const report = response.data.report;
```

---

### 5. Delete Report

**Endpoint**: `DELETE /api/v1/reports/:id`

**Description**: Deletes a report by ID.

**Request**:
```bash
curl -X DELETE http://localhost:5001/api/v1/reports/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response**:
```json
{
  "status": "success",
  "data": null
}
```

**Frontend Usage**:
```javascript
await reportService.deleteReport(reportId);
```

---

## 🔗 Supporting Endpoints

These endpoints are used by the report generation process:

### 6. Save Analysis (Required Before Generating Report)

**Endpoint**: `POST /api/v1/analyses`

**Description**: Saves an analysis before generating a report.

**Request**:
```bash
curl -X POST http://localhost:5001/api/v1/analyses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "property_id": 1,
    "strategy": "Long-term",
    "metrics": {
      "capRate": 7.5,
      "cashOnCash": 12.3,
      "monthlyCashFlow": 450,
      "annualROI": 15.2,
      "noi": 18000,
      "operatingExpenses": 6000,
      "mortgagePayment": 1850
    },
    "inputs": {
      "purchasePrice": 450000,
      "downPayment": 20,
      "interestRate": 6.5,
      "monthlyRent": 2800,
      "rehabCost": 15000
    }
  }'
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "analysis": {
      "id": 1,
      "property_id": 1,
      "user_id": 1,
      "strategy": "Long-term",
      "status": "Draft",
      "metrics": { ... },
      "inputs": { ... },
      "created_at": "2026-02-01T00:08:30.123Z",
      "updated_at": "2026-02-01T00:08:30.123Z"
    }
  }
}
```

---

### 7. Get Property Details

**Endpoint**: `GET /api/v1/properties/:id`

**Description**: Gets property details (used internally by report generation).

**Request**:
```bash
curl -X GET http://localhost:5001/api/v1/properties/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "property": {
      "id": 1,
      "title": "Beautiful Family Home",
      "price": 450000,
      "beds": 3,
      "baths": 2,
      "sqft": 1800,
      "year_built": 2005,
      "category": "Residential",
      "location": {
        "address": "123 Main St, San Francisco, CA 94102",
        "coordinates": [-122.4194, 37.7749]
      },
      "images": ["https://..."],
      "created_at": "2026-01-15T10:00:00.000Z"
    }
  }
}
```

---

## 📋 Complete Frontend Integration Example

Here's how the frontend uses these APIs in sequence:

### **Scenario: User Generates a Report**

```javascript
// Step 1: User clicks "Generate Report" button
async function handleGenerateReport() {
  try {
    // Step 2: Save the analysis first
    const savedAnalysis = await analysisService.saveAnalysis(propertyId, {
      strategy: 'Long-term',
      metrics: currentMetrics,
      inputs: userInputs
    });
    
    const analysisId = savedAnalysis.data.analysis.id;
    
    // Step 3: Generate PDF report
    const result = await reportService.generateReport(propertyId, analysisId);
    
    // Step 4: Show success message
    toast.success('PDF Report generated successfully!');
    
    // Step 5: Optionally navigate to reports page
    navigate('/reports');
    
  } catch (error) {
    toast.error('Failed to generate report');
    console.error(error);
  }
}
```

### **Scenario: User Views Reports**

```javascript
// Step 1: Fetch all reports
async function fetchReports() {
  try {
    const response = await reportService.getReports();
    setReports(response.data.reports);
  } catch (error) {
    toast.error('Failed to load reports');
  }
}
```

### **Scenario: User Downloads a Report**

```javascript
// Step 1: Check if file_url exists
async function handleDownload(report) {
  if (report.file_url) {
    // Option A: Open existing URL
    window.open(report.file_url, '_blank');
  } else {
    // Option B: Generate and download
    try {
      const blob = await reportService.downloadReport(
        report.property_id,
        report.analysis_id
      );
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Failed to download report');
    }
  }
}
```

---

## 🔒 Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Property ID and Analysis ID are required"
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "You are not logged in. Please log in to get access."
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Property not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Failed to generate PDF report"
}
```

---

## 🧪 Testing with Postman/Thunder Client

### Collection Setup

1. **Create Environment Variables**:
   - `base_url`: `http://localhost:5001/api/v1`
   - `token`: Your JWT token

2. **Import These Requests**:

```json
{
  "name": "PDF Reports",
  "requests": [
    {
      "name": "Login",
      "method": "POST",
      "url": "{{base_url}}/auth/login",
      "body": {
        "email": "user@example.com",
        "password": "password123"
      }
    },
    {
      "name": "Generate Report",
      "method": "POST",
      "url": "{{base_url}}/reports/generate",
      "headers": {
        "Authorization": "Bearer {{token}}"
      },
      "body": {
        "propertyId": 1,
        "analysisId": 1
      }
    },
    {
      "name": "Get All Reports",
      "method": "GET",
      "url": "{{base_url}}/reports",
      "headers": {
        "Authorization": "Bearer {{token}}"
      }
    },
    {
      "name": "Download Report",
      "method": "POST",
      "url": "{{base_url}}/reports/download",
      "headers": {
        "Authorization": "Bearer {{token}}"
      },
      "body": {
        "propertyId": 1,
        "analysisId": 1
      }
    },
    {
      "name": "Delete Report",
      "method": "DELETE",
      "url": "{{base_url}}/reports/1",
      "headers": {
        "Authorization": "Bearer {{token}}"
      }
    }
  ]
}
```

---

## 📊 Rate Limiting

The API has rate limiting enabled:
- **Limit**: 100 requests per 15 minutes per IP
- **Header**: `X-RateLimit-Remaining` shows remaining requests

If you exceed the limit:
```json
{
  "status": "error",
  "message": "Too many requests, please try again later."
}
```

---

## 🔍 Swagger Documentation

Interactive API documentation is available at:
```
http://localhost:5001/api-docs
```

This provides:
- ✅ Interactive API testing
- ✅ Request/response examples
- ✅ Schema definitions
- ✅ Try it out functionality

---

## 📝 Quick Reference

### Base URL
```
http://localhost:5001/api/v1
```

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reports/generate` | Generate PDF & upload to cloud |
| POST | `/reports/download` | Generate PDF & stream directly |
| GET | `/reports` | Get all reports |
| GET | `/reports/:id` | Get specific report |
| DELETE | `/reports/:id` | Delete report |

### Required Headers
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Request Body Format
```json
{
  "propertyId": 1,
  "analysisId": 1
}
```

---

## ✅ Integration Checklist

- [ ] Get JWT token from login endpoint
- [ ] Save token in localStorage
- [ ] Include token in all API requests
- [ ] Handle 401 errors (redirect to login)
- [ ] Handle 404 errors (property/analysis not found)
- [ ] Handle 500 errors (show error message)
- [ ] Test generate report endpoint
- [ ] Test download report endpoint
- [ ] Test get all reports endpoint
- [ ] Test delete report endpoint
- [ ] Handle blob responses for PDF downloads
- [ ] Clean up blob URLs after download

---

## 🎯 Success Response Format

All successful responses follow this format:
```json
{
  "status": "success",
  "data": {
    // Response data here
  }
}
```

For list endpoints:
```json
{
  "status": "success",
  "results": 10,
  "data": {
    "reports": [...]
  }
}
```

---

**Need Help?** Check the Swagger docs at `http://localhost:5001/api-docs` for interactive testing!
