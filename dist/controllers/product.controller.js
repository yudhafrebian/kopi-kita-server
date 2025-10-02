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
    async getProductDetails(req, res, next) {
        try {
            const { id } = req.params;
            const getProductDetails = await (0, product_service_1.getProductDetailservice)(Number(id));
            (0, response_1.successResponse)(res, "Success", { getProductDetails });
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
            (0, response_1.successResponse)(res, "Produk berhasil dibuat", createProduct);
        }
        catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, price, image_url, category_id } = req.body;
            const updateProduct = await (0, product_service_1.updateProductService)(Number(id), {
                name,
                slug: (0, slugConverter_1.slugConverter)(name),
                description,
                price: Number(price),
                image_url: image_url || "",
                category_id: Number(category_id),
                created_at: new Date(),
            }, req.file);
            (0, response_1.successResponse)(res, "Produk berhasil diperbarui", updateProduct);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const deleteProduct = await (0, product_service_1.deleteProductService)(Number(id));
            (0, response_1.successResponse)(res, "Produk berhasil dihapus", deleteProduct);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProductController;
