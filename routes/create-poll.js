const express = require('express');
const router = express.Router();
const moment = require('moment');

module.exports = db => {
  router.get("/", (req, res) => {
    res.render("create-poll");
  });

  router.post("/", async (req, res) => {
    const admin_id = req.session.userId;
    const poll_title = req.body.poll_title;
    // const email = req.body.email;
    const option_names = [];
    for (let option in req.body) {
      if (option.includes("option")) {
        option_names.push(req.body[option]);
      }
    }
    
    const created_date = moment().format("YYYY-MM-DD");
    const query_params = [admin_id, created_date, poll_title];
    const query_string = `
      INSERT INTO polls (admin_id, created_date, title)
      VALUES ($1, $2, $3)
      RETURNING * ;`;

    try {
      const poll_res = await db.query(query_string, query_params);
      const poll_id = poll_res.rows[0].id;
      const option_params = [];
      let option_string = `INSERT INTO options (poll_id, name) VALUES `;
      const q_arr = [];
      for (let option of option_names) {
        option_params.push(option);
        q_arr.push(`( ${poll_id}, $${option_params.length} )`);
      }
      option_string += q_arr.join(", ");
      option_string += ";";
      // insert into options (poll_id, name) VALUES (1, 'name'), (1, 'name')
      const option_res = await db.query(option_string, option_params);
      // sendEmail(
      //   [email],
      //   moment().format("MMMM"),
      //   moment().format("D"),
      //   poll_id
      // );
      console.log('redirecting...');
      res.redirect("/dashboard");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};