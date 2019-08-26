const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", async (req, res) => {
    // TODO: stretch -- what to do in case of a tie?

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
      const created_date = data_date_title.rows[0].created_date;
      const poll_title = data_date_title.rows[0].title;
      // console.log(data_date_title.rows[0].created_date);
      // console.log(data_date_title.rows[0].title);


      for (let row of options_data.rows) {
        options.push([row.name, Number(row.total_points)]);
      }
      // console.log(ret);
      temp_var = { what: options, created_date: created_date, poll_title: poll_title };
      res.render("resultcopy", temp_var);

      // res.render("result", { option_1: [10, 10, 1], option_2: 4, option_3: 5 });
    } catch (e) {
      console.error(e);
    }
  });

  return router;
};
