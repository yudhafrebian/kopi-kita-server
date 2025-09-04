"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getAllCategoriesService = void 0;
const prisma_1 = __importDefault(require("../configs/prisma"));
const slugConverter_1 = require("../utils/slugConverter");
const getAllCategoriesService = async () => {
    return await prisma_1.default.categories.findMany({
        where: { deleted_at: null },
        orderBy: { created_at: "asc" },
    });
};
exports.getAllCategoriesService = getAllCategoriesService;
const createCategoryService = async (name) => {
    const slug = (0, slugConverter_1.slugConverter)(name);
    return await prisma_1.default.categories.create({ data: { name, slug } });
};
exports.createCategoryService = createCategoryService;
const updateCategoryService = async (id, name) => {
    const slug = (0, slugConverter_1.slugConverter)(name);
    return await prisma_1.default.categories.update({
        where: { id },
        data: { name, slug },
    });
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    return await prisma_1.default.categories.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
};
exports.deleteCategoryService = deleteCategoryService;
