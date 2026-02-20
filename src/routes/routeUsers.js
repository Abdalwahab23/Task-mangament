import express from "express";
import middleware from "../middleware/middleware.js";
import middlewareUsers from "../middleware/middlewareUsers.js";
import { register, login, getUser } from "../contorllers/controllerUser.js";
import {
  createTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../contorllers/controllerTasks.js";
const router = express.Router();
router.post("/register", middlewareUsers, register);
router.post("/login", middlewareUsers, login);
router.post("/createTasks", middleware, createTasks);
router.get("/getAllTasks", getAllTasks);
router.get("/getTaskById/:id", middleware, getTaskById);
router.put("/updateTask/:id", middleware, updateTask);
router.delete("/deleteTask/:id", middleware, deleteTask);
router.get("/getUser/:id", getUser);
export default router;
