const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    res.render("create-poll");
  });

  router.post("/post", (req, res) => {
    console.log("creating new poll...");
  });

  return router;
};