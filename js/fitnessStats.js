const mongoose = require("mongoose");

const fitnessStatsSchema = new mongoose.Schema({
  username: String,
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  goal: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("fitnessStats", fitnessStatsSchema);
