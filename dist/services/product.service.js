"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductService = exports.getAllProductsService = void 0;
const cloudinary_1 = require("../configs/cloudinary");
const prisma_1 = __importDefault(require("../configs/prisma"));
const getAllProductsService = async (category) => {
    const whereClause = { deleted_at: null };
    if (category) {
        whereClause.categories = { slug: category };
    }
    return await prisma_1.default.menu_items.findMany({
        where: whereClause,
        include: { categories: true },
        orderBy: { name: "asc" },
    });
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
