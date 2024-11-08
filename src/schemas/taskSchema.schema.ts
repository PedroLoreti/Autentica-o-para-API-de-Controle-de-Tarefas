import {z} from "zod";

const taskSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().optional(),
    categoryId: z.number().int().optional()
    
}).strict();

export const createTaskSchema = taskSchema.omit({ id: true });

export const updateTaskSchema = taskSchema.omit({ id: true }).partial();