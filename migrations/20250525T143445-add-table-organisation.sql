CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS organisations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar(50) NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz 
);

CREATE INDEX IF NOT EXISTS idx_organisations_name ON organisations (name);