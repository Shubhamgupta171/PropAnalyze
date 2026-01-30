# Day 12: Professional PDF Reporting Engine

## Overview
Transform screen-based metrics into tangible deliverables. We will build a PDF generation service that takes investment analysis data (CoC, Cap Rate, Charts) and creates a branded, downloadable PDF report for investors to share with lenders or partners.

## Objectives
1.  **PDF Generation**: Programmatically generate high-quality PDF documents from HTML templates.
2.  **Template Engine**: Create a professional layout (`src/templates/report.html`) with branding, property photos, and data tables.
3.  **File Management**: Stream the generated PDF directly to the client or upload to Cloudinary and return the URL.

## Technical Implementation Plan

### 1. New Service `src/services/pdf.service.js`
- **Dependencies**: `puppeteer` (for high-fidelity rendering) or `pdfmake`/`jspdf`. 
    - *Recommendation*: `puppeteer` allows us to reuse React logic/styles if we render on server, else `html-pdf-node` is simpler.
- **Logic**:
    - Inject Property Data + Analysis Data into an HTML string.
    - Render to PDF buffer.

### 2. Update `src/controllers/report.controller.js`
- Validates that the user owns the analysis/property.
- Calls `pdfService.generateReport(data)`.
- **Option A (Stream)**: Set headers `Content-Type: application/pdf` and pipe the stream.
- **Option B (Store)**: Upload buffer to Cloudinary `raw` folder, save URL to DB, return JSON.

### 3. API Specifications

**POST /api/v1/reports/generate**
- **Body**: `{ propertyId, analysisId }`
- **Response**: `{ downloadUrl: "https://..." }` or PDF binary stream.

## Deliverables
- [ ] PDF Service using Puppeteer or PDFKit.
- [ ] HTML Template for "Investment Verification Report".
- [ ] API Endpoint to generate and download the report.
