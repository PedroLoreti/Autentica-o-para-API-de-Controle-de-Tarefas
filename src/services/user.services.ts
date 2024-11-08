import { prisma } from "../database/prisma";
import { IUser, IUserLogin } from "../interfaces/tasks.interfaces";
import { injectable } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

injectable()
export class UserServices {
    async createUser(body: IUser) {
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingUser) {
            throw new Error("Email already registered");
        }

        const hashPassword = await bcrypt.hash(body.password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashPassword,
            },
        });

        return { ...newUser, password: undefined };


    }

    async loginUser(body: IUserLogin) {
        const user = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (!user) {
            throw new Error("User not exists");
        }

        const campare = await bcrypt.compare(body.password, user.password);

        if (!campare) {
            throw new Error("Email and password doesn't match");
        }

        

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "365d" });

        const { password, ...userWithoutPassword } = user;
        return { accessToken: token, user: userWithoutPassword };
    }

    async getUser(userId: number) {
        const user = await prisma.user.findUnique({ 
            where: { id: userId }, 
        });

        
        return { ...user, password: undefined };
    }




}