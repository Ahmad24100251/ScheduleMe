const express = require("express");
const router = express.Router();
const Gratitude = require("./gratitude"); // import the Gratitude model

router.get("/getMostRecentGratitude", async (req, res) => {
  try {
    const username = req.query.username;

    // Find the most recent gratitude entry for the user
    const mostRecentGratitude = await Gratitude.findOne({ username }, {}, { sort: { 'createdAt' : -1 } });
    // Send the text of the most recent gratitude entry as the response
    res.send(mostRecentGratitude.text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
