const express = require('express');
const router = express.Router();
const Task = require('./task');

// Endpoint to get reminders for tasks that are about to start
router.get('/getReminders', async (req, res) => {
  const { username } = req.query;
  try {
    const tasks = await Task.find({ username }).sort({ startAt: 'asc' });
    const now = new Date();
    const PKTOffset = 5 * 60 * 60 * 1000; // 5 hours ahead of UTC
    const nowPKT = new Date(now.getTime() + PKTOffset);
    const reminders = tasks.filter(task => {
    const taskStart = new Date(task.startAt);
    const timeDiff = taskStart.getTime() - nowPKT.getTime();
    const minutesDiff = timeDiff / (1000 * 60); // convert milliseconds to minutes
  
    return minutesDiff <= 15;
    }).map(task => {
      const reminder = {
        taskNumber: task.taskNumber,
        task: task.task,
        startAt: task.startAt,
        hours: task.hours
      };
      return reminder;
    });
    res.send(reminders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
