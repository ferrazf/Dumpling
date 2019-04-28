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
const itemsRoutes = require("./routes/menu_items");

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
app.use("/api/menu_items", itemsRoutes(knex));

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
app.get("/contact", (req, res) => {
  let templateVars =  {path: req.route.path};
  res.render("contact", templateVars);
});

// Confirmation page
app.get("/checkout/:id/confirm", (req, res) => {
  let templateVars =  {path: req.route.path};
  res.render("confirm", templateVars);
});

// Inform owner and client about the coming order
app.post('/twilio/send', (req, res) => {

  let orderInput = [{phonenumber: req.body["phonenum"], active: true}];

  knex("orders").insert(orderInput, 'id')
  .then((result) => {
      let insertData = req.body["order"].map(x => { return {item_id_FK: x.itemid, order_id_FK: result[0], quantity: x.count}});
      knex("orders_items").insert(insertData, 'order_id_FK')
      .then((orderResult) => {
          let msgToOwner = formatText(req.body["order"], orderResult[0], req.body["phonenum"]);
          sendSMS(process.env.OWNER_NUMBER, msgToOwner);
          sendSMS("+1" + req.body["phonenum"], "Your order has been placed. We will notify you with updates. Thank you.")
        }
      )
    }
  )
  
  function formatText(orders, orderId, num)
  {
     let text = `Hello! You have an order (OrderId: ${orderId}) from ${num}. `;
     for(let order of orders)
     {
        text += `item: ${order.name} Amount: ${order.count} \n`;
     }
     text += ` Please reply with "OrderId , estimated preparation time" to notify the client. When the order is ready, please only reply the OrderId.`
     return text;
  }

  res.send("OK");
});

// Receive msg from owner and send out notification to client
app.post('/twilio/webhook', (req, res) => {

  if(!req.body["Body"].includes(",")){
    knex('orders').update({'active': 'false'}, 'phonenum').where({
      id: req.body["Body"]
    })
    .then( (clientNum) => {
      sendSMS( "+1" + clientNum[0], `You order is ready. Come pick it up!` )
    }) // add +1 at the beginning of the phone number
    .catch((err) => {
    console.log('err ', err);
    })

  } else {
    let reply = req.body["Body"].split(","); // reply format will be phonenumber (without +1) + ',' + wait time
    let replyId = reply[0].trim();
    let eta = reply[1].trim();
  
    knex('orders').update({'etaminutes': eta}, 'phonenum').where({
      id: replyId
    })
    .then( (clientNum) => {
      sendSMS( "+1" + clientNum[0], `You order will be ready in about ${eta} minutes.` )
    }) // add +1 at the beginning of the phone number
    .catch((err) => {
    console.log('err ', err);
    })
  }
  
});

// app.get("/checkout/:id/confirm", (req, res) => {
//   let templateVars =  {path: req.route.path};
//   res.render("confirm", templateVars);
// });
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
