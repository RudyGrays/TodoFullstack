import { Request, Response } from "express";
import { prisma } from "../../../../prisma/prisma.client";
import { Task } from "@prisma/client";

type UpdatableTask = Omit<
  Task,
  "createdAt" | "updatedAt" | "creatorId" | "status" | "id "
>;

//patch("/update/:taskId", updateTask);
export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { isCreator } = req;

  if (!isCreator) return res.status(403).json({ message: "Запрещено" });

  const { data } = req.body;

  const filteredData = {} as Partial<UpdatableTask>;
  if (data.description) {
    filteredData.description = data.description;
  }
  if (data.dueDate) {
    filteredData.dueDate = data.dueDate;
  }
  if (data.priority) {
    filteredData.priority = data.priority;
  }
  if (data.title) {
    filteredData.title = data.title;
  }

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...data,
      },
    });

    return res.status(200).json({ task, message: "Успешно обновлено!" });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при обновлении задачи" });
  }
};
