const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", async (req, res) => {
    const query_params = [req.params.id];
    const query_string = `
    SELECT options.name, SUM(rankings.relative_points) AS total_points
    FROM rankings
    JOIN options ON rankings.option_id = options.id
    WHERE options.poll_id = $1
    GROUP BY options.name
    ORDER BY SUM(rankings.relative_points) DESC;`;

    try {
      const data = await db.query(query_string, query_params);
      const ret = {};
      for (let row of data.rows) {
        ret[row.name] = row.total_points;
      }
      res.render("result", ret);
    } catch (e) {
      console.error(e);
    }
  });

  return router;
};
