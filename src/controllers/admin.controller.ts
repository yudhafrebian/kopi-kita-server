import { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response";
import { getAllAdminService } from "../services/admin.service";

class AdminController{
    async getAllAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const getAllAdmin = await getAllAdminService();
            successResponse(res, "Success", getAllAdmin);
        } catch (error) {
            next(error);
        }
    }
}

export default AdminController