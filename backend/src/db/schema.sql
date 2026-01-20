-- PropAnalyze Raw SQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo VARCHAR(255) DEFAULT 'default.jpg',
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'agent', 'admin')),
    plan VARCHAR(50) DEFAULT 'Free' CHECK (plan IN ('Free', 'Investor', 'Pro')),
    title VARCHAR(255) DEFAULT 'Investor',
    phone VARCHAR(20),
    country_code VARCHAR(10) DEFAULT '+1',
    favorites JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Migration for new columns
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='phone') THEN
        ALTER TABLE users ADD COLUMN phone VARCHAR(20);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='country_code') THEN
        ALTER TABLE users ADD COLUMN country_code VARCHAR(10) DEFAULT '+1';
    END IF;
END $$;

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2) NOT NULL,
    beds INTEGER,
    baths DECIMAL(3, 1),
    sqft INTEGER,
    year_built INTEGER,
    lot_size VARCHAR(100),
    zoning VARCHAR(100),
    hoa_fees DECIMAL(10, 2),
    mls_number VARCHAR(100),
    days_on_market INTEGER,
    is_fixer_upper BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'active',
    asset_class VARCHAR(100),
    price_unit VARCHAR(50) DEFAULT 'total',
    category VARCHAR(100),
    ratings_average DECIMAL(3, 2) DEFAULT 4.5,
    ratings_quantity INTEGER DEFAULT 0,
    location JSONB, -- GeoJSON or structured address/coord
    images TEXT[],
    features TEXT[],
    agent_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Analyses Table
CREATE TABLE IF NOT EXISTS analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    strategy VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Draft',
    metrics JSONB, -- capRate, cashOnCash, etc.
    inputs JSONB, -- purchasePrice, rehabBudget, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(property_id, user_id)
);

-- Portfolios Table
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Items (Junction Table for Properties)
CREATE TABLE IF NOT EXISTS portfolio_properties (
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    PRIMARY KEY (portfolio_id, property_id)
);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    analysis_id UUID REFERENCES analyses(id) ON DELETE SET NULL,
    file_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Ready',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties USING GIN (location);
CREATE INDEX IF NOT EXISTS idx_analyses_user_property ON analyses (user_id, property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_property ON reviews (property_id);
