CREATE TABLE IF NOT EXISTS user_organisations (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now()
);