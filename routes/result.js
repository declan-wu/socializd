const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", (req, res) => {
    const query_params = [req.params.id];
    const query_string = `
    SELECT options.name, SUM(rankings.relative_points) AS total_points
    FROM rankings
    WHERE poll_id = $1
    JOIN options ON rankings.option_id = options.id
    GROUP BY options.name
    ORDER BY SUM(rankings.relative_points);`;

    try {
      const res = await db.query(query_string, query_params);
      const ret = {};
      for (let row of res.rows) {
        ret[row.name] = row.total_points;
      }
      res.render("result", ret);
    } catch {
      console.error(error);
    }
  });

  return router;
};
