import Task from "../models/modelsTask.js";
import asyncHandler from "express-async-handler";
const createTasks = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const task = await Task.create({
    title,
    description,
    completed,
  });
  res.status(201).json({ message: "Task created successfully", task });
});

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById({ _id: req.params.id });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json({ message: "Task fetched successfully", task });
});
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      },
    );
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete({ _id: req.params.id });
  if (task.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to delete this task");
  }
  res.status(200).json({ message: "Task deleted successfully", task });
});

export { createTasks, getAllTasks, getTaskById, updateTask, deleteTask };
