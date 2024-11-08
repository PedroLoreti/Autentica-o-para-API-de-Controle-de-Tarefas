import { NextFunction, Request, Response } from "express";
import { AppError } from "./erros";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrors {
    static execute(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });

        } else if (err instanceof JsonWebTokenError) {
            return res.status(401).json({ message: err.message });

        } else if (err instanceof ZodError) {
            return res.status(400).json({ errors: err.errors });

        } else if (err.message === "Category not found") {
            return res.status(404).json({ message: "Category not found" });

        } else if (err.message === "Task not found") {
            return res.status(404).json({ message: "Task not found" });

        } else if (err.message === "Email already registered") {
            return res.status(409).json({ message: "This email is already registered" });

        } else if (err.message === "User not exists") {
            return res.status(404).json({ message: "User not exists" });

        } else if (err.message === "Email and password doesn't match") {
            return res.status(401).json({ message: "Email and password doesn't match" });
    
        } else if (err.message === "Token is required") {
            return res.status(401).json({ message: "Token is required" });
        
        } else if (err.message === "This user is not the task owner") {
            return res.status(403).json({ message: "This user is not the task owner" });

        } else if (err.message === "This user is not the category owner") {
            return res.status(403).json({ message: "This user is not the category owner" });

        } else {
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}