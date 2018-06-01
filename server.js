const express = require("express");
const path = require("path");
const Reservation = require("./models/reservation");
const Guest = require("./models/guest");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
app.set("view engine", "ejs");
var moment = require("moment");
exports.index = function(req, res) {
  // send moment to your ejs
  res.render("guests/index", { moment: moment });
};


// Allow override of HTTP methods based on the query string ?_method=DELETE
app.use(methodOverride("_method"));

// Add the HTTP body onto the request object in all route handlers.
app.use(bodyParser.urlencoded({ extended: false }));

// Allow the port to be set by an environment variable when run (PORT=4000 node server.js)
// and fallback to a default to 4567 if it's not supplied.
const PORT = process.env.PORT || 3000;

// Serve any files in the public folder at the "/public" route.
app.use("/public", express.static("public"));


// Set the folder for where our views are.
// app.set("views", path.join(__dirname, "views"));

// Tell Express that we use EJS in our views.


app.get("/", (request, response) => {
  response.render("homepage");
});

app.get('/guests/new', (request,response) => {
  response.render('guests/new');
});


app.get("/guests", (request, response) => {
  Guest.all().then(guests=> {
    response.render("guests/index", { guests:guests});
  });
});

app.get("/guests/:id", (request, response) => {
  const id = request.params.id;
   Promise.all([Guest.find(id), Reservation.find(id)]).then(([guest, reservation])=> {
    response.render("guests/show", { guest, reservation});
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
