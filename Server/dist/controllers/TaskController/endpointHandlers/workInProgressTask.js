"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workInProgressTask = void 0;
const prisma_client_1 = require("../../../prisma/prisma.client");
//patch("/workOnTask/:taskId", workInProgressTask);
const workInProgressTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    try {
        const task = yield prisma_client_1.prisma.task.update({
            where: { id: taskId },
            data: { status: "IN_PROGRESS" },
        });
        res.status(200).json({ task, message: "Начало работы!" });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при начале работы с задачей" });
    }
});
exports.workInProgressTask = workInProgressTask;
