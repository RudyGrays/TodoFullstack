import { Request, Response } from "express";
import { prisma } from "../../prisma/prisma.client";
import { User } from "@prisma/client";

//add-subordinate
export const addSubordinate = async (req: Request, res: Response) => {
  const { userId } = req;
  const { subordinateId } = req.body;

  if (!userId) return res.status(403).json({ message: "Запрещено!" });
  if (!subordinateId) {
    return res.status(400).json({ error: "ID подчиненного не предоставлено" });
  }

  try {
    const subordinateExists = await prisma.user.findUnique({
      where: { id: subordinateId },
    });

    if (!subordinateExists) {
      return res.status(404).json({ error: "Подчиненный не найден" });
    }

    const relationship = await prisma.userRelationship.create({
      data: {
        leaderId: userId,
        subordinateId: subordinateId,
      },
    });

    return res.status(201).json({
      message: "Подчиненный успешно добавлен!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ошибка при добавлении подчиненного" });
  }
};

export const removeSubordinate = async (req: Request, res: Response) => {
  const { userId } = req;
  const { subordinateId } = req.body;

  if (!userId) return res.status(403).json({ message: "Запрещено!" });
  if (!subordinateId) {
    return res.status(400).json({ error: "ID подчиненного не предоставлено" });
  }

  try {
    const relationship = await prisma.userRelationship.findFirst({
      where: {
        leaderId: userId,
        subordinateId: subordinateId,
      },
    });

    if (!relationship) {
      return res.status(404).json({
        error: "Подчиненный не найден или не принадлежит данному лидеру",
      });
    }

    await prisma.userRelationship.delete({
      where: {
        id: relationship.id,
      },
    });

    return res.status(200).json({ message: "Подчиненный успешно удален!" });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при удалении подчиненного" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const { userId } = req;

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Пользователи не найдены" });
    }

    const relationships = await prisma.userRelationship.findMany({
      where: {
        leaderId: userId,
      },
    });

    const subordinateIds = relationships.map((rel) => rel.subordinateId);

    const usersWithImLeader = users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      login: user.login,
      imLeader: subordinateIds.includes(user.id),
    }));

    return res
      .status(200)
      .json({
        users: usersWithImLeader,
        message: "Список пользователей получен!",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ошибка при получении пользователей" });
  }
};

//subordinates
export const getSubordinates = async (req: Request, res: Response) => {
  const { userId } = req;

  try {
    const userWithSubordinates = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subordinates: {
          include: {
            subordinate: true,
          },
        },
      },
    });

    if (!userWithSubordinates) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const users = userWithSubordinates.subordinates.map((relationship) => ({
      id: relationship.subordinate.id,
      firstName: relationship.subordinate.firstName,
      lastName: relationship.subordinate.lastName,
      patronymic: relationship.subordinate.patronymic,
      login: relationship.subordinate.login,
    }));

    return res
      .status(200)
      .json({ users, message: "Список подчиненных получен!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ошибка при получении пользователей" });
  }
};
