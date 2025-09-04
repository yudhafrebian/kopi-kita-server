"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../services/product.service");
const response_1 = require("../utils/response");
const slugConverter_1 = require("../utils/slugConverter");
class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const { category } = req.query;
            const getAllProducts = await (0, product_service_1.getAllProductsService)(category);
            (0, response_1.successResponse)(res, "Success", getAllProducts);
        }
        catch (error) {
            next(error);
        }
    }
    async createProduct(req, res, next) {
        try {
            const { name, description, price, image_url, category_id } = req.body;
            const createProduct = await (0, product_service_1.createProductService)({
                name,
                slug: (0, slugConverter_1.slugConverter)(name),
                description,
                price: Number(price),
                image_url: image_url || "",
                category_id: Number(category_id),
                created_at: new Date(),
            }, req.file);
            (0, response_1.successResponse)(res, "Success", createProduct);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductController;
