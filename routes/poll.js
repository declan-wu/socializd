const express = require("express");
const router = express.Router();

module.exports = db => {
  // TODO: need to verify if :id is in our poll, if not, render 404
  router.get("/:id", (req, res) => {
    // query database to retrieve poll title, date, options, etc
    console.log(req.params.id);
    const queryValues = [req.params.id];
    const queryString = `
      SELECT polls.title as poll_title, polls.created_date, options.name as options_name, options.id as options_id
      FROM polls
      JOIN options ON polls.id = options.poll_id
      WHERE poll_id = $1
    `;

    db.query(queryString, queryValues)
      .then(data => {
        console.log(data.rows[0])
      })
      .catch(err => console.error(err));
  });
  return router;
};
