const cron = require('node-cron');
const Task = require('./task');
const express = require("express");

const router = express.Router();

// Delete all tasks at 3:49 PM every day
//AT 10:00 PM -> 0 22
//AT 12:00 -> 0 0
cron.schedule('09 2 * * *', async () => { // 3:49PM is represented as 15:49 in 24-hour clock notation
  try {
    const cutoffDate = new Date(Date.now() - (24 * 60 * 60 * 1000)); // Delete tasks older than 24 hours
    await Task.deleteMany({ startAt: { $lt: cutoffDate } });

    console.log('All tasks deleted at 3:49 PM');
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
