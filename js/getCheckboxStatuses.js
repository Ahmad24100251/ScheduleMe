const express = require("express");
const router = express.Router();
const Task = require("./task");

router.get("/getCheckboxStatuses", async (req, res) => {
  try {
    const username = req.query.username;
    const tasks = await Task.find({ username: username });

    const checkboxStatuses = {};
    tasks.forEach((task) => {
      checkboxStatuses[task.checkboxId] = task.completed ? 'checked' : 'unchecked';
    });

    res.status(200).json(checkboxStatuses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
