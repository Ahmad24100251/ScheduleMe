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
  },
  startAt: {
    type: Date,
    required: true
  },
  endAt: {
    type: Date,
    required: true
  },
  lastReminderSent: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
