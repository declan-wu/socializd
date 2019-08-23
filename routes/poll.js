const express = require("express");
const router = express.Router();

module.exports = db => {
  // TODO: GET landing page for amdin
  router.get("/", (req, res) => {
    res.render("index");
  });

  return router;
};
