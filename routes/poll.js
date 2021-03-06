const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/:id", (req, res) => {
    // to verify if :id is in our poll, if not, render 404
    const poll_id_query_string = `SELECT * FROM polls WHERE id = $1 ;`;
    db.query(poll_id_query_string, [Number(req.params.id)])
      .then(data => {
        if (data.rows.length === 0) {
          res.redirect(303, "/error/404/");
        }
      })
      .catch(err => {
        console.log(err);
      });

    // check if the voter has already voted by checking if the session cookie has property called: poll_id;
    // if it has poll_id, then he voted, redirect; else: set the cookie.poll_id to be true, and then insert voter to db
    if (req.session.hasOwnProperty(req.params.id)) {
      res.redirect(303, "/error/accessFailed");
      return;
    }
    // query database to retrieve poll title, date, options, etc
    const poll_id = req.params.id;
    const query_params = [poll_id];
    const query_string = `
      SELECT options.id as option_id, options.name as option_name, polls.title as poll_title, created_date
      FROM options
      JOIN polls ON polls.id = options.poll_id
      WHERE poll_id = $1;`;
    db.query(query_string, query_params)
      .then(data => {
        const renderVars = {
          pollId: poll_id,
          createdDate: data.rows[0].created_date,
          pollTitle: data.rows[0].poll_title,
          options: {}
        };
        for (let row of data.rows) {
          renderVars.options[row.option_id] = row.option_name;
        }
        res.render("poll", renderVars);
      })
      .catch(err => console.error(err));
  });

  router.post("/:id", async (req, res) => {
    // to set the session cookie after voter has voted.
    const pollId = req.params.id;
    req.session[pollId] = true;
    const voterQuery_string = `
      INSERT INTO voters (name, email) VALUES('dummyVoter', '@') RETURNING *;`;

    try {
      const voterData = await db.query(voterQuery_string);
      const voterId = voterData.rows[0].id;
      req.session.voterId = voterId;
      const options = req.body.optionsPos.reverse();

      let query_string = `
      INSERT INTO rankings(voter_id, poll_id, option_id, relative_points)
      VALUES `;
      const option_params = [];
      const q_arr = [];

      for (let option of options) {
        option_params.push(
          option,
          (options.indexOf(option) + 1) / options.length
        );
        q_arr.push(
          `( ${voterId}, ${pollId}, $${option_params.length - 1}, $${
            option_params.length
          } )`
        );
      }
      query_string += q_arr.join(", ");
      query_string += ";";

      const rankingData = await db.query(query_string, option_params);
      res.redirect(303, `/result/${pollId}`);
    } catch (err) {
      console.log(err);
    }
  });

  return router;
};
