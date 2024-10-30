import express, { Request, Response } from "express";
import managerRoutes from "./routes/managerRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import * as dotenv from "dotenv";
import { authMiddleware } from "./middleware/authMiddleware";
import cors from "cors";
import { prisma } from "../prisma/prisma.client";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use("/auth", authRoutes);
server.use("/users", authMiddleware, managerRoutes);
server.use("/tasks", authMiddleware, taskRoutes);
server.get("/health", async (req, res) => {
  try {
    await prisma.$connect();
    res.status(200).json({ message: "Database connected successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Database connection failed", details: error });
  }
});
server.listen(process.env.PORT || 4200, () => {
  console.log("Server running on port 4200");
});
