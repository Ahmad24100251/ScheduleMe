const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  username: String,
  mealType: String,
  calories: Number,
  timeOfDay: String // change to string type
},{ timestamps: true });


const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
