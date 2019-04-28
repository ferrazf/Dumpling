const sendSMS = require('./send-sms');

// send cart info to owner
const ownerNum = process.env.OWNER_NUMBER

let text
sendSMS(ownerNum, text); // take two variables, phone number and text message in string type