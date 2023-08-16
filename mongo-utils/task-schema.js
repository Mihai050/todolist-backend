const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  taskType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: String,
  status: { 
    type: String, 
    default: "Active" },
  deadline: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Task", taskSchema);
