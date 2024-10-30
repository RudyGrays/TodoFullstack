import { Request, Response } from "express";
import { prisma } from "../../../../prisma/prisma.client";

//patch("/workOnTask/:taskId", workInProgressTask);
export const workInProgressTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status: "IN_PROGRESS" },
    });
    res.status(200).json({ task, message: "Начало работы!" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при начале работы с задачей" });
  }
};
