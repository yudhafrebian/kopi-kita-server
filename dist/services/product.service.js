"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.getProductDetailservice = exports.getAllProductsService = void 0;
const cloudinary_1 = require("../configs/cloudinary");
const prisma_1 = __importDefault(require("../configs/prisma"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 60 * 5 });
const getAllProductsService = async (category) => {
    const cacheKey = category ? `products/all:${category}` : "products/all";
    const cacheData = cache.get(cacheKey);
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
    const optimized = products.map((p) => ({
        ...p,
        image_url: p.image_url.replace("/upload/", "/upload/f_auto,q_auto/"),
    }));
    cache.set(cacheKey, optimized);
    return optimized;
};
exports.getAllProductsService = getAllProductsService;
const getProductDetailservice = async (id) => {
    const product = await prisma_1.default.menu_items.findUnique({
        where: { id, deleted_at: null },
        include: { categories: true },
    });
    return product;
};
exports.getProductDetailservice = getProductDetailservice;
const createProductService = async (input, file) => {
    if (file) {
        const upload = await (0, cloudinary_1.cloudUpload)(file);
        input.image_url = upload.secure_url;
    }
    const newProduct = await prisma_1.default.menu_items.create({ data: input });
    cache.del("products/all");
    cache.keys().forEach((key) => {
        if (key.startsWith("products/all:"))
            cache.del(key);
    });
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
    cache.del("products/all");
    cache.keys().forEach((key) => {
        if (key.startsWith("products/all:"))
            cache.del(key);
    });
    return updateProduct;
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    const deleteProduct = await prisma_1.default.menu_items.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
    cache.del("products/all");
    cache.keys().forEach((key) => {
        if (key.startsWith("products/all:"))
            cache.del(key);
    });
    return deleteProduct;
};
exports.deleteProductService = deleteProductService;
