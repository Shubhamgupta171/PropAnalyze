# Frontend API Integration Guide (Swagger)

To streamline the integration between our frontend and backend, we have provided an interactive Swagger documentation portal.

## 🚀 How to Access

1.  **Ensure the Backend is Running**:
    ```bash
    cd PropAnalyze/backend
    npm run dev
    ```
2.  **Open Documentation**:
    Navigate to [http://localhost:5001/api-docs](http://localhost:5001/api-docs) in your browser.

---

## 🛠️ Key Features for Frontend Devs

### 1. Interactive Testing
You can test any API endpoint directly from the browser:
- Click on an endpoint (e.g., `POST /users/login`).
- Click **"Try it out"**.
- Enter your request body.
- Click **"Execute"** to see the real response from the backend.

### 2. Authorization
For protected routes (Properties, Analysis):
- Login via `/users/login` to get your `token`.
- Click the **"Authorize"** button at the top of the Swagger page.
- Enter `Bearer <your_token>`.
- Now you can test protected endpoints!

### 3. Data Models (Schemas)
The documentation is now **schema-backed**. Scroll to the **"Schemas"** section at the bottom of the page to see the exact structure (types, formats, and enums) for:
- **User**: Profile data, roles, and photo URLs.
- **Property**: Full details including geospatial location, price history, and latest ROI metrics.
- **Analysis**: Detailed output for ROI calculations, expenses, and cash flow.
- **Error Responses**: Standardized JSON error format.

---

## 📌 Important Base URL
All API calls from the frontend should use this base URL:
`http://localhost:5001/api/v1`

### 4. Rate Limiting
To ensure fair usage and prevent abuse, API requests are rate-limited:
- **Limit**: 100 requests per hour per IP.
- **Headers**: Check `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers in the response to monitor your usage.
- **Exceeded**: If you exceed the limit, you will receive a `429 Too Many Requests` error.

## 💬 Support
If you find any discrepancy between the docs and the UI designs, please reach out to the backend team.
