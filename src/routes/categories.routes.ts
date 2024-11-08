import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { IsValidBody } from "../middlewares/isValidBody.middleware";
import { categorySchema } from "../schemas/categoriesSchema.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";


export const categoriesRoutes = Router();

const categoriesControllers = new CategoriesControllers();

categoriesRoutes.post("/", verifyToken.execute, IsValidBody.execute({ body: categorySchema }), categoriesControllers.createCategory);
categoriesRoutes.delete("/:id", verifyToken.execute, categoriesControllers.deleteCategory);