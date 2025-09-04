import { cloudUpload } from "../configs/cloudinary";
import prisma from "../configs/prisma";
import { Products } from "../types/products.type";

export const getAllProductsService = async (category: string) => {
  const whereClause: any = { deleted_at: null };
  if (category) {
    whereClause.categories = { slug: category };
  }
  return await prisma.menu_items.findMany({
    where: whereClause,
    include: { categories: true },
    orderBy: { name: "asc" },
  });
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
