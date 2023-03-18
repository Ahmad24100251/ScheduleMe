const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("./user");

router.post("/login.html", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user) {
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
      res.redirect(`/welcomeUser.html?username=${user.name}`);
    } else {
      res.send('Invalid username or password');
    }
  } else {
    res.send('Invalid username or password');
  }
});

module.exports = router;
