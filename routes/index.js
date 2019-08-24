const express = require("express");
const moment = require("moment");
const sendEmail = require("../util/sendEmail");
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
    const admin_id = 1;
    const created_date = moment().format("YYYY-MM-DD");
    const title = "test_poll";
    const values = [admin_id, created_date, title];
    const queryString = `
      INSERT INTO polls (admin_id, created_date, title)
      VALUES ($1, $2, $3)
      RETURNING * ;`;
    db.query(queryString, values)
      .then(data => {
        const poll_id = data.rows[0].id;
        // res.json({ users });
        // TODO: generate a link "/poll/poll_id"
        // TODO: redirect to GET link, or serving data to Ajax to render another apge. (includes copy button)
        sendEmail(["declan.wu@hotmail.com", "declan.s.wu@gmail.com"]).catch(
          console.error
        );
        // TODO: possibly, redirect user to stats page.
      })
      .catch(err => {
        // FIXME: if failed, meaning database failed, :(
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
