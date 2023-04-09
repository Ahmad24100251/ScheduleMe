const express = require('express');
const router = express.Router();
const Account = require('./account');

router.post('/addAccount.html', async (req, res) => {
  try {
    const username = req.session.username;
    const accountName = req.body.account;
    const balance = req.body.balance;

    const account = new Account({
      username,
      accountName: accountName,
      balance: balance
    });

    await account.save();
    res.redirect(`/financetracker.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
