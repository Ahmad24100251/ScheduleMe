const express = require("express");
const router = express.Router();
const Record = require("./records");

router.post("/addRecord.html", async (req, res) => {
  try {
    const username = req.session.username;
    const spending = parseInt(req.body.spending);

    // Check if the user already has a spending record
    let existingRecord = await Record.findOne({ username });

    if (existingRecord) {
      // Add the new spending to the existing record
      existingRecord.spending += spending;
      await existingRecord.save();
    } else {
      // Create a new record for the user
      const newRecord = new Record({
        username,
        spending
      });

      await newRecord.save();
    }

    res.redirect(`/financeTracker.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
