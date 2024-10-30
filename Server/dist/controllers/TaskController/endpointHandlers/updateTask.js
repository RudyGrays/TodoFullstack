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
exports.updateTask = void 0;
const prisma_client_1 = require("../../../prisma/prisma.client");
//patch("/update/:taskId", updateTask);
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { isCreator } = req;
    if (!isCreator)
        return res.status(403).json({ message: "Запрещено" });
    const { data } = req.body;
    const filteredData = {};
    if (data.description) {
        filteredData.description = data.description;
    }
    if (data.dueDate) {
        filteredData.dueDate = data.dueDate;
    }
    if (data.priority) {
        filteredData.priority = data.priority;
    }
    if (data.title) {
        filteredData.title = data.title;
    }
    try {
        const task = yield prisma_client_1.prisma.task.update({
            where: { id: taskId },
            data: Object.assign({}, data),
        });
        return res.status(200).json({ task, message: "Успешно обновлено!" });
    }
    catch (error) {
        return res.status(500).json({ error: "Ошибка при обновлении задачи" });
    }
});
exports.updateTask = updateTask;
