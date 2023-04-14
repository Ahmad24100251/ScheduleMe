const cron = require('node-cron');
const Exercise = require('./exercise');
const Food = require('./food');
const Goal = require('./goals');
const Task = require('./task');
const gratitude = require('./gratitude')
const record = require('./records')
const express = require('express');
const router = express.Router();
// Schedule cron job to run at 10pm every day
cron.schedule('00 22 * * *', async () => {
  try {
    await Exercise.deleteMany({}); // Delete all entries in Exercise collection
    await Food.deleteMany({}); // Delete all entries in Food collection
    await Goal.deleteMany({}); // Delete all entries in Goal collection
    await Task.deleteMany({}); // Delete all entries in Task collection
    await gratitude.deleteMany({}); // Delete all entries in gratitude collection
    await record.deleteMany({}); // Delete all entries in record collection
    console.log('All entries deleted at 10pm');
  } catch (error) {
    console.error(error);
  }
});
 module.exports = router;