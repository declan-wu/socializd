const nodemailer = require("nodemailer");

const sendEmail = async function(
  emails,
  month,
  date,
  poll_id,
  admin_auth = { user: "socializd.app@gmail.com", pass: "Socializd123!" }
) {
  let testAccount = await nodemailer.createTestAccount();

  var email_temp = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New email</title>
  <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
  <!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
  <!--<![endif]-->
  <style type="text/css">
@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
</style>
 </head>
 <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
  <div class="es-wrapper-color" style="background-color:#F6F6F6;">
   <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
     <tr style="border-collapse:collapse;">
      <td valign="top" style="padding:0;Margin:0;">
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
         <tr style="border-collapse:collapse;">
          <td style="padding:0;Margin:0;background-image:url(https://skzbd.stripocdn.email/content/guids/CABINET_729b6a94015d410538fa6f6810b21b85/images/9701519718227204.jpg);background-color:#3D4C6B;background-position:left top;background-repeat:no-repeat;background-size:cover;" bgcolor="#3d4c6b" align="center" background="https://skzbd.stripocdn.email/content/guids/CABINET_729b6a94015d410538fa6f6810b21b85/images/9701519718227204.jpg">
           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="640" cellspacing="0" cellpadding="0" bgcolor="#f6f6f6" align="center">
             <tr style="border-collapse:collapse;">
              <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                 <tr style="border-collapse:collapse;">
                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-bottom:25px;padding-top:40px;"><img src="https://skzbd.stripocdn.email/content/guids/CABINET_6da9f790c40cffd3eab88241eb6c0866/images/83611566831987376.png" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" alt="Logo" title="Logo" width="186"></td>
                     </tr>
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:30px;"><h1 style="Margin:0;line-height:48px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:40px;font-style:normal;font-weight:bold;color:#FFFFFF;">Your Poll Has Been Created!</h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr style="border-collapse:collapse;">
              <td align="left" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;background-position:left top;">
               <!--[if mso]><table width="560" cellpadding="0"
                            cellspacing="0"><tr><td width="182" valign="top"><![endif]-->
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;">
                 <tr style="border-collapse:collapse;">
                  <td class="es-m-p0r" width="162" align="center" style="padding:0;Margin:0;">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;">
                       <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                         <tr style="border-collapse:collapse;">
                          <td style="padding:0;Margin:0px;border-bottom:1px solid transparent;background:none;height:1px;width:100%;margin:0px;"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                  <td class="es-hidden" width="20" style="padding:0;Margin:0;"></td>
                 </tr>
               </table>
               <!--[if mso]></td><td width="196" valign="top"><![endif]-->
               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;">
                 <tr style="border-collapse:collapse;">
                  <td width="196" align="center" style="padding:0;Margin:0;">
                   <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#FFFFFF;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                     <tr style="border-collapse:collapse;">
                      <td style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px;border-radius:3px 3px 0 0;" bgcolor="#ff0000" align="center"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#FFFFFF;">${month}</p></td>
                     </tr>
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:15px;padding-right:15px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:48px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:72px;color:#444444;">${date}</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table>
               <!--[if mso]></td><td width="20"></td><td width="162" valign="top"><![endif]-->
               <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;">
                 <tr style="border-collapse:collapse;">
                  <td width="162" align="center" style="padding:0;Margin:0;">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;">
                       <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                         <tr style="border-collapse:collapse;">
                          <td style="padding:0;Margin:0px;border-bottom:1px solid transparent;background:none;height:1px;width:100%;margin:0px;"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table>
               <!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
             <tr style="border-collapse:collapse;">
              <td align="left" style="Margin:0;padding-bottom:15px;padding-top:20px;padding-left:20px;padding-right:20px;">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                 <tr style="border-collapse:collapse;">
                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                     <tr style="border-collapse:collapse;">
                      <td esdev-links-color="#b7bdc9" align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:20px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#B7BDC9;">Your poll has been created. Please click the link below to see your poll results or share the link below with your friends&nbsp;</p></td>
                     </tr>
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px;"><span class="es-button-border" style="border-style:solid;border-color:#75B6C9;background:#75B6C9;border-width:1px;display:inline-block;border-radius:28px;width:auto;"><a href="https://socializd.herokuapp.com/result/${poll_id}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#75B6C9;border-width:10px 25px;display:inline-block;background:#75B6C9;border-radius:28px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;">Poll Results</a></span></td>
                     </tr>
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:25px;"><span class="es-button-border" style="border-style:solid;border-color:#75B6C9;background:#75B6C9;border-width:1px;display:inline-block;border-radius:28px;width:auto;"><a href="https://socializd.herokuapp.com/poll/${poll_id}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;color:#FFFFFF;border-style:solid;border-color:#75B6C9;border-width:10px 25px;display:inline-block;background:#75B6C9;border-radius:28px;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;">Vote Now</a></span></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;">
         <tr style="border-collapse:collapse;">
          <td align="center" style="padding:0;Margin:0;">
           <table class="es-footer-body" width="640" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;">
             <tr style="border-collapse:collapse;">
              <td align="left" style="Margin:0;padding-top:5px;padding-left:20px;padding-right:20px;padding-bottom:40px;background-position:left top;">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                 <tr style="border-collapse:collapse;">
                  <td width="600" valign="top" align="center" style="padding:0;Margin:0;">
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                     <tr style="border-collapse:collapse;">
                      <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#999999;">662 King St W</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#999999;">Toronto, ON, M5V 1M7</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>`;

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
    html: `${email_temp}`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
};

// sendEmail([["declan.wu@hotmail.com"]]).catch(console.error);

// sendEmail([
//   "declan.wu@hotmail.com",
//   "andrewting112@gmail.com",
//   "anniekao@posteo.net"
// ]).catch(console.error);

module.exports = sendEmail;
