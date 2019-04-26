"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const sendSMS = require('./public/scripts/send-sms');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));


app.use(express.static("public"));


// Mount all resource routes
app.use("/api/users", usersRoutes(knex));


let home = false;
// Home page
app.get("/index", (req, res) => {
  let templateVars =  {path: req.route.path};
  res.render("index", templateVars);
});

// Menu page
app.get("/menu", (req, res) => {
  let templateVars =  {path: req.route.path};
  res.render("menu", templateVars);
});

// Checkout page
app.get("/checkout/:id", (req, res) => {
  let templateVars =  {path: req.route.path};
  res.render("checkout", templateVars);
});

// Confirmation page
app.get("/checkout/:id/confirm", (req, res) => {
  let templateVars =  {path: req.route.path};
  res.render("confirm", templateVars);
});

app.post('/twilio/send', (req, res) => {
  sendSMS(process.env.OWNER_NUMBER, req.body["msg"]);
  res.send("OK");
});

app.post('/twilio/webhook', (req, res) => {
  let reply = req.body["Body"].split(","); // reply format will be phonenumber (without +1) + ',' + wait time
  let num = reply[0].trim();
  let eta = reply[1].trim();
  
  knex('orders').update({'etaminutes': eta}).where({
      phonenumber: num
  })
  .then(sendSMS( "+1" + num, `You order will be ready in about ${eta} minutes.` )) // add +1 at the beginning of the phone number
  .catch((err) => {
    console.log('err ', err);
  })
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
