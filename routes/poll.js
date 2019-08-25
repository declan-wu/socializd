const express = require("express");
const router = express.Router();

module.exports = db => {
  // TODO: need to verify if :id is in our poll, if not, render 404
  router.get("/:id", (req, res) => {
    // query database to retrieve poll title, date, options, etc
    const queryValues = [req.params.id];
    const queryString = `
      SELECT polls.title as poll_title, polls.created_date, options.name as options_name, options.id as options_id
      FROM polls
      JOIN options ON polls.id = options.poll_id
      WHERE poll_id = $1
    `;

    db.query(queryString, queryValues)
      .then(data => {
        const templateVars = {
          pollId: req.params.id,
          pollTitle: data.rows[0].poll_title,
          createdDate: data.rows[0].created_date,
          options: {}
        };
        for (let row of data.rows) {
          templateVars.options['options_' + row.options_id] = row.options_name;
        }
        res.render("poll", templateVars);
      })
      .catch(err => console.error(err));
  });

  router.post("/:id", (req, res) => {
    console.log(req.body);
    res.redirect('result');
  });

  return router;
};
