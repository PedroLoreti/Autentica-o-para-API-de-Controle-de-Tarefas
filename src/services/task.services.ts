import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { ITaskUpdate, ITaskWithoutId } from "../interfaces/tasks.interfaces";


@injectable()
export class TaskServices {
    async createTask(body: ITaskWithoutId & { userId: number }) {
        if (body.categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: body.categoryId }
            });

            if (!category) {
                throw new Error("Category not found");
            }
        }
        return await prisma.task.create({ data: { ...body, userId: body.userId } });
    }

    async getTasks(userId: number, categoryName?: string) {
        const tasks = await prisma.task.findMany({
            where: {
                userId,
                ...(categoryName && {
                    category: {
                        name: {
                            contains: categoryName.toLocaleLowerCase(),
                            mode: "insensitive"
                        },
                        userId,
                    },
                }),
            },
            include: { category: true },
        });

        if (categoryName && tasks.length === 0) {
            throw new Error("Category not found");
        }

        return tasks.map(task => ({
            id: task.id,
            title: task.title,
            content: task.content,
            finished: task.finished,
            category: task.category || null
        }));
    }

    async getOneTask(userId: number, id: number) {
        const task = await prisma.task.findFirst({ where: { id }, include: { category: true } });

        if (!task) {
            throw new Error("Task not found");
        }

        if (task.userId !== userId) {
            throw new Error("This user is not the task owner");
        }

        return {
            id: task.id,
            title: task.title,
            content: task.content,
            finished: task.finished,
            category: task.category || null
        };
    }

    async updateTask(userId: number, id: number, body: ITaskUpdate) {
        const existingTask = await prisma.task.findUnique({ where: { id } });
        if (!existingTask) {
            throw new Error("Task not found");
        }

        if (existingTask.userId !== userId) {
            throw new Error("This user is not the task owner");
        }

        if (body.categoryId !== undefined) {
            const existingCategory = await prisma.category.findUnique({
                where: { id: body.categoryId }
            });

            if (!existingCategory) {
                throw new Error("Category not found");
            }
        }

        return await prisma.task.update({ where: { id }, data: body });
    }

    async deleteTask(userId: number, id: number) {
        const task = await prisma.task.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!task) {
            throw new Error("Task not found");
        }

        if (task.userId !== userId) {
            throw new Error("This user is not the task owner");
        }

        return await prisma.task.delete({ where: { id } });
    }

}

