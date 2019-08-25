// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// TODO: TESTING DB QUERY FOR POLL
const testPoll = async function() {
  const query_params = [1];
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
    console.log(ret);
  } catch {
    console.error(error);
  }
};
testPoll();
// Port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
