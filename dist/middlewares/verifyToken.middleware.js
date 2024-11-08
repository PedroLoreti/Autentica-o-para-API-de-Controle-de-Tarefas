"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class verifyToken {
    static execute(req, res, next) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Token is required");
        }
        const secret = process.env.JWT_SECRET;
        jsonwebtoken_1.default.verify(token, secret);
        const decoded = jsonwebtoken_1.default.decode(token);
        res.locals.decode = decoded;
        next();
    }
}
exports.verifyToken = verifyToken;
