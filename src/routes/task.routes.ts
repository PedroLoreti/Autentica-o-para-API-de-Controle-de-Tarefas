import { Router } from "express";
import { TaskControllers } from "../controllers/task.controllers";
import { IsValidBody } from "../middlewares/isValidBody.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";



export const taskRoutes = Router();

const taskControllers = new TaskControllers();

taskRoutes.post("/", verifyToken.execute, IsValidBody.execute({ body: createTaskSchema }), taskControllers.createTask);
taskRoutes.get("/", verifyToken.execute, taskControllers.getTasks);
taskRoutes.get("/:id", verifyToken.execute, taskControllers.getOneTask);
taskRoutes.patch("/:id", verifyToken.execute, IsValidBody.execute({ body: updateTaskSchema }), taskControllers.updateTask);
taskRoutes.delete("/:id", verifyToken.execute, taskControllers.deleteTask);