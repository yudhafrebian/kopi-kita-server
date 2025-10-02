"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const token_1 = require("../middleware/token");
class DashboardRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.DahsboardController = new dashboard_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/summary", token_1.verifyToken, this.DahsboardController.summary);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = DashboardRouter;
