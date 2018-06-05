const db = require("../database/connection");

const Reservation = {};

Reservation.all = () => {
  return db.any("SELECT * FROM reservations");
};

Reservation.find = id => {
  return db.one("SELECT * FROM reservations WHERE reservation_id = ${id}", {
    id: id
  });
};

Reservation.create = newReservation => {
  return db.one(
    "INSERT INTO reservations (room_number, late_checkout, guest_id) VALUES ($1, $2, $3) RETURNING *",
    [newReservation.room_number, newReservation.late_checkout, newReservation.guest_id]
  );
};

Reservation.update = updatedReservation => {
  return db.none("UPDATE reservations SET room_number= ${room_number}, late_checkout= ${late_checkout} WHERE guest_id = ${guest_id}", updatedReservation);
};

Reservation.delete = id => {
  return db.result("DELETE FROM reservations WHERE reservation_id = ${id}", { id: id });
};

module.exports = Reservation;
