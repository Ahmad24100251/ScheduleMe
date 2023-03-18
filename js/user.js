const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
}, { collection: 'testcol' });

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
