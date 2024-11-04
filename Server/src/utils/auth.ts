import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const createToken = (user: User): string => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1h",
  });
};
