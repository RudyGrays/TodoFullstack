import { Request, Response } from "express";
import { prisma } from "../../../prisma/prisma.client";

//patch("/cancel/:taskId", cancelTask);
export const cancelTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status: "CANCELLED" },
    });

    return res.status(200).json({ task, message: "Задача отменена!" });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка при отмене задачи" });
  }
};
