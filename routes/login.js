const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = db => {
<<<<<<< HEAD
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
              // req.session.userId = user_id;
                console.log('userId =', user_id);
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
=======
  router.post("/register", (req, res) => {
    const email = req.body.email;
    const query_params = [email];
    const query_string = `
      SELECT password FROM users WHERE email = $1;
    `;

    db.query(query_string, query_params)
      .then(data => {
        const password = data.rows[0].password;
        const checkPassword = bcrypt.compare(password, data.rows[0].password);

        if (checkPassword) {
          res.redirect(303, 'dashboard');
        } else {
          // TODO: error page if password is wrong
          res.redirect('303', 'index');
>>>>>>> c65b68bad7b1b1d7862833d179617affa9f7a835
        }
      })
      .catch(err => console.error(err));
  });
<<<<<<< HEAD

  return router;
=======
>>>>>>> c65b68bad7b1b1d7862833d179617affa9f7a835
};
