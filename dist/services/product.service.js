import { cloudUpload } from "../configs/cloudinary";
import prisma from "../configs/prisma";
export const getAllProductsService = async (category) => {
    const whereClause = { deleted_at: null };
    if (category) {
        whereClause.categories = { slug: category };
    }
    return await prisma.menu_items.findMany({
        where: whereClause,
        include: { categories: true },
        orderBy: { name: "asc" },
    });
};
export const createProductService = async (input, file) => {
    if (file) {
        const upload = await cloudUpload(file);
        input.image_url = upload.secure_url;
    }
    const newProduct = await prisma.menu_items.create({ data: input });
    return newProduct;
};
