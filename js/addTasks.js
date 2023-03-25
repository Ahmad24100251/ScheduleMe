const express = require("express");
const router = express.Router();
const Task = require("./task");

router.post("/addTasks.html", async (req, res) => {
  try {
    const username = req.session.username;
    const taskName = req.body.task;
    const priority = req.body.priority;
    const hours = req.body.hours;

    // get the current task count for the user
    const taskCount = await Task.countDocuments({ username: username });

    // check if the user has reached the task limit
    if (taskCount >= 17) {
      return res.status(400).send("Task limit reached");
    }

    const taskNumber = taskCount + 1; // increment the task count to get the new task number

    const task = new Task({
      username,
      taskNumber,
      task: taskName,
      priority: priority,
      hours: hours
    });

    await task.save();

    res.redirect(`/dailyplanner.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
