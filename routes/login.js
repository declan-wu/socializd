const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = db => {
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
        }
      })
      .catch(err => console.error(err));
  });
};
