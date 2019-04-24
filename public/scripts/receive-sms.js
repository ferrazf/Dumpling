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