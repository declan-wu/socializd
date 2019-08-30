const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = db => {
  router.post("/", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);

    const email_query_string = `
      SELECT * FROM users WHERE email = $1
    `;
    const email_query_params = [email];

    try {
      const findUserByEmail = await db.query(email_query_string, email_query_params);
      if (findUserByEmail.rows.length > 0) {
        res.redirect(303,'/');
      } else {
        // if user email does not exist in db
        const insert_new_user_params = [name, email, password];
        const insert_new_user_string = `
          INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
          RETURNING *;
        `;
        
        // set userid to returned id from newly inserted row
        const newUserData = await db.query(insert_new_user_string, insert_new_user_params);
        const userId = newUserData.rows[0].id;
        
        req.session.userId = userId;
        res.redirect(303, "/dashboard");
      }
    } catch (e) {
      console.error(e);
    }
  });
  return router;
};
