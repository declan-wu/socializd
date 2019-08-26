// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const accountSid = process.env.TWILIO_ACCOUNT_SID;

// const client = require("twilio")(accountSid, authToken);

// const sendText = (msg, number = "+16479809641") => {
//   client.messages
//     .create({
//       body: msg,
//       from: "+16479304432",
//       to: number
//     })
//     .then(message => console.log(message.sid))
//     .catch(err => console.log(err));
// };

// sendText("hello from node.js");
// TWILIO_AUTH_TOKEN = "e19c0ab0685447cc5221dbb7478f1185"
// TWILIO_ACCOUNT_SID = "AC24ad4ee74342f20a3d4ac0b4b7b9452e"

// module.exports = sendText;
