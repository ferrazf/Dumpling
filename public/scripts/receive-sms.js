require('dotenv').config();
const sendSMS = require('./send-sms');

const http = require("http");
const bodyParser = require('body-parser');
const express = require("express");
const twilio = require("twilio"); // might not needed since the sendSMS has plug-in;
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const knexConfig  = require("../.././knexfile");
const knex        = require("knex")
({
    client: 'pg',
    version: '9.5',
    connection: knexConfig["development"]["connection"]
  });

const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(knexLogger(knex));

app.post('/', (req, res) => {
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

    // console.log("req.body, ", req.body["Body"]);

    // const twiml = new MessagingResponse();

    // twiml.message("response");

    // res.writeHead(200, {"Content-Type": "text/xml"});
    // res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log("Express server listening on port 1337");
})
// ngrok http 1337 on a separated terminal and get the http server address
// always add /twilio/webhook
// save that address to https://www.twilio.com/console/phone-numbers/PN20a898aa406518a1d5df602f824d8a60
// to update the webhook, http post message incoming
