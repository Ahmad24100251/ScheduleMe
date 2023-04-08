const express = require('express');
const router = express.Router();
const FitnessStats = require('./fitnessStats');

router.post('/addFitnessStats.html', async (req, res) => {
  try {
    const username = req.session.username;
    const weight = req.body.weight;
    const height = req.body.height;
    const age = req.body.age;
    const goal = req.body.goal;

    console.log(username)
    const fitnessStats = new FitnessStats({
      username,
      weight: weight,
      height: height,
      age: age,
      goal: goal
    });

    await fitnessStats.save();
    res.redirect(`/fitnessTracker.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
