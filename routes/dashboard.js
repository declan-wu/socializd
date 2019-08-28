const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get('/', (req, res) => {
    const userId = req.session.userId;

    // get poll titles
    // get count number of visitors to each poll
    // get poll id -- get poll url

    res.render("dashboard");
  });

  return router;
};
