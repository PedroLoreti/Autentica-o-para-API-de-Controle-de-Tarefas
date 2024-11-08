"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const prisma_1 = require("../database/prisma");
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, tsyringe_1.injectable)();
class UserServices {
    async createUser(body) {
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email: body.email },
        });
        if (existingUser) {
            throw new Error("Email already registered");
        }
        const hashPassword = await bcrypt_1.default.hash(body.password, 10);
        const newUser = await prisma_1.prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashPassword,
            },
        });
        return { ...newUser, password: undefined };
    }
    async loginUser(body) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: body.email },
        });
        if (!user) {
            throw new Error("User not exists");
        }
        const campare = await bcrypt_1.default.compare(body.password, user.password);
        if (!campare) {
            throw new Error("Email and password doesn't match");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "365d" });
        const { password, ...userWithoutPassword } = user;
        return { accessToken: token, user: userWithoutPassword };
    }
    async getUser(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
        });
        return { ...user, password: undefined };
    }
}
exports.UserServices = UserServices;
