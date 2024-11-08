"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskControllers = void 0;
const task_services_1 = require("../services/task.services");
const tsyringe_1 = require("tsyringe");
class TaskControllers {
    async createTask(req, res) {
        const taskService = tsyringe_1.container.resolve(task_services_1.TaskServices);
        const { title, content, finished, categoryId } = req.body;
        const userId = res.locals.decode.id;
        const taskData = {
            title,
            content,
            finished,
            ...(categoryId && { categoryId }),
            userId
        };
        const response = await taskService.createTask(taskData);
        res.status(201).json(response);
    }
    async getTasks(req, res) {
        const taskService = tsyringe_1.container.resolve(task_services_1.TaskServices);
        const userId = res.locals.decode.id;
        const category = req.query.category;
        const response = await taskService.getTasks(userId, category);
        res.status(200).json(response);
    }
    async getOneTask(req, res) {
        const taskService = tsyringe_1.container.resolve(task_services_1.TaskServices);
        const { id } = req.params;
        const userId = res.locals.decode.id;
        const response = await taskService.getOneTask(userId, Number(id));
        if (!response) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(response);
    }
    async updateTask(req, res) {
        const taskService = tsyringe_1.container.resolve(task_services_1.TaskServices);
        const userId = res.locals.decode.id;
        const { id } = req.params;
        const { title, content, finished, categoryId } = req.body;
        const taskData = {
            title,
            content,
            finished,
            ...(categoryId && { categoryId })
        };
        const response = await taskService.updateTask(userId, Number(id), taskData);
        res.status(200).json(response);
    }
    async deleteTask(req, res) {
        const taskService = tsyringe_1.container.resolve(task_services_1.TaskServices);
        const userId = res.locals.decode.id;
        const { id } = req.params;
        await taskService.deleteTask(userId, Number(id));
        res.status(204).json();
    }
}
exports.TaskControllers = TaskControllers;
