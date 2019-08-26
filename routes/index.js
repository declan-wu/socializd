const express = require("express");
const moment = require("moment");
const sendEmail = require("../util/sendEmail");
const sendText = require("../util/sendText");
const router = express.Router();

module.exports = db => {
  // GET home page for admin
  router.get("/", (req, res) => {
    // Gets the number of polls and adds 1 to the total in order to get a number to append
    // to the poll link on submission
    const query_string = `
      SELECT COUNT(*) FROM polls;
    `;

    db.query(query_string)
      .then(data => {
        const renderVars = {
          count: Number(data.rows[0].count) + 1
        };
        res.render("index", renderVars);
      })
      .catch(err => console.error(err));
  });

  // POST home page for creating a poll
  router.post("/", async (req, res) => {
    // retrieve data from the from
    const poll_title = req.body.poll_title;
    const email = req.body.email;
    const option_names = [];
    for (let option in req.body) {
      if (option.includes("option")) {
        option_names.push(req.body[option]);
      }
    }
    const admin_id = 1;
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
      sendEmail([email], `localhost:8080/poll/${poll_id}`);
      // res.redirect(303, `/result/${poll_id}`);
      res.redirect(303, `/`);
    } catch (err) {
      console.log(err);
      // res.status(500).json({ error: err.message });
    }
  });
  return router;
};
