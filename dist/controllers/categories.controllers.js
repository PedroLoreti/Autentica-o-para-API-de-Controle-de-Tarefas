"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesControllers = void 0;
const categories_services_1 = require("../services/categories.services");
const tsyringe_1 = require("tsyringe");
class CategoriesControllers {
    async createCategory(req, res) {
        const categoryService = tsyringe_1.container.resolve(categories_services_1.CategoriesServices);
        const { name } = req.body;
        const userId = res.locals.decode.id;
        const response = await categoryService.createCategory(userId, name);
        res.status(201).json(response);
    }
    async deleteCategory(req, res) {
        const categoryService = tsyringe_1.container.resolve(categories_services_1.CategoriesServices);
        const userId = res.locals.decode.id;
        const { id } = req.params;
        await categoryService.deleteCategory(userId, Number(id));
        res.status(204).json();
    }
}
exports.CategoriesControllers = CategoriesControllers;
