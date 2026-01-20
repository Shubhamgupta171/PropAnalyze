# Day 3: Authentication, Security & Robustness

## Goal
Implement a production-ready Authentication system using JWT and Raw SQL, featuring robust error handling and advanced user profile support.

## Checklist

### 1. Implementation
- [x] **Auth Controller** (`src/controllers/auth.controller.js`):
    -   `signup`: Handles registration with name, email, password, **phone**, and **countryCode**.
    -   `login`: Securely authenticates users using Raw SQL and returns JWT + user data.
    -   `getMe`: Returns the currently authenticated user's profile.
    -   `protect`: Middleware to secure private routes.
- [x] **Error Handling** (`src/middlewares/error.middleware.js`):
    -   Implemented robust PostgreSQL unique violation detection (Code 23505) to provide friendly messages like "User already exists please signin".
- [x] **Schema Migration** (`src/db/schema.sql`):
    -   Added idempotent logic to add `phone` and `country_code` columns.

### 2. Testing with Postman/Swagger

1.  **Signup**:
    -   **Method**: POST
    -   **URL**: `http://localhost:5001/api/v1/users/signup`
    -   **Body (JSON)**:
        ```json
        {
          "name": "Test User",
          "email": "test@example.com",
          "phone": "1234567890",
          "countryCode": "+1",
          "password": "Password123!",
          "role": "agent"
        }
        ```

2.  **Login**:
    -   **Method**: POST
    -   **URL**: `http://localhost:5001/api/v1/users/login`
    -   **Body**:
        ```json
        {
          "email": "test@example.com",
          "password": "Password123!"
        }
        ```

3.  **Get Current User**:
    -   **Method**: GET
    -   **URL**: `http://localhost:5001/api/v1/users/me`
    -   **Header**: `Authorization: Bearer <your_token>`

## Key Technical Features
-   **Security**: Password hashing with `bcryptjs`.
-   **Robustness**: Error handler automatically catches database duplicates and formats them for the frontend.
-   **Documentation**: Integrated Swagger for interactive API exploration at `/api-docs`.
-   **Schema**: Idempotent SQL migrations ensure the DB remains in sync without data loss.

