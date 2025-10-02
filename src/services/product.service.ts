import { cloudUpload } from "../configs/cloudinary";
import prisma from "../configs/prisma";
import { Products } from "../types/products.type";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 60 * 5 });

export const getAllProductsService = async (category: string) => {
  const cacheKey = category ? `products/all:${category}` : "products/all";

  const cacheData = cache.get(cacheKey);
  if (cacheData) return cacheData;

  const whereClause: any = { deleted_at: null };
  if (category) {
    whereClause.categories = { slug: category };
  }
  const products = await prisma.menu_items.findMany({
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

export const getProductDetailservice = async (id: number) => {
  const product = await prisma.menu_items.findUnique({
    where: { id, deleted_at: null },
    include: { categories: true },
  });
  return product;
};

export const createProductService = async (
  input: Products,
  file?: Express.Multer.File
) => {
  if (file) {
    const upload = await cloudUpload(file);
    input.image_url = upload.secure_url;
  }
  const newProduct = await prisma.menu_items.create({ data: input });
  return newProduct;
};

export const updateProductService = async (
  id: number,
  input: Products,
  file?: Express.Multer.File
) => {
  if (file) {
    const upload = await cloudUpload(file);
    input.image_url = upload.secure_url;
  }
  const updateProduct = await prisma.menu_items.update({
    where: { id },
    data: input,
  });
  return updateProduct;
};

export const deleteProductService = async (id: number) => {
  const deleteProduct = await prisma.menu_items.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
  return deleteProduct;
};
