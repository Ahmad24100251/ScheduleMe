const express = require('express');
const router = express.Router();
const Account = require('./account');

// Endpoint to get all accounts for a specific user
router.get('/getAccounts', async (req, res) => {
  const username  = req.query.username;
  try {
    const accounts = await Account.find({ username }).sort({ name: 'asc' });

    res.send(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
