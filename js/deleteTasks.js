const cron = require('node-cron');
const Task = require('./task');
const express = require("express");

const router = express.Router();


cron.schedule('00 22 * * *', async () => { 
  try {
    const cutoffDate = new Date(Date.now() - (24 * 60 * 60 * 1000)); 
    await Task.deleteMany({ startAt: { $lt: cutoffDate } });

    console.log('All tasks deleted');
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
