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
exports.deleteTask = void 0;
const prisma_client_1 = require("../../../../prisma/prisma.client");
//delete("/:taskId", deleteTask)
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isCreator } = req;
    const { taskId } = req.params;
    if (!isCreator)
        return res.status(403).json({ message: "Запрещено!" });
    try {
        const task = yield prisma_client_1.prisma.task.delete({
            where: { id: taskId },
        });
        return res.status(200).json({ task, message: "Задача удалена!" });
    }
    catch (error) {
        return res.status(500).json({ error: "Ошибка при удалении задачи" });
    }
});
exports.deleteTask = deleteTask;
