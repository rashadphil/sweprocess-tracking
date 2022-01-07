CREATE TYPE membership_status AS ENUM ('free', 'tier1', 'tier2');
CREATE TYPE application_status AS ENUM ('not open', 'rejected', 'applied', 'online assesment', 'interview rounds', 'final round', 'offer');

CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
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
  intern_salary INT,
  popularity INT
);


CREATE TABLE user_companies (
  user_id INT references users(uid) ON UPDATE CASCADE ON DELETE CASCADE,
  company_id INT references companies(cid) ON UPDATE CASCADE,
  company_name VARCHAR(255) references companies(company_name)
  user_status application_status,
  CONSTRAINT user_company_id PRIMARY KEY (user_id, company_id),
  date_applied DATE
);

CREATE UNIQUE INDEX "user_companies_user_company_unique" ON "user_companies"("user_id" int4_ops,"company_id" int4_ops);

-- Update Popularity counts of companies
UPDATE companies SET popularity = (SELECT COUNT(*) FROM user_companies WHERE user_companies.company_id = companies.cid);

CREATE TABLE leetcode (
  lid SERIAL PRIMARY KEY,
  title VARCHAR(255),
  difficulty VARCHAR(255)
);

CREATE TABLE tag (
  tid SERIAL PRIMARY KEY,
  tag_name VARCHAR(255) UNIQUE
  color CHAR(6)
  alias VARCHAR(255)
);

CREATE TABLE leetcode_tags (
  lid INT references leetcode(lid) ON UPDATE CASCADE ON DELETE CASCADE,
  tid INT references tag(tid) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT leetcode_tags_id PRIMARY KEY (lid, tid)
);

CREATE TABLE users_leetcode (
  uid INT references users(uid) ON UPDATE CASCADE ON DELETE CASCADE,
  lid INT references leetcode(lid) ON UPDATE CASCADE ON DELETE CASCADE,
  date_solved DATE
  CONSTRAINT users_leetcode_id PRIMARY KEY (uid, lid)
);
