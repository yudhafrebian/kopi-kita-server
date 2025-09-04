import prisma from "../configs/prisma";
import { slugConverter } from "../utils/slugConverter";

export const getAllCategoriesService = async () => {
  return await prisma.categories.findMany({
    where: { deleted_at: null },
    orderBy: {created_at: "asc"},
  });
};

export const createCategoryService = async (name: any) => {
  const slug = slugConverter(name);
  return await prisma.categories.create({ data: { name, slug } });
};

export const updateCategoryService = async (id: number, name: any) => {
  const slug = slugConverter(name);
  return await prisma.categories.update({
    where: { id },
    data: { name, slug },
  });
};

export const deleteCategoryService = async (id: number) => {
  return await prisma.categories.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
