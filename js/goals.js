const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  username: String,
  goal: Number
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
