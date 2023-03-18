const express = require("express");
const router = express.Router();
const User = require("./user");
const bcrypt = require("bcrypt");

router.post("/changePassword.html", async (req, res) => {
    // console.log(req.session.username)
  try {
    const user = await User.findOne({ name: req.session.username });
    if (user) {
      const isPasswordValid = await bcrypt.compare(req.body.oldpassword, user.password);
      if (isPasswordValid) {
        const hashedNewPassword = await bcrypt.hash(req.body.newpassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.redirect(`/welcomeUser.html?username=${user.name}`);
      } else {
        res.send('Current password is incorrect');
      }
    } else {
      res.send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
