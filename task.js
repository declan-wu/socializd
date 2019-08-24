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
const testPoll = function() {
  const poll_id = 1;
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
};

testPoll();
// Port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
