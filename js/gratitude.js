const mongoose = require("mongoose");

const gratitudeSchema = new mongoose.Schema({
  username: String,
  text: String
});

const Gratitude = mongoose.model('Gratitude', gratitudeSchema);

module.exports = Gratitude;
