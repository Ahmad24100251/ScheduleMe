const express = require('express');
const router = express.Router();
const Exercise = require('./exercise');

router.post('/exerciseLog.html', async (req, res) => {
  try {
    const username = req.session.username;
    const { exerciseName, exerciseSets, exerciseReps } = req.body;

    const exercise = new Exercise({
      username,
      exerciseName,
      exerciseSets,
      exerciseReps,
    });

    await exercise.save();
    res.redirect(`/exerciseLog.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
