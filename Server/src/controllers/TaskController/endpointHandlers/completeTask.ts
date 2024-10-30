import { Request, Response } from "express";
import { prisma } from "../../../../prisma/prisma.client";

//patch("/complete/:taskId", completeTask);
export const completeTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status: "DONE" },
    });

    return res.status(200).json({ task, message: "Задача выполнена!" });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при выполнении задачи" });
  }
};
