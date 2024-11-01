"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/TaskController/taskController");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const cancelTask_1 = require("../controllers/TaskController/endpointHandlers/cancelTask");
const router = (0, express_1.Router)();
router.post("/", taskController_1.createTask);
router.get("/", taskController_1.getTasks);
router.patch("/complete/:taskId", taskController_1.completeTask);
router.patch("/workOnTask/:taskId", taskController_1.workInProgressTask);
router.patch("/update/:taskId", adminMiddleware_1.adminMiddleware, taskController_1.updateTask);
router.delete("/:taskId", adminMiddleware_1.adminMiddleware, taskController_1.deleteTask);
router.patch("/cancel/:taskId", adminMiddleware_1.adminMiddleware, cancelTask_1.cancelTask);
exports.default = router;
