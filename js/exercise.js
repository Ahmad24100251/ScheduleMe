const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    username: String,
    exerciseName: String,
    exerciseSets: Number,
    exerciseReps: Number,
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exercise', exerciseSchema);

