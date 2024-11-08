import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1),
    userId: z.number().int().positive()
}).strict();

