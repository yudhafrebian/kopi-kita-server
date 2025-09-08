import { compare } from "bcrypt";
import prisma from "../configs/prisma";
import { createToken } from "../utils/createToken";
import { AdminResponse } from "../types/admin.type";
import { hashPassword } from "../utils/hashPassword";

export const getAllAdminService = async () => {
  return await prisma.admin.findMany();
};

export const signInService = async (email: string, password: string) => {
  const account = await prisma.admin.findUnique({
    where: { email },
  });

  if (!account) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await compare(password, account.password_hash);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = createToken(
    {
      id: account.id,
    },
    "1d"
  );
  return {
    name: account.name,
    email: account.email,
    token,
  };
};

export const signUpService = async (
  name: string,
  email: string,
  password_hash: string
) => {
  const isExist = await prisma.admin.findUnique({
    where: { email },
  });

  if (isExist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password_hash);

  const createAccount = await prisma.admin.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
      created_at: new Date(),
    },
  });

  return createAccount;
};

export const keepLoginService = async (userId: number) => {
  const account = await prisma.admin.findUnique({
    where: { id: userId },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const token = createToken(
    {
      id: account.id,
    },
    "1d"
  );

  return {
    name: account.name,
    email: account.email,
    token,
  };
};

export const updateAdminService = async (
  userId: number,
  name: string,
  email: string
) => {
  const updateAdmin = await prisma.admin.update({
    where: { id: userId },
    data: {
      name,
      email,
    },
  });
  return updateAdmin;
};
