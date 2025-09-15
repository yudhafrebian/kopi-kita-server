"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminService = exports.updateAdminService = exports.keepLoginService = exports.signUpService = exports.signInService = exports.getAllAdminService = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../configs/prisma"));
const createToken_1 = require("../utils/createToken");
const hashPassword_1 = require("../utils/hashPassword");
const getAllAdminService = async () => {
    return await prisma_1.default.admin.findMany({
        where: { deleted_at: null }
    });
};
exports.getAllAdminService = getAllAdminService;
const signInService = async (email, password) => {
    const account = await prisma_1.default.admin.findUnique({
        where: { email },
    });
    if (!account) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await (0, bcrypt_1.compare)(password, account.password_hash);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = (0, createToken_1.createToken)({
        id: account.id,
    }, "1d");
    return {
        name: account.name,
        email: account.email,
        token,
    };
};
exports.signInService = signInService;
const signUpService = async (name, email, password_hash) => {
    const isExist = await prisma_1.default.admin.findUnique({
        where: { email, deleted_at: null },
    });
    if (isExist) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await (0, hashPassword_1.hashPassword)(password_hash);
    const createAccount = await prisma_1.default.admin.create({
        data: {
            name,
            email,
            password_hash: hashedPassword,
            created_at: new Date(),
        },
    });
    return createAccount;
};
exports.signUpService = signUpService;
const keepLoginService = async (userId) => {
    const account = await prisma_1.default.admin.findUnique({
        where: { id: userId },
    });
    if (!account) {
        throw new Error("Account not found");
    }
    const token = (0, createToken_1.createToken)({
        id: account.id,
    }, "1d");
    return {
        name: account.name,
        email: account.email,
        token,
    };
};
exports.keepLoginService = keepLoginService;
const updateAdminService = async (userId, name, email) => {
    const updateAdmin = await prisma_1.default.admin.update({
        where: { id: userId, deleted_at: null },
        data: {
            name,
            email,
        },
    });
    return updateAdmin;
};
exports.updateAdminService = updateAdminService;
const deleteAdminService = async (userId) => {
    const deleteAdmin = await prisma_1.default.admin.update({
        where: { id: userId, deleted_at: null },
        data: {
            deleted_at: new Date(),
        },
    });
    return deleteAdmin;
};
exports.deleteAdminService = deleteAdminService;
