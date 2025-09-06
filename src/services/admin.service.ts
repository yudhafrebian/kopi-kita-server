import prisma from "../configs/prisma";

export const getAllAdminService = async () => {
    return await prisma.admin.findMany();
};