const mongoose = require("mongoose");

const gratitudeSchema = new mongoose.Schema({
  username: String,
  text: String
}, { timestamps: true });

const Gratitude = mongoose.model('Gratitude', gratitudeSchema);

module.exports = Gratitude;
