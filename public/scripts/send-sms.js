module.exports = (function(number, message){

require('dotenv').config(); //It is a must to read info in .env file

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = require('twilio')(accountSid, authToken);

twilioClient.messages.create({
    to: number, 
    from: process.env.TWILIO_NUMBER,
    body: message
})
.then((message) => console.log(message.sid));
g
});

