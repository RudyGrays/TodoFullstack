import { Request, Response } from "express";
import { prisma } from "../../../../prisma/prisma.client";

//delete("/:taskId", deleteTask)
export const deleteTask = async (req: Request, res: Response) => {
  const { isCreator } = req;
  const { taskId } = req.params;
  if (!isCreator) return res.status(403).json({ message: "Запрещено!" });

  try {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });
    return res.status(200).json({ task, message: "Задача удалена!" });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при удалении задачи" });
  }
};
