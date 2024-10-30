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
exports.createTask = void 0;
const prisma_client_1 = require("../../../prisma/prisma.client");
//post("/", createTask);
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creatorId = req.userId;
    const { title, description, dueDate, priority, assigneeId } = req.body;
    if (!title || !description || !dueDate || !priority) {
        return res.status(400).json({ error: "Все поля обязательны" });
    }
    try {
        const task = yield prisma_client_1.prisma.task.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                priority,
                status: "TO_DO",
                creator: {
                    connect: { id: creatorId },
                },
                assignee: {
                    connect: { id: assigneeId || creatorId },
                },
            },
        });
        return res.status(201).json({ task, message: "Успешно создано!" });
    }
    catch (error) {
        return res.status(500).json({ error: "Ошибка при создании задачи" });
    }
});
exports.createTask = createTask;
