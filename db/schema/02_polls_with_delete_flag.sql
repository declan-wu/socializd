GRANT USAGE ON SCHEMA public TO labber;

DROP TABLE IF EXISTS voters CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS polls CASCADE;
DROP TABLE IF EXISTS options CASCADE;
DROP TABLE IF EXISTS rankings CASCADE;


CREATE TABLE voters (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id serial PRIMARY KEY NOT NULL,
  poll_id integer,
  name VARCHAR(255) NOT NULL,
  email text NOT NULL,
  password VARCHAR(255)
);

CREATE TABLE polls (
  id serial PRIMARY KEY,
  admin_id integer not null references users(id) on delete cascade,
  created_date date not null,
  title text not null,
  active boolean
);

CREATE TABLE options (
  id serial PRIMARY KEY,
  poll_id integer not null references polls(id) on delete cascade,
  name text not null
);

CREATE TABLE rankings (
  voter_id integer references voters(id) on delete cascade,
  poll_id integer references polls(id) on delete cascade,
  option_id integer references options(id) on delete cascade,
  relative_points decimal NOT NULL,
  PRIMARY KEY (voter_id, poll_id, option_id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO labber;
