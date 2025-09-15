"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const admin_service_1 = require("../services/admin.service");
class AdminController {
    async getAllAdmin(req, res, next) {
        try {
            const getAllAdmin = await (0, admin_service_1.getAllAdminService)();
            (0, response_1.successResponse)(res, "Success", getAllAdmin);
        }
        catch (error) {
            next(error);
        }
    }
    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const signIn = await (0, admin_service_1.signInService)(email, password);
            (0, response_1.successResponse)(res, "Success", signIn);
        }
        catch (error) {
            next(error);
        }
    }
    async signUp(req, res, next) {
        try {
            const { name, email, password_hash } = req.body;
            const signUp = await (0, admin_service_1.signUpService)(name, email, password_hash);
            (0, response_1.createResponse)(res, "Admin Created Successfully", signUp);
        }
        catch (error) {
            next(error);
        }
    }
    async keepLogin(req, res, next) {
        try {
            const userId = res.locals.data.id;
            const keepLogin = await (0, admin_service_1.keepLoginService)(userId);
            (0, response_1.successResponse)(res, "Success", keepLogin);
        }
        catch (error) {
            next(error);
        }
    }
    async updateAdmin(req, res, next) {
        try {
            const userId = res.locals.data.id;
            const { name, email } = req.body;
            const updateAdmin = await (0, admin_service_1.updateAdminService)(userId, name, email);
            (0, response_1.successResponse)(res, "Success", updateAdmin);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteAdmin(req, res, next) {
        try {
            const userId = res.locals.data.id;
            const deleteAdmin = await (0, admin_service_1.deleteAdminService)(userId);
            (0, response_1.successResponse)(res, "Success", deleteAdmin);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AdminController;
