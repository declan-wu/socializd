const nodemailer = require("nodemailer");

const sendEmail = async function(
  emails,
  link = "www.google.com",
  admin_auth = { user: "socializd.app@gmail.com", pass: "Socializd123!" }
) {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: admin_auth
  });

  const mailOptions = {
    from: "socializd.app@gmail.com",
    to: emails.join(", "),
    subject: "Sending Email using Node.js",
    text: "That was easy!", // TODO: to be replaced with links
    html: "<b>Hello world?</b>"
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

// sendEmail(["declan.wu@hotmail.com"]).catch(console.error);

module.exports = sendEmail;
