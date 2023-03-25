const express = require('express');
const router = express.Router();
const Task = require('./task');

// Endpoint to get all tasks for a specific user
router.get('/getTasks', async (req, res) => {
  const { username } = req.query;
  try {
    const tasks = await Task.find({ username }).sort({ time: 'asc' });
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
