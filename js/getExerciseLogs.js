const express = require('express');
const router = express.Router();
const Exercise = require('./exercise');

// Endpoint to get all exercise logs for a specific user
router.get('/getExerciseLogs.html', async (req, res) => {
  const { username } = req.query;
  try {
    const exerciseLogs = await Exercise.find({ username }).sort({ time: 'asc' });
    res.send(exerciseLogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
