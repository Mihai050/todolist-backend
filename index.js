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

// .then(async () => {
// const testTask = new Task({
//       title: 'Test Task',
//       description: 'This is a test task.',
//       taskType: 'Hobby',
//       status: 'Pending',
//       deadline: new Date('2023-08-31'),
//     });

//     await testTask.save();
//     console.log('Test task saved successfully');
// });


app.get('/api/add-task', (req, res) => {
  // TODO - CREATE A TASK HERE
})

app.get("/api/delete-task/:taskId", (req, res) => {
    const taskId = req.params.taskId;
  // TODO - DELETE A TASK HERE
});

app.get("/api/edit-task/:taskId", (req, res) => {
    const taskId = req.params.taskId;
  // TODO - DELETE A TASK HERE
});

app.get("/api/complete-task/:taskId", (req, res) => {
    const taskId = req.params.taskId;
  // TODO - DELETE A TASK HERE
});

app.get("/api/revert-task/:taskId", (req, res) => {
    const taskId = req.params.taskId;
  // TODO - REVERT A TASK HERE
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

