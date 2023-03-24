const express = require("express");
const router = express.Router();
const Gratitude = require("./gratitude");

router.post("/addGratitude.html", async (req, res) => {
  try {
    const username = req.session.username;
    const text = req.body.gratitude;

    const gratitude = new Gratitude({
      username,
      text
    });

    await gratitude.save();
    res.redirect(`/dailyplanner.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
