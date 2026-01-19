# Day 3: Authentication System Implementation

## Goal
Secure your API with JWT authentication using high-performance Raw SQL queries. By the end of today, users should be able to sign up, log in, and access protected routes.

## Checklist

### 1. Implementation
- [x] **Auth Controller** (`src/controllers/auth.controller.js`):
    -   `signup`: Creates a new user in the `users` table.
    -   `login`: Verifies credentials using raw SQL select and issues JWT.
    -   `protect`: Middleware that gates access to routes.
- [x] **Auth Routes** (`src/routes/auth.routes.js`):
    -   POST `/signup`
    -   POST `/login`

### 2. Testing with Postman
1.  **Signup**:
    -   Method: POST
    -   URL: `http://localhost:5000/api/v1/users/signup`
    -   Body (JSON):
        ```json
        {
          "name": "Test User",
          "email": "test@example.com",
          "password": "password123",
          "role": "agent"
        }
        ```
    -   Result: Should return a token and store user in PostgreSQL.

2.  **Login**:
    -   Method: POST
    -   URL: `http://localhost:5000/api/v1/users/login`
    -   Body:
        ```json
        {
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    -   Result: Should return a token.

3.  **Protected Route**:
    -   Any route using `authController.protect` now validates the JWT against the PostgreSQL user ID.

## Notes
-   Password hashing is handled via `bcryptjs` before the Raw SQL `INSERT` statement.
-   Ensure `JWT_SECRET` is set in your `.env`.

