import { Router } from "express";
import { UserControllers } from "../controllers/user.controllers";
import { IsValidBody } from "../middlewares/isValidBody.middleware";
import { createUserSchema, userLoginSchema } from "../schemas/userSchema.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";

export const userRoutes = Router()

const userControllers = new UserControllers()

userRoutes.post("/", IsValidBody.execute({ body: createUserSchema }), userControllers.createUser)

userRoutes.post("/login", IsValidBody.execute({ body: userLoginSchema }), userControllers.loginUser)

userRoutes.get("/profile", verifyToken.execute, userControllers.getUser)