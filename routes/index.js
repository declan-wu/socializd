const express = require("express");
const moment = require("moment");
const router = express.Router();

module.exports = db => {
  // GET home page for admin
  router.get("/", (req, res) => {
    res.render("index");
  });
  // POST home page for creating a poll
  router.post("/", (req, res) => {
    // retrieve data from the from
    // TODO: confirm where to stores the options
    const options = req.body;
    // TODO: add new poll to polls, creates options accodingly.
    // TODO: figure out what admin id is by session cookie
    const admin_id = 0;
    const create_date = Date.now();
    const title = "poll_A";
    const values = [admin_id, create_date, title];
    const queryString = `
      INSERT INTO polls (admin_id, create_date, title)
      VALUES ($1, $2, $3)
      RETURNING *`;
    db.query(queryString, values)
      .then(data => {
        // FIXME: what does data look like?
        const poll_id = data.rows[0].id;
        // res.json({ users });
        // TODO: generate a link "/poll/poll_id"
        // TODO: redirect to GET link, or serving data to Ajax to render another apge. (includes copy button)
        // TODO: Mailgun, send links to admin.
        // TODO: possibly, redirect user to stats page.
      })
      .catch(err => {
        // FIXME: if failed, meaning database failed, :(
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
