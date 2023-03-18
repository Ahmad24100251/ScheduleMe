const express = require("express");
const router = express.Router();
const User = require("./user");
const bcrypt = require("bcrypt");

router.post("/signup.html", async (req, res) => {
  try {
    const existingUser = await User.findOne({ name: req.body.name });
    if (existingUser) {
      res.status(400).send("Username already taken");
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/signup.html');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
