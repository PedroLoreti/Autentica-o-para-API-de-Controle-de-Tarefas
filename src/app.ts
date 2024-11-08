import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { taskRoutes } from "./routes/task.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { HandleErrors } from "./errors/handleErrors.middleware";
import { userRoutes } from "./routes/user.routes";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });


export const app = express();

app.use(helmet());

app.use(json());

app.use('/tasks', taskRoutes)

app.use('/categories', categoriesRoutes)

app.use("/users", userRoutes)

app.use(HandleErrors.execute)





