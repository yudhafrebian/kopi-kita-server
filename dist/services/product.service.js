"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.getAllProductsService = void 0;
const cloudinary_1 = require("../configs/cloudinary");
const prisma_1 = __importDefault(require("../configs/prisma"));
const node_cache_1 = __importDefault(require("node-cache"));
const getAllProductsService = async (category) => {
    const cache = new node_cache_1.default({ stdTTL: 60 });
    const cacheData = cache.get("cacheKey");
    if (cacheData)
        return cacheData;
    const whereClause = { deleted_at: null };
    if (category) {
        whereClause.categories = { slug: category };
    }
    const products = await prisma_1.default.menu_items.findMany({
        where: whereClause,
        include: { categories: true },
        orderBy: { name: "asc" },
    });
    cache.set("cacheKey", products);
    return products;
};
exports.getAllProductsService = getAllProductsService;
const createProductService = async (input, file) => {
    if (file) {
        const upload = await (0, cloudinary_1.cloudUpload)(file);
        input.image_url = upload.secure_url;
    }
    const newProduct = await prisma_1.default.menu_items.create({ data: input });
    return newProduct;
};
exports.createProductService = createProductService;
const updateProductService = async (id, input, file) => {
    if (file) {
        const upload = await (0, cloudinary_1.cloudUpload)(file);
        input.image_url = upload.secure_url;
    }
    const updateProduct = await prisma_1.default.menu_items.update({
        where: { id },
        data: input,
    });
    return updateProduct;
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    const deleteProduct = await prisma_1.default.menu_items.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
    return deleteProduct;
};
exports.deleteProductService = deleteProductService;
