const express = require("express");
const path = require("path");
const Reservation = require("./models/reservation");
const Guest = require("./models/guest");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
// Tell Express that we use EJS in our views.
app.set("view engine", "ejs");
var moment = require("moment");
const ejsLint = require('ejs-lint');



// Allow override of HTTP methods based on the query string ?_method=DELETE
app.use(methodOverride("_method"));

// Add the HTTP body onto the request object in all route handlers.
app.use(bodyParser.urlencoded({ extended: false }));

// Allow the port to be set by an environment variable when run (PORT=4000 node server.js)
// and fallback to a default to 4567 if it's not supplied.
const PORT = process.env.PORT || 3000;

// Serve any files in the public folder at the "/public" route.
app.use("/public", express.static("public"));


app.get("/", (request, response) => {
  response.render("homepage");
});

app.get("/guests/new", (request, response) => {
  response.render("guests/new");
});

app.post("/guests/new", (request, response) => {
  console.log(request.body);
  const newGuest = {
    fname: request.body.fname,
    lname: request.body.lname,
    email: request.body.email,
    address: request.body.address,
    city: request.body.city,
    state: request.body.state,
    zip: request.body.zip,
    phone: request.body.phone,
    credit_card: request.body.credit_card,
    check_in: request.body.check_in,
    check_out: request.body.check_out
  };
  console.log(newGuest.guest_id);
  newReservation = {
    room_number: request.body.room_number,
    late_checkout: request.body.late_checkout,
  };
  Guest.create(newGuest)
    .then((newGuest) => {
      newReservation.guest_id = newGuest.guest_id;
       Reservation.create(newReservation).then(newGuest => {
         response.redirect(302, "/guests");
       });
  }

  );
});

app.get("/guests", (request, response) => {
  Guest.all().then(guests => {
    const checkIn = [];
    const checkOut = [];
    guests.forEach(guest => {
      checkIn.push(moment(guest.check_in).format("MMM Do YYYY"));
      checkOut.push(moment(guest.check_out).format("MMM Do YYYY"));
    });
    response.render("guests/index", { guests: guests, checkIn, checkOut });
  });
});

app.get("/guests/:id", (request, response) => {
  const id = request.params.id;
  let checkIn;
  let checkOut;
  Promise.all([Guest.find(id), Reservation.find(id)]).then(
    ([guest, reservation]) => {
      checkIn = moment(guest.check_in).format("MMM Do YYYY");
      checkOut = moment(guest.check_out).format("MMM Do YYYY");
      console.log(checkIn);
      response.render("guests/show", { guest, reservation, checkIn, checkOut, id });
    }
  );
});



app.get("/guests/:id/edit", (request, response) => {
  const id = request.params.id;
  let checkIn;
  let checkOut;
  Promise.all([Guest.find(id), Reservation.find(id)]).then(
    ([guest, reservation]) => {
           checkIn = moment(guest.check_in).format("YYYY-MM-DD");
           checkOut = moment(guest.check_out).format("YYYY-MM-DD");
           console.log(checkIn);

      response.render("guests/edit", { guest, reservation, checkIn, checkOut, id });
    }
  );
});

app.put("/guests/:id/edit", (request, response) => {
 const updatedGuest = { fname: request.body.fname, lname: request.body.lname, email: request.body.email, address: request.body.address, city: request.body.city, state: request.body.state, zip: request.body.zip, phone: request.body.phone, credit_card: request.body.credit_card, check_in: request.body.check_in, check_out: request.body.check_out };
 const updatedReservation = { room_number: request.body.room_number, late_checkout: request.body.late_checkout  };
  updatedGuest.guest_id = request.params.id;
  updatedReservation.guest_id = request.params.id;
    Promise.all([Guest.update(updatedGuest), Reservation.update(updatedReservation)]).then(
    ([guest, reservation]) => {

      response.redirect(302, "/guests");
});
});

app.delete("/guests/:id", (request, response) => {
  const id = Number(request.params.id);
  Promise.all([Guest.delete(id), Reservation.delete(id)]).then(
    ([guest, reservation]) => {
      response.redirect(302, "/guests");
    }
  );
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
