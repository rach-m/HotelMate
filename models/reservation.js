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



module.exports = Reservation;
