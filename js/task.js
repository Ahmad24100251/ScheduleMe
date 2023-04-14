const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  checkboxId: {
    type: String,
    required: true
  }, // Add _id field here
  username: {
    type: String,
    required: true
  },
  task: {
    type: String,
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
  },
  completed: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
