const express = require("express");
const moment = require("moment");
const sendEmail = require("../util/sendEmail");
const sendText = require("../util/sendText");
const router = express.Router();

module.exports = db => {
  // GET home page for admin
  router.get("/", (req, res) => {
    res.render("index");
  });
  // POST home page for creating a poll
  router.post("/", (req, res) => {
    // retrieve data from the from
    const poll_title = req.body.poll_title;
    const email = req.body.email;
    const option_names = [];
    for (let option in req.body) {
      if (req.body.option.include("option")) {
        option_names.push(req.body.option);
      }
    }

    // TODO: figure out what admin id is by session cookie
    const created_date = moment().format("YYYY-MM-DD");
    const title = req.body.poll_title;
    const query_params = [admin_id, created_date, title];
    const query_string = `
      INSERT INTO polls (admin_id, created_date, title)
      VALUES ($1, $2, $3)
      RETURNING * ;`;
    db.query(query_string, query_params)
      .then(data => {
        const poll_id = data.rows[0].id;
        const option_params = [];
        const option_string = `INSERT INTO options (poll_id, name) VALUES `;
        const q_arr = [];
        for (let option_name of option_names) {
          query_params.push(option_name);
          q_arr.push(`( ${poll_id}, $${query_params.length} )`);
        }
        option_string += q_arr.join(", ");
        option_string += ";";

        // insert into options (poll_id, name) VALUES (1, 'name'), (1, 'name')
        db.query(option_string, option_params);
        return poll_id;
      })
      .then(poll_id => {
        sendEmail([email], `localhost:8080/poll/${poll_id}`);
        res.redirect(303, `/result/${poll_id}`);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
