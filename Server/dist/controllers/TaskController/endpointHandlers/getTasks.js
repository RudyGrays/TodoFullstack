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
exports.getTasks = void 0;
const prisma_client_1 = require("../../../../prisma/prisma.client");
//get("/", getTasks);
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { groupBy, byAssignee } = req.query;
    try {
        let tasks = yield prisma_client_1.prisma.task.findMany({
            where: {
                OR: [{ creatorId: userId }, { assigneeId: userId }],
            },
            orderBy: {
                updatedAt: "desc",
            },
            include: {
                assignee: true,
                creator: true,
            },
        });
        if (typeof byAssignee === "string") {
            tasks = yield prisma_client_1.prisma.task.findMany({
                where: {
                    assigneeId: byAssignee,
                    creatorId: userId,
                },
                include: {
                    assignee: true,
                    creator: true,
                },
                orderBy: {
                    updatedAt: "desc",
                },
            });
        }
        if (groupBy === "today") {
            tasks = tasks.filter((task) => {
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                return dueDate.toDateString() === today.toDateString();
            });
        }
        else if (groupBy === "week") {
            tasks = tasks.filter((task) => {
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                const weekFromNow = new Date();
                weekFromNow.setDate(today.getDate() + 7);
                return dueDate > today && dueDate <= weekFromNow;
            });
        }
        else if (groupBy === "future") {
            tasks = tasks.filter((task) => {
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                return dueDate.getTime() > today.setDate(today.getDate() + 7);
            });
        }
        return res.status(200).json({ tasks, message: "Задачи получены!" });
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка при получении задач" });
    }
});
exports.getTasks = getTasks;
