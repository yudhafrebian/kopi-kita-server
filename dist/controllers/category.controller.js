"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const category_service_1 = require("../services/category.service");
class CategoryController {
    async getAllCategories(req, res, next) {
        try {
            const getAllCategories = await (0, category_service_1.getAllCategoriesService)();
            (0, response_1.successResponse)(res, "Success", getAllCategories);
        }
        catch (error) {
            next(error);
        }
    }
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const createCategory = await (0, category_service_1.createCategoryService)(name);
            (0, response_1.successResponse)(res, "Kategori berhasil dibuat", createCategory);
        }
        catch (error) {
            next(error);
        }
    }
    async updateCategory(req, res, next) {
        try {
            const { name } = req.body;
            const { id } = req.params;
            const updateCategory = await (0, category_service_1.updateCategoryService)(parseFloat(id), name);
            (0, response_1.successResponse)(res, "Kategori berhasil diupdate", updateCategory);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const deleteCategory = await (0, category_service_1.deleteCategoryService)(parseFloat(id));
            (0, response_1.successResponse)(res, "Kategori berhasil dihapus", deleteCategory);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CategoryController;
