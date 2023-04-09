const express = require('express');
const router = express.Router();
const Food = require('./food');

// Endpoint to get all food entries for a specific user
router.get('/getFoodEntries', async (req, res) => {
  const { username } = req.query;
  try {
    const foodEntries = await Food.find({ username }).sort({ 'time-of-day': 'asc' });
    res.send(foodEntries);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
