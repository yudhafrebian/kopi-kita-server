"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
class CategoryRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.categoryController = new category_controller_1.default();
        this.inizializeRoutes();
    }
    inizializeRoutes() {
        this.route.get("/all", this.categoryController.getAllCategories);
        this.route.post("/create", this.categoryController.createCategory);
        this.route.post("/delete/:id", this.categoryController.deleteCategory);
        this.route.patch("/update/:id", this.categoryController.updateCategory);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = CategoryRouter;
