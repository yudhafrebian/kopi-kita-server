import prisma from "../configs/prisma"

export const summaryServices = async () => {
    const totalProduct = await prisma.menu_items.count();
    const totalCategory = await prisma.categories.count();
    const newestProduct = await prisma.menu_items.findMany({take: 5, orderBy: {created_at: "desc"}, include: {categories: true}});
    return { totalProduct, totalCategory, newestProduct };
}