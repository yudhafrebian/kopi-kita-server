import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

export default prisma