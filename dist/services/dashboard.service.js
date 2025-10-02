"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summaryServices = void 0;
const prisma_1 = __importDefault(require("../configs/prisma"));
const summaryServices = async () => {
    const totalProduct = await prisma_1.default.menu_items.count();
    const totalCategory = await prisma_1.default.categories.count();
    const newestProduct = await prisma_1.default.menu_items.findMany({ take: 5, orderBy: { created_at: "desc" }, include: { categories: true } });
    return { totalProduct, totalCategory, newestProduct };
};
exports.summaryServices = summaryServices;
