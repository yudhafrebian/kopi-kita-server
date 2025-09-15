"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (data, expiresIn) => {
    const secret = process.env.TOKEN_KEY || "secretKey";
    return (0, jsonwebtoken_1.sign)(data, secret, { expiresIn: expiresIn || "1h" });
};
exports.createToken = createToken;
