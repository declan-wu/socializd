const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = db => {
  router.post("/", (req, res) => {
    const email = req.body.email;
    const query_params = [email];
    const query_string = `
      SELECT password, id FROM users WHERE email = $1;
    `;

    // look for the email in the db
    db.query(query_string, query_params)
      .then(data => {
        //if user exists
        if (data.rows[0]) {
          const hashed_password = data.rows[0].password;
          const inputPassword = req.body.password;
          const user_id = data.rows[0].id;

          // check if the password entered and db password match
          bcrypt
            .compare(inputPassword, hashed_password)
            .then(rightPassword => {
              if (rightPassword) {
              //TODO: test with the cookie session uncommented
                console.log('right email, right password');
                req.session.userId = user_id;
                res.redirect(303, '/dashboard');
              } else {
              // TODO: pop-up notification or err page that password was wrong
                console.log('right email, wrong password');
                res.redirect(303, '/');
              }
            })
            .catch(err => console.error(err));

        } else {
          // user does not exist
          //TODO:email input should shake and user should be told to register via notification
          console.log('email not found');
          res.redirect(303, "/");
        }
      })
      .catch(err => console.error(err));
  });

  return router;
};
