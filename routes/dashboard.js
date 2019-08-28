const express = require("express");
const router = express.Router();
const moment = require("moment");

module.exports = db => {
  router.get('/', (req, res) => {
    // const userId = req.session.userId;
    const userId = 1;

    const user_query_string = `
      SELECT users.name, polls.title as poll_title, polls.id as poll_id, created_date
      FROM users
      JOIN polls ON polls.admin_id = users.id
      WHERE users.id = $1;
    `;
    const user_query_params = [userId];

    db.query(user_query_string, user_query_params)
      .then(data => {
        const username = data.rows[0].name;
        const pollIds = [];
        const pollTitles = [];
        const createdDates = [];
        for (let poll of data.rows) {
          pollIds.push(poll.poll_id);
          pollTitles.push(poll.poll_title);
          createdDates.push(moment(poll.created_date).format('MMMM Do YYYY'));
        }
        const renderVars = {
          username,
          pollIds,
          pollTitles,
          createdDates
        };
        res.render("dashboard", renderVars);
      })
      .catch(err => console.error(err));
  });

  return router;
};
