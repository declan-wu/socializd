const express = require("express");
const router = express.Router();

module.exports = db => {
  // TODO: need to verify if :id is in our poll, if not, render 404
  router.get("/:id", (req, res) => {
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
    //TODO: actual session cookie must be assigned using voterId
    const voterId = 6;
    const options = req.body.optionsPos.reverse();
    const query_string = `
      INSERT INTO rankings(voter_id, poll_id, option_id, relative_points)
      VALUES ($1, $2, $3, $4);
    `;
    const query_params = [voterId, pollId];

    for (let option of options) {
      query_params.push(option);
      query_params.push(options.indexOf(option) + 1);
    }
    console.log('query params: ', query_params);
    console.log('query string: ', query_string);
    // options: voter_id, poll_id, option_id, relative_points =
  });

  return router;
};
