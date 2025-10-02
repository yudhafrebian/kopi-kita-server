"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getCategoryDetail = exports.getAllCategoriesService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const prisma_1 = __importDefault(require("../configs/prisma"));
const slugConverter_1 = require("../utils/slugConverter");
const cache = new node_cache_1.default({ stdTTL: 60 * 5 });
const CACHE_KEY = "categories/all";
const getAllCategoriesService = async () => {
    const cacheData = cache.get(CACHE_KEY);
    if (cacheData)
        return cacheData;
    const categories = await prisma_1.default.categories.findMany({
        where: { deleted_at: null },
        orderBy: { created_at: "asc" },
    });
    cache.set(CACHE_KEY, categories);
    return categories;
};
exports.getAllCategoriesService = getAllCategoriesService;
const getCategoryDetail = async (id) => {
    const categories = await prisma_1.default.categories.findUnique({ where: { id } });
    return categories;
};
exports.getCategoryDetail = getCategoryDetail;
const createCategoryService = async (name) => {
    const slug = (0, slugConverter_1.slugConverter)(name);
    const categories = await prisma_1.default.categories.create({ data: { name, slug } });
    cache.del(CACHE_KEY);
    return categories;
};
exports.createCategoryService = createCategoryService;
const updateCategoryService = async (id, name) => {
    const slug = (0, slugConverter_1.slugConverter)(name);
    const categories = await prisma_1.default.categories.update({
        where: { id },
        data: { name, slug },
    });
    cache.del(CACHE_KEY);
    return categories;
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    const categories = await prisma_1.default.categories.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
    cache.del(CACHE_KEY);
    return categories;
};
exports.deleteCategoryService = deleteCategoryService;
