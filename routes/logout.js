const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post('/', (req, res) => {
    console.log('logged out');
    req.session = null;
    res.redirect(303, '/');
  });

  return router;
};