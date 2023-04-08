const express = require('express');
const router = express.Router();
const FitnessStats = require('./fitnessStats');

// Endpoint to get all fitness stats for a specific user
router.get('/getFitnessStats', async (req, res) => {
  const username = req.query.username;
  try {
    const fitnessStats = await FitnessStats.find({ username });
    res.send(fitnessStats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
