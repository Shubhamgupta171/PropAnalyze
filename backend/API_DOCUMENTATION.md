# PropAnalyze API v1: Postman Collection & Developer Guide

**Version**: 1.0.0  
**Base URL**: `http://localhost:5000/api/v1` (Default)  

## 📚 Overview

This documentation details the complete API surface of the PropAnalyze platform. It corresponds directly to the provided Postman Collection and is designed to help frontend developers and clients integrate seamlessly.

### 🔑 Authentication
The API uses **JWT (JSON Web Tokens)** for security.
- **Header**: `Authorization: Bearer <YOUR_TOKEN>`
- **Getting a Token**: Use the `POST /users/login` endpoint.
- **Token Persistence**: Frontend applications should persist this token (e.g., in `localStorage`) and attach it to all protected requests.

---

## 1. Authentication & Users

### Register User
Create a new user account.
- **Method**: `POST`
- **Endpoint**: `/users/signup`
- **Body** (JSON):
    ```json
    {
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123",
        "phone": "1234567890",
        "countryCode": "+1"
    }
    ```

### Login
Authenticate and receive a JWT token.
- **Method**: `POST`
- **Endpoint**: `/users/login`
- **Body** (JSON):
    ```json
    {
        "email": "test@example.com",
        "password": "password123"
    }
    ```
- **Response**: Returns `{ token, user }`.

### Get Current Profile
Retrieve details for the logged-in user.
- **Method**: `GET`
- **Endpoint**: `/users/me`
- **Auth**: Required

### Update Profile Photo
- **Method**: `PATCH`
- **Endpoint**: `/users/updateMe`
- **Content-Type**: `multipart/form-data`
- **Body**:
    - `photo`: File (image)
    - `name`: Text (optional)

---

## 2. Properties API

### Public Listing Search (Advanced Filtering)
Fetch properties with filtering, sorting, and pagination.
- **Method**: `GET`
- **Endpoint**: `/properties`
- **Query Parameters**:
    - `price[lt]=1000000`: Price less than 1M.
    - `price[gte]=1500000`: Price greater than/equal to 1.5M.
    - `sort=-price`: Sort by price descending (High to Low).
    - `sort=price`: Sort by price ascending (Low to High).
    - `page=2`: Pagination page number.
    - `limit=5`: Results per page.
    - `fields=title,price`: Select specific fields only.

### Get Property Details
- **Method**: `GET`
- **Endpoint**: `/properties/:id`

### Create Property (Agent/Admin)
- **Method**: `POST`
- **Endpoint**: `/properties`
- **Auth**: Required
- **Body** (JSON):
    ```json
    {
      "title": "Luxury Penthouse",
      "price": 1200000,
      "description": "Stunning city views",
      "location": {
        "address": "123 Sky Lane, SF",
        "coordinates": [-122.4194, 37.7749]
      },
      "asset_class": "Residential",
      "sqft": 2500,
      "beds": 3,
      "baths": 2.5
    }
    ```

### Update Property
- **Method**: `PATCH`
- **Endpoint**: `/properties/:id`
- **Auth**: Required (Owner/Admin)
- **Body** (JSON):
    ```json
    {
      "price": 1150000,
      "status": "pending"
    }
    ```

### Delete Property
- **Method**: `DELETE`
- **Endpoint**: `/properties/:id`
- **Auth**: Required

### Upload Property Images
Add images to an existing property listing.
- **Method**: `POST` (or PATCH)
- **Endpoint**: `/properties` (Multipart)
- **Body** (form-data):
    - `images`: File (Select multiple)
    - `title`: Text
    - `price`: Text

---

## 3. Geospatial Intelligence

### Search Within Radius
Find properties near a specific geolocation.
- **Method**: `GET`
- **Endpoint**: `/properties/properties-within/:distance/center/:latlng/unit/:unit`
- **Example**: `/properties/properties-within/10/center/37.7749,-122.4194/unit/mi`
- **Params**:
    - `distance`: Integer (e.g., 10)
    - `latlng`: Latitude,Longitude (e.g., 37.7749,-122.4194)
    - `unit`: `mi` (miles) or `km` (kilometers)

---

## 4. Portfolio Management

### List All Portfolios
- **Method**: `GET`
- **Endpoint**: `/portfolios`
- **Auth**: Required

### Create Portfolio
- **Method**: `POST`
- **Endpoint**: `/portfolios`
- **Auth**: Required
- **Body** (JSON):
    ```json
    {
        "name": "Sunbelt Rentals",
        "description": "High yield properties in AZ and FL"
    }
    ```

### Add Property to Portfolio
- **Method**: `POST`
- **Endpoint**: `/portfolios/:portfolioId/properties`
- **Body** (JSON):
    ```json
    {
        "propertyId": "<PROPERTY_UUID>"
    }
    ```

### Delete Portfolio
- **Method**: `DELETE`
- **Endpoint**: `/portfolios/:portfolioId`

---

## 5. Report Generation (PDFs)

### Generate & Upload Report
Calculates metrics and generates a PDF, saving it to Cloudinary.
- **Method**: `POST`
- **Endpoint**: `/reports/generate`
- **Auth**: Required
- **Body** (JSON):
    ```json
    {
        "propertyId": 1,
        "analysisId": 1
    }
    ```

### Download Report (Direct Stream)
Generates PDF and streams it directly to the browser (no storage).
- **Method**: `POST`
- **Endpoint**: `/reports/download`
- **Body**: Same as above.

### Get All Reports
List generated reports for the authorized user.
- **Method**: `GET`
- **Endpoint**: `/reports`

### Manual Report Creation (Tracking)
Track an existing external report file.
- **Method**: `POST`
- **Endpoint**: `/reports`
- **Body**:
    ```json
    {
      "name": "ROI Report - 123 Main St",
      "propertyId": "<PROPERTY_UUID>",
      "fileUrl": "https://storage.com/reports/report_123.pdf",
      "status": "Ready"
    }
    ```

### Delete Report
- **Method**: `DELETE`
- **Endpoint**: `/reports/:id`

---

## 6. Postman Import Guide

To use the collection provided:

1.  Open Postman.
2.  Click **Import** (Top Left).
3.  Paste the raw JSON content of the collection.
4.  **Environment Setup**:
    - Create a new Environment in Postman.
    - Add variable `URL` = `http://localhost:5000/api/v1`.
    - Add variable `TOKEN` = `<Your JWT Token>`.
5.  Start testing!

---

**Note**: Ensure your backend server is running (`npm start`) before making requests. All endpoints documented here correspond to the `v1` API namespace.
