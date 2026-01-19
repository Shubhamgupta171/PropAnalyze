# Day 2: Database Design & SQL Schemas

## Goal
Connect your application to PostgreSQL and define the data structures for Users and Properties using Raw SQL Table definitions.

## Checklist

### 1. Database Connection
- [x] Create `src/config/db.js` to handle PostgreSQL Connection Pool.
- [x] Update `server.js` to invoke the connection logic.
- [ ] **Verification**: Run `npm run dev` and ensure you see "PostgreSQL Connected" in the terminal.

### 2. SQL Schema & Models
- [x] **Schema Design** (`src/db/schema.sql`):
    -   Define `users`, `properties`, and `analyses` tables.
    -   Use `UUID` for primary keys.
    -   Use `JSONB` for flexible object storage (favorites, location).
- [x] **Setup Script** (`setup_db.js`):
    -   Automated script to run your schema against the database.
- [x] **User Model** (`src/models/user.model.js`):
    -   Direct SQL queries for CRUD.
    -   Includes password hashing and verification.
- [x] **Property Model** (`src/models/property.model.js`):
    -   `title`, `description`, `price`.
    -   `location` (JSONB format for structured address/coordinates).
    -   `agent_id` (Foreign key to users table).

### 3. Testing the Models
-   Run `node setup_db.js` to initialize your tables.
-   Access your database using `psql propanalyze` and run `\dt` to verify tables are created.
-   Check that the `location` field in JSONB supports your frontend map coordinates.

