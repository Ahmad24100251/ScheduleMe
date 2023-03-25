const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  taskNumber: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
