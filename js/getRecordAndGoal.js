const express = require("express");
const router = express.Router();
const Record = require("./records"); // import the Record model
const Goal = require("./goals"); // import the Goal model

router.get("/getRecord", async (req, res) => {
  try {
    const username = req.query.username;

    // Find all record entries for the user and calculate the total spending
    const records = await Record.find({ username });
    const totalSpending = records.reduce((total, record) => total + record.spending, 0);
    
    // Send the total spending as the response
    res.send({ totalSpending });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/getGoal", async (req, res) => {
  try {
    const username = req.query.username;

    // Find the goal entry for the user
    const goal = await Goal.findOne({ username });

    // Send the goal as the response
    res.send(goal);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
