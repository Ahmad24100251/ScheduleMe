const express = require("express");
const router = express.Router();
const Account = require("./account");

router.post("/updateAccount.html", async (req, res) => {
    try {
        const username = req.session.username;
        const accountName = req.body.account;
        const newBalance = parseInt(req.body.amount);

  
        // Validate the balance
        if (isNaN(newBalance)) {
            throw new Error("Invalid balance");
        }

        // Find the account to update
        const accountToUpdate = await Account.findOne({ username, accountName });
        if (!accountToUpdate) {
            throw new Error("Account not found");
        }

        // Update the account's balance
        accountToUpdate.balance = newBalance;
        await accountToUpdate.save();

        res.redirect(`/financetracker.html?username=${username}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
