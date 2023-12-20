CREATE TABLE IF NOT EXISTS "users" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    -- username VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    avatar VARCHAR,
    role VARCHAR DEFAULT 'user',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CHECK (role IN ('admin', 'user')), -- change roles as needed
    CHECK (email LIKE '%@%')
);