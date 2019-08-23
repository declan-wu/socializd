// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const moment = require("moment");
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

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// TODO: TEST FUNCTIONS:
const testInsert = () => {
  console.log("Port is ", PORT);
  const admin_id = 4;
  const create_date = moment().format("YYYY-MM-DD HH:mm:ss");
  const title = "poll_A";
  const values = [admin_id, create_date, title];
  // const queryString = `
  //     select * from users;`;
  // const queryString = `
  //     INSERT INTO polls (admin_id, create_date, title)
  //     VALUES ($1, $2, $3)
  //     RETURNING *`;
  db.query(`SELECT * FROM voters;`)
    .then(data => {
      console.log(data.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
  return;
};
testInsert();

Port;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
