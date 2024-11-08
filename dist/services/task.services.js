"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServices = void 0;
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
let TaskServices = class TaskServices {
    async createTask(body) {
        if (body.categoryId) {
            const category = await prisma_1.prisma.category.findUnique({
                where: { id: body.categoryId }
            });
            if (!category) {
                throw new Error("Category not found");
            }
        }
        return await prisma_1.prisma.task.create({ data: { ...body, userId: body.userId } });
    }
    async getTasks(userId, categoryName) {
        const tasks = await prisma_1.prisma.task.findMany({
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
    async getOneTask(userId, id) {
        const task = await prisma_1.prisma.task.findFirst({ where: { id }, include: { category: true } });
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
    async updateTask(userId, id, body) {
        const existingTask = await prisma_1.prisma.task.findUnique({ where: { id } });
        if (!existingTask) {
            throw new Error("Task not found");
        }
        if (existingTask.userId !== userId) {
            throw new Error("This user is not the task owner");
        }
        if (body.categoryId !== undefined) {
            const existingCategory = await prisma_1.prisma.category.findUnique({
                where: { id: body.categoryId }
            });
            if (!existingCategory) {
                throw new Error("Category not found");
            }
        }
        return await prisma_1.prisma.task.update({ where: { id }, data: body });
    }
    async deleteTask(userId, id) {
        const task = await prisma_1.prisma.task.findUnique({
            where: { id },
            include: { user: true }
        });
        if (!task) {
            throw new Error("Task not found");
        }
        if (task.userId !== userId) {
            throw new Error("This user is not the task owner");
        }
        return await prisma_1.prisma.task.delete({ where: { id } });
    }
};
exports.TaskServices = TaskServices;
exports.TaskServices = TaskServices = __decorate([
    (0, tsyringe_1.injectable)()
], TaskServices);
