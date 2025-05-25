CREATE TABLE IF NOT EXISTS roles (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES
('sharyo_admin'),
('org_admin'),
('driver')
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id integer NOT NULL REFERENCES roles(id),
  full_name VARCHAR(255),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS user_credentials_password (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username varchar(255) NOT NULL UNIQUE,
  password_hash varchar(255) NOT NULL,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_organisations (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now()
)