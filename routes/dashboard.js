const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get('/', (req, res) => {
    res.render(303, 'dashboard');
  });

  return router;
};
