import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma.client";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { taskId } = req.params;

  const isCreator = await prisma.task.findFirst({
    where: {
      id: taskId,
      creator: {
        id: userId,
      },
    },
  });

  if (!isCreator) {
    req.isCreator = false;
    return next();
  }

  req.isCreator = true;
  next();
};
