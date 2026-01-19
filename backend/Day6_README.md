# Day 6: File Uploads & Media Handling

## Goal
Enable image uploads for properties so that each listing can have real photo galleries.

## Checklist

### 1. File Upload Infrastructure
- [x] **Cloudinary Setup** (`src/config/cloudinary.config.js`):
    -   Connects to your Cloudinary cloud for professional image hosting.
- [x] **Multer Cloudinary Storage** (`src/middlewares/upload.middleware.js`):
    -   Configured to stream files directly to Cloudinary.
    -   Filters files to ensure only images are uploaded.
- [x] **Image Accessibility**:
    -   Images are accessible via secure Cloudinary HTTPS URLs.
    -   Stored in the database as an array of strings in the `images` field.

### 2. API Updates
-   **Create Property**: `POST /properties`
    -   Accepts `multipart/form-data`.
    -   Field: `images` (Max 10 files).
-   **Update User Profile**: `PATCH /users/updateMe`
    -   Accepts `multipart/form-data`.
    -   Field: `photo`.

### 3. Testing with Postman
1.  **Headers**:
    -   `Authorization: Bearer <token>`
2.  **Body**:
    -   Type: `form-data`
    -   Field `images`: Select multiple image files.
3.  **Verify**:
    -   Check Response: `images` array should contain full Cloudinary URLs.

## Notes
-   We have switched from local storage to **Cloudinary** to ensure images persist in production and load faster via global CDN.
