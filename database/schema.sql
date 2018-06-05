CREATE DATABASE hotelmate_db;

-- \c hotelmate_db

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS guests;


CREATE TABLE guests (
  guest_id SERIAL PRIMARY KEY,
  fname TEXT NOT NULL,
  lname TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  phone TEXT NOT NULL,
  credit_card CHAR (16) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL
);


CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  room_number INTEGER,
  late_checkout CHAR(1) ,
  guest_id INTEGER REFERENCES guests(guest_id)
)
