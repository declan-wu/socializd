const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = db => {
  router.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);

    const query_params = [name, email, password];
    const query_string = `
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
      RETURNING *;
    `;

    // check if user email exists already; if it does then redirect
    // otherwise create new user

    // insert new user into database, set cookie session to userId
    // redirect to dashboard
    db.query(query_string, query_params)
      .then(data => {
        console.log(data.rows[0]);
        // req.session.userId = userId;
        res.redirect(303, "/dashboard");
      })
      .catch(err => console.log(err));

  });
  return router;
};
