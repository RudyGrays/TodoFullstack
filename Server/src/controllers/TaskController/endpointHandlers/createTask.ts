import { Request, Response } from "express";
import { prisma } from "../../../prisma/prisma.client";
import { Task } from "@prisma/client";

//post("/", createTask);
export const createTask = async (req: Request, res: Response) => {
  const creatorId = req.userId;

  const { title, description, dueDate, priority, assigneeId } =
    req.body as Task;

  if (!title || !description || !dueDate || !priority) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        status: "TO_DO",
        creator: {
          connect: { id: creatorId },
        },
        assignee: {
          connect: { id: assigneeId || creatorId },
        },
      },
    });

    return res.status(201).json({ task, message: "Задача добавлена!" });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при создании задачи" });
  }
};
