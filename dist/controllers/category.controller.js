import { successResponse } from "../utils/response";
import { createCategoryService, deleteCategoryService, getAllCategoriesService, updateCategoryService, } from "../services/category.service";
class CategoryController {
    async getAllCategories(req, res, next) {
        try {
            const getAllCategories = await getAllCategoriesService();
            successResponse(res, "Success", getAllCategories);
        }
        catch (error) {
            next(error);
        }
    }
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const createCategory = await createCategoryService(name);
            successResponse(res, "Kategori berhasil dibuat", createCategory);
        }
        catch (error) {
            next(error);
        }
    }
    async updateCategory(req, res, next) {
        try {
            const { name } = req.body;
            const { id } = req.params;
            const updateCategory = await updateCategoryService(parseFloat(id), name);
            successResponse(res, "Kategori berhasil diupdate", updateCategory);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const deleteCategory = await deleteCategoryService(parseFloat(id));
            successResponse(res, "Kategori berhasil dihapus", deleteCategory);
        }
        catch (error) {
            next(error);
        }
    }
}
export default CategoryController;
