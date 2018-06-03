const db = require("../database/connection");

const Guest = {};

Guest.all = () => {
  return db.any("SELECT * FROM guests");
};

Guest.find = id => {
  return db.one(
    "SELECT * FROM guests WHERE guest_id = ${id}",
    { id: id }
  );
};

Guest.create = newGuest => {
 return db.one(
   "INSERT INTO guests (fname, lname, email, address, city, state, zip, phone, credit_card, check_in, check_out) VALUES ($1, $2, $3 ,$4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
   [
     newGuest.fname,
     newGuest.lname,
     newGuest.email,
     newGuest.address,
     newGuest.city,
     newGuest.state,
     newGuest.zip,
     newGuest.phone,
     newGuest.credit_card,
     newGuest.check_in,
     newGuest.check_out
   ]
 );
};


Guest.update = updatedGuest => {
  return db.none("UPDATE guests SET fname = ${fname}, lname = ${lname}, email = ${email}, address= ${address}, city= ${city}, state= ${state}, zip= ${zip}, phone= ${phone}, credit_card= ${credit_card}, check_in= ${check_in}, check_out= ${check_out} WHERE guest_id = ${guest_id}", updatedGuest);
};

Guest.delete = id => {
  return db.result("DELETE FROM guests WHERE guest_id = ${id}", { id: id });
}

module.exports = Guest;
