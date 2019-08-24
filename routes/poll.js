const express = require("express");
const router = express.Router();

module.exports = db => {
  // TODO: need to verify if :id is in our poll, if not, render 404
  router.get("/:id", (req, res) => {
    // query database to retrieve poll title, date, options, etc
    const poll_id = req.params.id;
    const query_params = [poll_id];
    const query_string = `
      SELECT options.id as option_id, options.name as option_name, polls.title as poll_title, created_date
      FROM options
      JOIN polls ON polls.id = options.poll_id
      WHERE poll_id = $1;`;
    db.query(query_string, query_params)
      .then(data => {
        render_vars = {
          created_date: data.rows[0].created_date,
          poll_title: data.rows[0].poll_title
        };
        // our render_vars should look like:
        // {
        //   created_date: '2019-04-26',
        //   poll_title: 'which movies?',
        //   option_1: 'avengers',
        //   option_2: 'harry potter',
        //   ...
        // }

        for (let row of data.rows) {
          render_vars["option_" + row.option_id] = row.option_name;
        }
        console.log(render_vars);
      })
      .catch(console.error);
  });

  return router;
};
