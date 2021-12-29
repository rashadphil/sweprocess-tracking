CREATE TYPE membership_status AS ENUM ('free', 'tier1', 'tier2');

CREATE TABLE users (
  uid SERIAL PRIMARY KEY UNIQUE,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  email_verified BOOLEAN,
  date_created DATE,
  last_login DATE,
  membership membership_status,
  picture VARCHAR(512)
);

CREATE TABLE companies (
  cid SERIAL PRIMARY KEY,
  company_name VARCHAR(255) UNIQUE,
  website_link VARCHAR(255),
  application_link VARCHAR(255),
  intern_salary INT
);

CREATE TYPE application_status AS ENUM ('not open', 'rejected', 'applied', 'online assesement', 'interview rounds', 'final round', 'offer');

CREATE TABLE user_companies (
  ucid SERIAL PRIMARY KEY,
  user_id INT references users(uid),
  company_id INT references companies(cid),
  user_status application_status,
  date_applied DATE
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");