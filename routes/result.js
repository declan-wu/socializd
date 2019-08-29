const express = require("express");
const router = express.Router();
const moment = require("moment");

module.exports = db => {
  router.get("/:id", async (req, res) => {
    // to verify if :id is in our poll, if not, render 404
    const poll_id_query_string = `SELECT * FROM polls WHERE id = $1 ;`;
    const poll_data = await db.query(poll_id_query_string, [
      Number(req.params.id)
    ]);
    if (poll_data.rows.length === 0) {
      // FIXME: we need to change the below link to 404
      res.redirect(303, "/error/404/");
    }

    const query_params = [req.params.id];
    const query_string = `
    SELECT options.name, SUM(rankings.relative_points) AS total_points
    FROM rankings
    JOIN options ON rankings.option_id = options.id
    WHERE rankings.poll_id = $1
    GROUP BY options.name
    ORDER BY SUM(rankings.relative_points) DESC;`;

    const query_date_title = `
    SELECT created_date, title
    FROM polls
    WHERE polls.id = $1;
    `;

    try {
      const data_date_title = await db.query(query_date_title, query_params);
      const options_data = await db.query(query_string, query_params);
      const options = [];
      const created_date = moment(data_date_title.rows[0].created_date);
      const formatted_date = created_date.format("MMMM Do YYYY");
      const poll_title = data_date_title.rows[0].title;

      for (let row of options_data.rows) {
        options.push([row.name, Number(row.total_points)]);
      }

      temp_var = {
        what: options,
        created_date: formatted_date,
        poll_title: poll_title
      };

      res.render("result", temp_var);
    } catch (e) {
      console.error(e);
    }
  });

  return router;
};
