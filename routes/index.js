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
      if (option.includes("option")) {
        option_names.push(req.body[option]);
      }
    }

    // TODO: figure out what admin id is by session cookie
    const admin_id = 1;
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
        console.log(poll_id);
        const option_params = [];
        let option_string = `INSERT INTO options (poll_id, name) VALUES `;
        const q_arr = [];
        for (let option of option_names) {
          option_params.push(option);
          q_arr.push(`( ${poll_id}, $${option_params.length} )`);
          console.log("options: ", option_params);
          console.log("option params length: ", option_params.length);
          // (15, )
        }
        option_string += q_arr.join(", ");
        option_string += ";";

        console.log("option params: ", option_params);
        console.log("option string: ", option_string);

        // insert into options (poll_id, name) VALUES (1, 'name'), (1, 'name')
        db.query(option_string, option_params);
        return poll_id;
      })
      .then(poll_id => {
        sendEmail([email], `localhost:8080/poll/${poll_id}`);
        res.redirect(303, `/result/${poll_id}`);
      })
      .catch(err => {
        console.log(err);
        // res.status(500).json({ error: err.message });
      });
  });
  return router;
};
