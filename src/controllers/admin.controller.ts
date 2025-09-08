import { NextFunction, Request, Response } from "express";
import { createResponse, successResponse } from "../utils/response";
import {
  getAllAdminService,
  keepLoginService,
  signInService,
  signUpService,
  updateAdminService,
} from "../services/admin.service";

class AdminController {
  async getAllAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const getAllAdmin = await getAllAdminService();
      successResponse(res, "Success", getAllAdmin);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const signIn = await signInService(email, password);
      successResponse(res, "Success", signIn);
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password_hash } = req.body;
      const signUp = await signUpService(name, email, password_hash);
      createResponse(res, "Admin Created Successfully", signUp);
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = res.locals.data.id;
      const keepLogin = await keepLoginService(userId);
      successResponse(res, "Success", keepLogin);
    } catch (error) {
      next(error);
    }
  }

  async updateAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = res.locals.data.id;
      const { name, email } = req.body;
      const updateAdmin = await updateAdminService(userId, name, email);
      successResponse(res, "Success", updateAdmin);
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
