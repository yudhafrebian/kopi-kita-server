import NodeCache from "node-cache";
import prisma from "../configs/prisma";
import { slugConverter } from "../utils/slugConverter";
const cache = new NodeCache({ stdTTL: 60 * 5 });

const CACHE_KEY = "categories/all";

export const getAllCategoriesService = async () => {
  const cacheData = cache.get(CACHE_KEY);
  if (cacheData) return cacheData;
  const categories = await prisma.categories.findMany({
    where: { deleted_at: null },
    orderBy: { created_at: "asc" },
  });

  cache.set(CACHE_KEY, categories);
  return categories;
};

export const getCategoryDetail = async (id: number) => {
  const categories = await prisma.categories.findUnique({ where: { id } });
  return categories;
};

export const createCategoryService = async (name: any) => {
  const slug = slugConverter(name);
  const categories = await prisma.categories.create({ data: { name, slug } });
  cache.del(CACHE_KEY)
  return categories;
};

export const updateCategoryService = async (id: number, name: any) => {
  const slug = slugConverter(name);
  const categories = await prisma.categories.update({
    where: { id },
    data: { name, slug },
  });

  cache.del(CACHE_KEY);
  return categories;
};

export const deleteCategoryService = async (id: number) => {
  const categories = await prisma.categories.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  cache.del(CACHE_KEY);
  return categories;
};
