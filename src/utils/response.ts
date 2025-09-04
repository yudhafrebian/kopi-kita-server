import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string = "Success",
  data?: object,
  statusCode: number = 200
):Response => {
  return res.status(statusCode).send({ success: true, message, data });
};

export const createResponse = (
  res: Response,
  message: string = "Success",
  data?: object,
  statusCode: number = 201
) => {
  return res.status(statusCode).send({ success: true, message, data });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500
) => {
  return res.status(statusCode).send({ success: false, message });
};