const mongoose = require("mongoose");

const recordsSchema = new mongoose.Schema({
  username: String,
  spending: Number
}, { timestamps: true });

const Records = mongoose.model('Records', recordsSchema);

module.exports = Records;
