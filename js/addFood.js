const express = require("express");
const router = express.Router();
const Food = require("./food");

router.post("/fitnessTrackerFoodLog.html", async (req, res) => {
  try {
    const username = req.session.username;
    const mealType = req.body["meal-type"];
    const calories = req.body.calories;
    const timeOfDay = req.body["time-of-day"];

    const food = new Food({
      username,
      mealType,
      calories,
      timeOfDay
    });

    await food.save();
    res.redirect(`/fitnessTrackerFoodLog.html?username=${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
