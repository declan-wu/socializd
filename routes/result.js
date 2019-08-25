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

    try {
      const data = await db.query(query_string, query_params);
      const ret = [];
      // console.log(data.rows);
      for (let row of data.rows) {
        ret.push([row.name, Number(row.total_points)]);
      }
      // console.log(ret);
      temp_var = { what: ret };
      res.render("resultcopy", temp_var);

      // res.render("result", { option_1: [10, 10, 1], option_2: 4, option_3: 5 });
    } catch (e) {
      console.error(e);
    }
  });

  return router;
};
