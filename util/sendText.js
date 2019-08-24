const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const client = require("twilio")(accountSid, authToken);

const sendText = (msg, number = "+16479809641") => {
  client.messages
    .create({
      body: msg,
      from: "+16479304432",
      to: number
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
};

// sendText("hello from node.js");

module.exports = sendText;
