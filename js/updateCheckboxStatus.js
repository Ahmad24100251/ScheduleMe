const express = require("express");
const router = express.Router();
const Task = require("./task");


router.post("/updateCheckboxStatus", async (req, res) => {
    try {
      const username = req.query.username;
      const checkboxId = req.query.checkboxId;
      const checked = req.query.checked;
      // find the task corresponding to the checkboxId
      const task = await Task.findOne({ username: username, checkboxId: checkboxId });
      if (!task) {
        return res.status(404).send("Task not found");
      }
      task.completed = checked === 'true';
      await task.save();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  
  module.exports = router;
