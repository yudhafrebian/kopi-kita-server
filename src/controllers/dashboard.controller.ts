import { NextFunction, Request, Response } from "express";
import { summaryServices } from "../services/dashboard.service";
import { successResponse } from "../utils/response";

class DashboardController {
  async summary(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getSummary = await summaryServices();
      successResponse(res, "Success", { summary: getSummary });
    } catch (error) {
      next(error);
    }
  }
}

export default DashboardController;
