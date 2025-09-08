import { sign } from "jsonwebtoken";

export const createToken = (data: any, expiresIn?: any) => {
    const secret: string = process.env.TOKEN_KEY || "secretKey";
    return sign(data, secret, { expiresIn: expiresIn || "1h" });
};