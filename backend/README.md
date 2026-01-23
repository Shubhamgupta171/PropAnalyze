# PropAnalyze Backend

## Overview
The PropAnalyze Backend is a robust RESTful API built with Node.js and Express. It serves as the core processing unit for the PropAnalyze application, handling data persistence, business logic, and external integrations.

## Architecture
The application follows a **Layered Architecture** to ensure separation of concerns and maintainability, optimized for performance using raw SQL:

1.  **Routes Layer** (`src/routes`): Defines API endpoints and routes requests to the appropriate controllers.
2.  **Controller Layer** (`src/controllers`): Handles incoming HTTP requests, validates input, and orchestrates the response.
3.  **Service Layer** (`src/services`): Contains the core business logic (ROI calculations, etc.).
4.  **Data Access Layer** (`src/models`): Represents the data structure and handles database interactions using **Raw SQL** (no ORM).
5.  **Utils & Middlewares**: Shared utilities and middleware functions (e.g., error handling, logging, Cloudinary uploads).

## Tech Stack
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: PostgreSQL (via `pg` driver)
-   **Image Hosting**: Cloudinary
-   **Environment Management**: dotenv
-   **Security**: Helmet, CORS
-   **Logging**: Morgan

## Directory Structure
```
backend/
├── src/
│   ├── config/         # Configuration files (DB connection pool, Cloudinary)
│   ├── controllers/    # Request handlers
│   ├── db/             # SQL Schema files
│   ├── middlewares/    # Custom middlewares (Error handling, Auth, Uploads)
│   ├── models/         # Raw SQL models (Data Access Layer)
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic services
│   └── utils/          # Utility classes/functions (AppError, APIFeatures)
├── .env                # Environment variables
├── setup_db.js         # Script to initialize PostgreSQL tables
├── server.js           # Server entry point
└── package.json        # Dependencies and scripts
```

## Prerequisites
-   Node.js (v18+ recommended)
-   npm or yarn
-   PostgreSQL instance (Local or Remote)

## Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd PropAnalyze/backend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the root `backend` directory:
    ```env
    PORT=5000
    DATABASE_URL=postgres://username:password@localhost:5432/propanalyze
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    ```

4.  **Database Setup**:
    Initialize your PostgreSQL tables using the setup script:
    ```bash
    node setup_db.js
    ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints
The API is versioned at `/api/v1`. Key resources include:

*   **Users/Auth**: `/api/v1/users` - Authentication, profiles, and subscription plans.
*   **Properties**: `/api/v1/properties` - Real estate listings with advanced **Geospatial Search** (`/properties-within`) and specialized **seeding scripts** for diverse testing.
*   **Analysis**: `/api/v1/analysis` - Investment underwriting and Max Offer logic.
*   **Health Check**: `/api/v1/health` - Application health status.


## Error Handling
The application uses a centralized error handling mechanism. All errors are caught by the global error handler middleware (`src/middlewares/error.middleware.js`), ensuring consistent JSON error responses.

## Development Progress

### Day 6: File Uploads & Media Handling ✅

#### Goal
Enable image uploads for properties so that each listing can have real photo galleries.

#### Implementation

##### 1. File Upload Infrastructure
- **Cloudinary Setup** (`src/config/cloudinary.config.js`):
  - Connects to Cloudinary cloud for professional image hosting.
  
- **Multer Cloudinary Storage** (`src/middlewares/upload.middleware.js`):
  - Configured to stream files directly to Cloudinary.
  - Filters files to ensure only images are uploaded.
  
- **Image Accessibility**:
  - Images are accessible via secure Cloudinary HTTPS URLs.
  - Stored in the database as an array of strings in the `images` field.

##### 2. API Updates
- **Create Property**: `POST /properties`
  - Accepts `multipart/form-data`.
  - Field: `images` (Max 10 files).
  
- **Update User Profile**: `PATCH /users/updateMe`
  - Accepts `multipart/form-data`.
  - Field: `photo`.

##### 3. Testing with Postman
1. **Headers**:
   - `Authorization: Bearer <token>`

2. **Body**:
   - Type: `form-data`
   - Field `images`: Select multiple image files.

3. **Verify**:
   - Check Response: `images` array should contain full Cloudinary URLs.

#### Key Points
- Switched from local storage to **Cloudinary** to ensure images persist in production and load faster via global CDN.
- Images are securely uploaded and referenced via HTTPS URLs.
