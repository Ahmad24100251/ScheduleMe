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
    // calculate the start and end times for the new task
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    const currentYear = new Date(currentDate).getUTCFullYear();
    const currentMonth = (`0${new Date(currentDate).getUTCMonth() + 1}`).slice(-2);
    const currentDay = (`0${new Date(currentDate).getUTCDate()}`).slice(-2);
    const startAt = taskCount === 0 ? new Date(`${currentYear}-${currentMonth}-${currentDay}T06:00:00.000Z`) : (await Task.findOne({ username: username, taskNumber: taskCount })).endAt;
    
    const endAt = new Date(startAt.getTime() + hours * 60 * 60 * 1000);
    const checkId = `checkbox${taskCount}`
    const taskNumber = taskCount + 1; // increment the task count to get the new task number
    const task = new Task({
      username,
      taskNumber,
      task: taskName,
      priority: priority,
      hours: hours,
      startAt: startAt,
      endAt: endAt,
      checkboxId: checkId
    });

    await task.save();

    res.redirect(`/dailyplanner.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
