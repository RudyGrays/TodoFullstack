import { Request, Response } from "express";
import { prisma } from "../../../prisma/prisma.client";
import { Task } from "@prisma/client";

//get("/", getTasks);
export const getTasks = async (req: Request, res: Response) => {
  const { userId } = req;
  const { groupBy, byAssignee } = req.query;

  try {
    let tasks = await prisma.task.findMany({
      where: {
        OR: [{ creatorId: userId }, { assigneeId: userId }],
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        assignee: true,
        creator: true,
      },
    });

    if (typeof byAssignee === "string") {
      tasks = await prisma.task.findMany({
        where: {
          assigneeId: byAssignee,
          creatorId: userId,
        },
        include: {
          assignee: true,
          creator: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }

    if (groupBy === "today") {
      tasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        return dueDate.toDateString() === today.toDateString();
      });
    } else if (groupBy === "week") {
      tasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        return dueDate > today && dueDate <= weekFromNow;
      });
    } else if (groupBy === "future") {
      tasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();

        return dueDate.getTime() > today.setDate(today.getDate() + 7);
      });
    }

    return res.status(200).json({ tasks, message: "Задачи получены!" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении задач" });
  }
};
