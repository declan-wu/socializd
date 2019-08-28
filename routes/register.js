const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = db => {
  router.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);

    const email_query_string = `
      SELECT * FROM users WHERE email = $1
    `;
    const email_query_params = [email];

    db.query(email_query_string, email_query_params)
      .then(data => {
        // if email exists in db
        if (data.rows[0]) {
          // TODO: then shake input and show notification that they're already registered
          console.log('email already exists in db');
          res.redirect(303,'/');
        } else {
          const insert_new_user_params = [name, email, password];
          const insert_new_user_string = `
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
            RETURNING *;
          `;

          // insert new user into database, set cookie session to userId
          // redirect to dashboard
          db.query(insert_new_user_string, insert_new_user_params)
            .then(data => {
              console.log(data.rows[0]);
              // req.session.userId = userId;
              res.redirect(303, "/dashboard");
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));

  });
  return router;
};
