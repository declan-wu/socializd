const express = require("express");
const router = express.Router();

module.exports = db => {
  // TODO: GET result page for everyone
  router.get("/", (req, res) => {
    res.render("result");
  });

  return router;
};
