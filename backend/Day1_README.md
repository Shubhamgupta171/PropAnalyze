# Day 1: Project Setup & Architecture Review

## Goal
Establish a robust, production-ready foundation for the PropAnalyze backend. By the end of today, you should have a secure, logging-enabled Express server with centralized error handling.

## Checklist

### 1. Directory Structure Review
- [ ] Ensure your `src` folder matches this structure:
    ```
    src/
    ├── config/         # DB Pool and Env config
    ├── controllers/    # API Controllers
    ├── db/             # SQL Schema files
    ├── middlewares/    # Custom middlewares
    ├── models/         # Raw SQL Models
    ├── routes/         # API Routes
    ├── services/       # Business Logic
    └── utils/          # AppError, CatchAsync, APIFeatures, etc.
    ```

### 2. Environment Configuration
- [ ] Create/Verify `.env` file in the root `backend/` directory.
- [ ] Required Variables:
    PORT=5000
    NODE_ENV=development
    DATABASE_URL=postgres://username:password@localhost:5432/propanalyze
    JWT_SECRET=supersecretkeyHere
    JWT_EXPIRES_IN=90d

### 3. Middleware Setup
- [ ] **Data Security**: Install and setup `helmet` in `app.js`.
- [ ] **CORS**: Configure `cors` to allow requests from your frontend (e.g., `http://localhost:5173`).
- [ ] **Logging**: Setup `morgan` for dev logging.

### 4. Global Error Handling
- [ ] Create `src/utils/AppError.js`:
    -   Custom error class extending built-in `Error`.
    -   Should take `message` and `statusCode`.
- [ ] Create `src/middlewares/error.middleware.js`:
    -   Central function to handle operational vs. programming errors.
    -   Send clean JSON responses to client.

### 5. Health Check
- [ ] Create a simple GET route `/api/v1/health` that returns `{ status: 'success', message: 'OK' }`.

## Testing
-   Run `npm run dev`.
-   Visit `http://localhost:5000/api/v1/health`.
-   Trigger a fake error to test global error handler.
