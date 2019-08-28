const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = db => {
  router.post("/", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);

    // if email exists in db

    // then shake input and show notification that they're already registered

    // otherwise insert them into the db and set their userId/cookie session to id in db
    const query_params = [name, email, password];
    const query_string = `
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
      RETURNING *;
    `;

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
