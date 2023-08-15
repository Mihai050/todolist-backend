const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const port = 8888;

require('dotenv').config();
const dbString = process.env.DB_STRING;
const Task = require('./mongo-utils/task-schema.js');

app.use(cors());

async function connectToDatabase() {
  try {
    await mongoose.connect(dbString);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
}

connectToDatabase();


app.get('/api/add-task', async (req, res) => {
  // TODO - CREATE A TASK HERE
  const {title, description, taskType, status, deadline} = req.body;
  const newTask = new Task({
      title: title,
      description: description,
      taskType: taskType,
      status: status,
      deadline: new Date(deadline),
    })

    try {
        await newTask.save();
        res.sendStatus(200);
    } catch (err) {
        console.error("Error:", error);
        res.sendStatus(500);
    }
})

app.get("/api/delete-task/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
  // TODO - DELETE A TASK HERE
});

app.get("/api/edit-task/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
  // TODO - DELETE A TASK HERE
});

app.get("/api/complete-task/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
  // TODO - DELETE A TASK HERE
});

app.get("/api/revert-task/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
  // TODO - REVERT A TASK HERE
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

