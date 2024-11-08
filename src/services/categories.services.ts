import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";

@injectable()
export class CategoriesServices {

    async createCategory(userId: number, name: string) {
        return await prisma.category.create({ data: { name, userId, } })
    }

    async deleteCategory(userId: number, id: number) {
        const category = await prisma.category.findUnique({ where: { id }, });

        if (!category) {
            throw new Error("Category not found");
        }

        if (category.userId !== userId) {
            throw new Error("This user is not the category owner");
        }                   
        
        return await prisma.category.delete({ where: { id } })
    }

}