const db = require("../database/connection");

const Guest = {};

Guest.all = () => {
  return db.any("SELECT * FROM guests");
};

Guest.find = id => {
  return db.one(
    "SELECT * FROM guests && SELECT TO_CHAR(NOW() :: DATE, 'dd/mm/yyyy') WHERE guest_id = ${id}",
    { id: id }
  );
};

module.exports = Guest;
