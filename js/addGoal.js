const express = require("express");
const router = express.Router();
const Goal = require("./goals");

router.post("/addGoal.html", async (req, res) => {
  try {
    const username = req.session.username;
    const goal = parseInt(req.body.goal);

    // Check if the goal already exists
    const existingGoal = await Goal.findOne({ username });
    if (existingGoal) {
      res.status(400).send("A goal already exists for this user");
      return;
    }

    const newGoal = new Goal({
      username,
      goal
    });

    await newGoal.save();
    res.redirect(`/financetracker.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
