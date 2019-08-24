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
      const res = await db.query(query_string, query_params);
      const ret = {};
      for (let row of res.rows) {
        ret[row.name] = row.total_points;
      }
      res.render("result", ret);
<<<<<<< HEAD
    } catch (e) {
      console.error(e);
=======
    } catch (error) {
      console.error(error);
>>>>>>> 28eb0934de686f2e42695542d30c70d7b52efc66
    }

  });

  return router;
};
