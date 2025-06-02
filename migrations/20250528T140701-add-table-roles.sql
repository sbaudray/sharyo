CREATE TABLE IF NOT EXISTS roles (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES
('sharyo_admin'),
('org_admin'),
('org_dispatcher'),
('org_driver')
ON CONFLICT (name) DO NOTHING;