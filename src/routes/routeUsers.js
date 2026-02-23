import express from "express";
import middleware from "../middleware/middleware.js";
import { register, login, getUser } from "../contorllers/controllerUser.js";
import msgValidator from "../validator/validatorById.js";
import {
  createTasks,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../contorllers/controllerTasks.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/createTasks", middleware, createTasks);
router.get("/getAllTasks", getAllTasks);
router.get("/getTaskById/:id", msgValidator, getTaskById);
router.put("/updateTask/:id", msgValidator, updateTask);
router.delete("/deleteTask/:id", msgValidator, deleteTask);
router.get("/getUser/:id", msgValidator, getUser);
export default router;
