const express = require("express");
const router = express.Router();

module.exports = db => {
  // TODO: need to verify if :id is in our poll, if not, render 404

  router.get("/:id", (req, res) => {
    // calls the helper function to insert dummy voter into the voters table, returning the voterId
    // sets a cookie session using the voterId
    const setVoterSession = () => {
      const voterQuery_string = `
      INSERT INTO voters (name, email) VALUES('dummyVoter', '@') RETURNING *;
  `;

      db.query(voterQuery_string)
        .then(data => {
          const voterId = data.rows[0].id;
          return voterId;
        })
        .then(voterId => {
          req.session.voterId = voterId;
        })
        .catch(err => console.error(err));
    };

    setVoterSession();
    const voterId = req.session.voterId;

    // TODO: check cookie sessions for a voterId, if(!voterId) res.render else error already voted

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

  router.post("/:id", (req, res) => {
    const pollId = req.params.id;
    const voterId = req.session.voterId;
    const options = req.body.optionsPos;

    let query_string = `
      INSERT INTO rankings(voter_id, poll_id, option_id, relative_points)
      VALUES `;
    const option_params = [];
    const q_arr = [];

    for (let option of options) {
      option_params.push(option, options.indexOf(option) + 1);
      q_arr.push(`( ${voterId}, ${pollId}, $${option_params.length - 1}, $${option_params.length} )`);
    }

    query_string += q_arr.join(', ');
    query_string += ';';

    db.query(query_string, option_params)
      .then(res.redirect(303, `/result/${pollId}`))
      .catch(err => console.error(err));
  });


  return router;
};
