"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const taskSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    finished: zod_1.z.boolean().optional(),
    categoryId: zod_1.z.number().int().optional()
}).strict();
exports.createTaskSchema = taskSchema.omit({ id: true });
exports.updateTaskSchema = taskSchema.omit({ id: true }).partial();
