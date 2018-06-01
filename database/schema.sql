CREATE DATABASE hotelmate_db;

\c hotelmate_db

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS guests;


CREATE TABLE guests (
  guest_id SERIAL PRIMARY KEY,
  fname TEXT,
  lname TEXT,
  email TEXT,
  address TEXT,
  phone TEXT,
  credit_card CHAR (16),
  check_in DATE,
  check_out DATE
);


CREATE TABLE reservations(
  reservation_id SERIAL PRIMARY KEY,
  room_number INTEGER,
  late_checkout CHAR(1),
  guest_id INTEGER REFERENCES guests(guest_id)
)
