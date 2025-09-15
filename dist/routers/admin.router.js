"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const token_1 = require("../middleware/token");
class AdminRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.adminController = new admin_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post("/signin", this.adminController.signIn);
        this.route.post("/signup", this.adminController.signUp);
        this.route.get("/all", this.adminController.getAllAdmin);
        this.route.get("/keep-login", token_1.verifyToken, this.adminController.keepLogin);
        this.route.patch("/update/:id", token_1.verifyToken, this.adminController.updateAdmin);
        this.route.patch("/delete/:id", token_1.verifyToken, this.adminController.deleteAdmin);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = AdminRouter;
