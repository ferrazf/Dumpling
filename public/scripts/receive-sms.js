const http = require("http");
const bodyParser = require('body-parser');
const express = require("express");
const twilio = require("twilio");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/', (req, res) => {

    
    console.log("req.body, ", req.body["Body"]);

    // const twiml = new MessagingResponse();

    // twiml.message("response");

    // res.writeHead(200, {"Content-Type": "text/xml"});
    // res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log("Express server listening on port 1337");
})
// ngrok http 1337 on a separated terminal and get the http server address
// save that address to https://www.twilio.com/console/phone-numbers/PN20a898aa406518a1d5df602f824d8a60
// to update the webhook, http post message incoming