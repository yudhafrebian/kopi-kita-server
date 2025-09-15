"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }
        const checkToken = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_KEY || "secretKey");
        res.locals.data = checkToken;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.verifyToken = verifyToken;
