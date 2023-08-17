const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 8888;

require("dotenv").config();
const dbString = process.env.DB_STRING;
const Task = require("./mongo-utils/task-schema.js");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(dbString);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
}

connectToDatabase();

app.post("/api/add-task", async (req, res) => {
  const { title, description, taskType, deadline, estimatedTime } = req.body;
  const newTask = new Task({
    title: title,
    estimatedTime: estimatedTime,
    description: description,
    taskType: taskType,
    deadline: new Date(deadline),
  });

  try {
    await newTask.save();
    res.sendStatus(200);
  } catch (err) {
    console.error("Error:", err);
    res.sendStatus(500);
  }
});

app.get("/api/get-task/:taskId", async (req, res) => {
  console.log(req.params.taskId);
  const taskId = req.params.taskId;
  try{  
    const task = await Task.findOne({ _id: taskId });
    res.send(task);
  } catch (err) {
    console.error("Error:", err);
    res.sendStatus(500);
  }

});


app.get("/api/get-active-tasks", async (req, res) => {
  const activeTasks = await Task.find({status: "Active"}).lean();
  res.send(activeTasks);
});

app.get("/api/get-inactive-tasks", async (req, res) => {
    const inactiveTasks = await Task.find({ status: {$ne : "Active"} }).lean();
    res.send(inactiveTasks);
});

app.get("/api/delete-task/:taskId", async (req, res) => {
  const taskId = req.params.taskId;

  const deletedTask = await Task.findOne({ _id: taskId });
  if (deletedTask.status === "Inactive") {
    res.sendStatus(500);
  }
  
  
  try {
    await Task.deleteOne({ _id: taskId });
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

app.get("/api/edit-task/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const newDescription = req.body.description;
  const editedTask = await Task.findOne({ _id: taskId });
  if (editedTask.status === "Inactive") {
    res.sendStatus(500);
  }
  editedTask.description = newDescription;

  try {
    await Task.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/api/complete-task/:taskId/:time", async (req, res) => {
  const taskId = req.params.taskId;
  const time = req.params.time;

  const endedTask = await Task.findOne({ _id: taskId });
  if(ended.status === "Inactive"){
    res.sendStatus(500);
  }
  endedTask.status = 'Inactive';
  endedTask.completionTime = time;
  endedTask.finishedAt = new Date();

  try {
    await endedTask.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

app.get("/api/revert-task/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  // TODO - REVERT A TASK HERE, will revert the task to Active and nullify the completed day and completion time
});

app.get("/api/sanitycheck", (req, res) => {
  res.sendStatus(200);
} )

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}/api/sanitycheck`);
});
