DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS pizza;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS preferences;
DROP TABLE IF EXISTS customers;

CREATE TABLE admin(
  username TEXT,
  password TEXT
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT,
  username TEXT,
  password TEXT,
  address TEXT,
  phone TEXT,
  payment TEXT
); 

CREATE TABLE preferences (
  customer_id INT REFERENCES customers,
  ingredients TEXT
);

CREATE TABLE drinks (
  id SERIAL PRIMARY KEY,
  description TEXT,
  manufacturer TEXT,
  supplier TEXT,
  price TEXT
);

CREATE TABLE pizza (
  size TEXT,
  types TEXT,
  ingredients TEXT,
  price TEXT,
  happy_hour TEXT
);