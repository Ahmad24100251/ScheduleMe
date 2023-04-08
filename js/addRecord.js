const express = require("express");
const router = express.Router();
const Record = require("./records");
const Account = require("./account");

router.post("/addRecord.html", async (req, res) => {
  try {
    const username = req.session.username;
    const spending = parseInt(req.body.spending);
    const accountName = req.body.account;

    // Find the account to deduct from
    const accountToDeductFrom = await Account.findOne({ username, accountName });
    if (!accountToDeductFrom) {
      throw new Error("Account not found");
    }

    // Deduct the spending from the account's balance
    accountToDeductFrom.balance -= spending;
    await accountToDeductFrom.save();

    // Check if the user already has a spending record
    let existingRecord = await Record.findOne({ username });

    if (existingRecord) {
      // Add the new spending to the existing record
      existingRecord.spending += spending;
      await existingRecord.save();
    } else {
      // Create a new record for the user
      const newRecord = new Record({
        username,
        spending
      });

      await newRecord.save();
    }

    res.redirect(`/financeTracker.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
