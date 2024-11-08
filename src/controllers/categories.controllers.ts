import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services";
import { container } from "tsyringe";

export class CategoriesControllers {

    async createCategory(req: Request, res: Response) {
        const categoryService = container.resolve(CategoriesServices);

        const { name } = req.body;
        const userId = res.locals.decode.id;

        const response = await categoryService.createCategory(userId, name);
        res.status(201).json(response);
    }

    async deleteCategory(req: Request, res: Response) {
        const categoryService = container.resolve(CategoriesServices);

        const userId = res.locals.decode.id;
        const { id } = req.params;
        await categoryService.deleteCategory(userId, Number(id));
        res.status(204).json();

    }
}