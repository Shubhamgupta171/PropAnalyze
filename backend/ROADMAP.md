# PropAnalyze Backend Development Roadmap

This document outlines the 10-day plan to build the complete backend for PropAnalyze, ensuring a robust architecture, secure authentication, and seamless frontend integration.

## 📅 Phase 1: Foundation & Core Architecture (Days 1-3)

### Day 1: Project Setup & Architecture Review
**Goal**: Establish a solid codebase foundation.
- [ ] Review and refine directory structure (`src/controllers`, `src/services`, `src/utils`).
- [ ] Configure Environment Variables (`.env`) for Dev/Prod.
- [ ] Implement central Error Handling middleware (`AppError` class).
- [ ] Set up Logging (Morgan/Winston) and Security middleware (Helmet, CORS).
- [ ] **Deliverable**: A running Express server with health check and error handling.

### Day 2: Database Design & SQL Schemas
**Goal**: Define the data models and initialize the PostgreSQL database.
- [x] Connect to PostgreSQL using Connection Pool.
- [x] Create `schema.sql` (Tables for Users, Properties, Analyses, Reviews, Portfolios, Reports).
- [x] Implement `setup_db.js` for automated table migration.
- [x] **Deliverable**: Raw SQL models created and DB connection secured.

### Day 3: Authentication System
**Goal**: Secure the application with JWT-based auth.
- [x] Implement `signup` and `login` endpoints using Raw SQL queries.
- [x] Password hashing using `bcryptjs`.
- [x] Generate and verify JSON Web Tokens (JWT).
- [x] Create `protect` middleware to secure private routes.
- [x] **Deliverable**: Functioning Auth API with protected route demonstration.

---

## 📅 Phase 2: Core Features & Logic (Days 4-7)

### Day 4: Property CRUD APIs
**Goal**: Enable property management.
- [x] Implement Create, Read, Update, Delete for Properties using Raw SQL.
- [x] Add UUID support for all primary keys.
- [x] Implement authorization (Users can only manage their own properties).
- [x] **Deliverable**: Full CRUD endpoints for `/api/v1/properties`.

### Day 5: Search, Filter & Maps API
**Goal**: Advanced data retrieval.
- [x] Implement SQL-based filtering, sorting, and pagination.
- [x] Create LATERAL JOIN queries to enrich property listings with ROI metrics.
- [x] **Deliverable**: Advanced search APIs optimized for map view.

### Day 6: File Uploads & Cloudinary Handling
**Goal**: Manage property images in the cloud.
- [x] Set up Multer with Cloudinary storage.
- [x] Implement secure image uploads (auto-resize and optimization).
- [x] Update User and Property models to store Cloudinary URLs.
- [x] **Deliverable**: Reliable image hosting system.

### Day 7: Analysis Engine Logic
**Goal**: Implement investment underwriting features.
- [x] Create ROI engine for Long-term, Short-term, and Mid-term strategies.
- [x] Implement **Max Allowable Offer** calculation logic.
- [x] **Deliverable**: Advanced `/api/v1/analysis` endpoints returning computed ROI data.


---

## 📅 Phase 3: Integration & Polish (Days 8-10)

### Day 8: Frontend Integration - Auth & User
**Goal**: Connect React Login/Signup to Backend.
- [ ] Test Auth APIs with Frontend.
- [ ] Handle JWT storage in Frontend (Cookies/LocalStorage).
- [ ] Fetch "Current User" profile.
- [ ] **Deliverable**: Working Login/Signup flows in UI.

### Day 9: Frontend Integration - Properties & Map
**Goal**: Display real data on the Dashboard.
- [ ] Fetch Property list from API to display on Map.
- [ ] Connect "Add Property" form to Backend.
- [ ] Handle loading states and error displays.
- [ ] **Deliverable**: Dynamic Map Dashboard powered by Backend data.

### Day 10: Testing, Security & Deployment Prep
**Goal**: Production readiness.
- [ ] Implement Rate Limiting to prevent abuse.
- [ ] Data Sanitization (NoSQL injection prevention).
- [ ] Postman Collection documentation.
- [ ] Final end-to-end testing.
- [ ] **Deliverable**: Production-ready Backend.

---

## 📅 Phase 4: Enterprise Features (Days 11-12)

### Day 11: Advanced Search Engine
**Goal**: Handle scale with database-level filtering and pagination.
- [ ] Refactor `Property.findAll` for dynamic SQL generation.
- [ ] Implement Pagination (Page/Limit).
- [ ] Add Sorting options (Price, Date, ROI).
- [ ] **Deliverable**: High-performance Search API.

### Day 12: PDF Reporting Engine
**Goal**: Generate professional investment packets.
- [ ] Integrate PDF generation library (Puppeteer/PDFKit).
- [ ] Design HTML Report Template.
- [ ] Create generation endpoint returning file stream or URL.
- [ ] **Deliverable**: Downloadable Investment Reports.
