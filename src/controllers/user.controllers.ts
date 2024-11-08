import { Request, Response } from "express";
import { UserServices } from "../services/user.services";
import { container } from "tsyringe";
export class UserControllers {
    async createUser(req: Request, res: Response) {
        const userService = container.resolve(UserServices);


        const response = await userService.createUser(req.body);

        res.status(201).json(response);
    }

    async loginUser(req: Request, res: Response) {
        const userService = container.resolve(UserServices);
        
        const response = await userService.loginUser(req.body);
        res.status(200).json(response);
    }

    async getUser(req: Request, res: Response) {
        const userService = container.resolve(UserServices);

        const userId = res.locals.decode?.id;

        const user = await userService.getUser(userId);

        return res.status(200).json(user);
    }
}