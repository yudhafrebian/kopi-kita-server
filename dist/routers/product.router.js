"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const uploader_1 = require("../middleware/uploader");
class ProductRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.get("/all", this.productController.getAllProducts);
        this.route.post("/create", (0, uploader_1.uploaderMemory)().single("image_url"), this.productController.createProduct);
    }
    getRouter() {
        return this.route;
    }
}
exports.default = ProductRouter;
