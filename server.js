// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8000;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(cookieSession({ keys: ["key1"] }));

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

// const dashboard = require('./routes/dashboard');
const indexRoutes = require("./routes/index");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");
const pollRoutes = require("./routes/poll");
const resultRoutes = require("./routes/result");
const errorRoutes = require("./routes/error");

// Landing page
// app.use("/", landingRoutes(db));

// Home page
app.use("/", indexRoutes(db));

// Register route
app.use("/register", registerRoutes(db));

// Login route
app.use("/login", loginRoutes(db));

// Dashboard page
app.use("/dashboard", dashboardRoutes(db));

// Polling page
app.use("/poll", pollRoutes(db));

// Result page
app.use("/result", resultRoutes(db));

// Error page
app.use("/error", errorRoutes(db));

// Port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
