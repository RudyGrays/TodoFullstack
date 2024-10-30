import { Router } from "express";
import {
  createTask,
  getTasks,
  completeTask,
  deleteTask,
  workInProgressTask,
  updateTask,
} from "../controllers/TaskController/taskController";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { cancelTask } from "../controllers/TaskController/endpointHandlers/cancelTask";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/complete/:taskId", completeTask);
router.patch("/workOnTask/:taskId", workInProgressTask);
router.patch("/update/:taskId", adminMiddleware, updateTask);
router.delete("/:taskId", adminMiddleware, deleteTask);
router.patch("/cancel/:taskId", adminMiddleware, cancelTask);
export default router;
