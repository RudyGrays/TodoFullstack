import { Request, Response } from "express";
import { prisma } from "../prisma/prisma.client";
import { hashPassword, comparePassword, createToken } from "../utils/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, patronymic, login, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { login } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким логином уже существует" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        patronymic,
        login,
        password: hashedPassword,
      },
    });

    const token = createToken(user);

    return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при регистрации" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { login } });
    if (!user) {
      return res.status(400).json({ error: "Неверный логин или пароль" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Неверный логин или пароль" });
    }

    const token = createToken(user);
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при аутентификации" });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(token);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload & { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const newToken = createToken(user);

    return res.status(200).json({
      token: newToken,
      user,
    });
  } catch (error) {
    return res.status(403).json({ error: "Неверный токен" });
  }
};
