import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";
import { container } from "tsyringe";

export class TaskControllers {
    async createTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

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

    async getTasks(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

        const userId = res.locals.decode.id;
        const category = req.query.category as string;


        const response = await taskService.getTasks(userId, category);
        res.status(200).json(response);
    }

    async getOneTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

        const { id } = req.params;
        const userId = res.locals.decode.id;

        const response = await taskService.getOneTask(userId, Number(id));

        if (!response) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(response);
    }

    async updateTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

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

    async deleteTask(req: Request, res: Response) {
        const taskService = container.resolve(TaskServices);

        const userId = res.locals.decode.id;

        const { id } = req.params;
        await taskService.deleteTask(userId, Number(id));
        res.status(204).json();

    }
}