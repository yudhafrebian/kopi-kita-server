import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }

    const checkToken: string | JwtPayload = verify(
      token,
      process.env.TOKEN_KEY || "secretKey"
    );
    res.locals.data = checkToken
    next()
  } catch (error) {
    next(error);
  }
};
