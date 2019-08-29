const express = require("express");
const router = express.Router();
const moment = require("moment");

module.exports = db => {
  router.get("/", async (req, res) => {
    // const userId = req.session.userId;
    const userId = 1;

    const user_query_string = `
      SELECT users.name, polls.title as poll_title, polls.id as poll_id, created_date
      FROM users
      JOIN polls ON polls.admin_id = users.id
      WHERE users.id = $1;
    `;
    const user_query_params = [userId];
    
    try {
      const userPollData = await db.query(user_query_string, user_query_params);
      const username = userPollData.rows[0].name;
      const pollIds = [];
      const pollTitles = [];
      const createdDates = [];

      for (let poll of userPollData.rows) {
        pollIds.push(poll.poll_id);
        pollTitles.push(poll.poll_title);
        createdDates.push(moment(poll.created_date).format("MMMM Do YYYY"));
      }

      let options_ranking_string = `
      SELECT polls.id as poll_id, options.name, SUM(rankings.relative_points) AS total_points
      FROM rankings
      JOIN options ON rankings.option_id = options.id
      JOIN polls ON options.poll_id = polls.id
      WHERE rankings.poll_id IN
      `;

      for (let i = 0; i < pollIds.length; i++) {
        if (i === 0) {
          options_ranking_string += '(' + `$${i + 1}, `;
        } else if (i === pollIds.length - 1) {
          options_ranking_string += `$${i + 1})`;
        } else {
          options_ranking_string += `$${i + 1} `;
        }
      }

      options_ranking_string += `
        GROUP BY polls.id, options.name
        ORDER BY SUM(rankings.relative_points) DESC;`;

      const optionsRankingData = await db.query(options_ranking_string, pollIds);
      const optionsRankings = optionsRankingData.rows;
      
      const options = {};
      for (let option of optionsRankings) {
        if (options[option.poll_id]) {
          options[option.poll_id].push([option.name, Number(option.total_points)]);
        } else {
          options[option.poll_id] = [];
          options[option.poll_id].push([option.name,Number(option.total_points)]);
        }
      }
      
      const renderVars = {
        username,
        pollIds,
        pollTitles,
        createdDates,
        options
      };
      res.render("dashboard", renderVars);
    } catch (err) {
      console.error(err);
    }
  });

  router.post("/:id", async (req, res) => {
    const pollId = req.params.id;
    const query_params = [pollId];
    const query_string = `
    SELECT options.name, SUM(rankings.relative_points) AS total_points
    FROM rankings
    JOIN options ON rankings.option_id = options.id
    WHERE rankings.poll_id = $1
    GROUP BY options.name
    ORDER BY SUM(rankings.relative_points) DESC;`;
    try {
      const options_data = await db.query(query_string, query_params);
      const options = [];

      for (let row of options_data.rows) {
        options.push([row.name, Number(row.total_points)]);
      }
      res.send({ options });
    } catch (e) {
      console.log(e);
    }
  });
  
  return router;
};
