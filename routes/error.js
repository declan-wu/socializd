const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/404", (req, res) => {
    res.render("404");
  });

  router.get("/accessFailed", (req, res) => {
    res.render("access-failed");
  });

  return router;
};
