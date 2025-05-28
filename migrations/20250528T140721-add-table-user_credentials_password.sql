CREATE TABLE IF NOT EXISTS user_credentials_password (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username varchar(255) NOT NULL UNIQUE,
  password_hash varchar(255) NOT NULL,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);