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
exports.getSubordinates = exports.getUsers = exports.removeSubordinate = exports.addSubordinate = void 0;
const prisma_client_1 = require("../../prisma/prisma.client");
//add-subordinate
const addSubordinate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { subordinateId } = req.body;
    if (!userId)
        return res.status(403).json({ message: "Запрещено!" });
    if (!subordinateId) {
        return res.status(400).json({ error: "ID подчиненного не предоставлено" });
    }
    try {
        const subordinateExists = yield prisma_client_1.prisma.user.findUnique({
            where: { id: subordinateId },
        });
        if (!subordinateExists) {
            return res.status(404).json({ error: "Подчиненный не найден" });
        }
        const relationship = yield prisma_client_1.prisma.userRelationship.create({
            data: {
                leaderId: userId,
                subordinateId: subordinateId,
            },
        });
        return res.status(201).json({
            message: "Подчиненный успешно добавлен!",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Ошибка при добавлении подчиненного" });
    }
});
exports.addSubordinate = addSubordinate;
const removeSubordinate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { subordinateId } = req.body;
    if (!userId)
        return res.status(403).json({ message: "Запрещено!" });
    if (!subordinateId) {
        return res.status(400).json({ error: "ID подчиненного не предоставлено" });
    }
    try {
        const relationship = yield prisma_client_1.prisma.userRelationship.findFirst({
            where: {
                leaderId: userId,
                subordinateId: subordinateId,
            },
        });
        if (!relationship) {
            return res.status(404).json({
                error: "Подчиненный не найден или не принадлежит данному лидеру",
            });
        }
        yield prisma_client_1.prisma.userRelationship.delete({
            where: {
                id: relationship.id,
            },
        });
        return res.status(200).json({ message: "Подчиненный успешно удален!" });
    }
    catch (error) {
        return res.status(500).json({ error: "Ошибка при удалении подчиненного" });
    }
});
exports.removeSubordinate = removeSubordinate;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    try {
        const users = yield prisma_client_1.prisma.user.findMany({
            where: {
                id: {
                    not: userId,
                },
            },
        });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Пользователи не найдены" });
        }
        const relationships = yield prisma_client_1.prisma.userRelationship.findMany({
            where: {
                leaderId: userId,
            },
        });
        const subordinateIds = relationships.map((rel) => rel.subordinateId);
        const usersWithImLeader = users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            patronymic: user.patronymic,
            login: user.login,
            imLeader: subordinateIds.includes(user.id),
        }));
        return res
            .status(200)
            .json({
            users: usersWithImLeader,
            message: "Список пользователей получен!",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Ошибка при получении пользователей" });
    }
});
exports.getUsers = getUsers;
//subordinates
const getSubordinates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    try {
        const userWithSubordinates = yield prisma_client_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                subordinates: {
                    include: {
                        subordinate: true,
                    },
                },
            },
        });
        if (!userWithSubordinates) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        const users = userWithSubordinates.subordinates.map((relationship) => ({
            id: relationship.subordinate.id,
            firstName: relationship.subordinate.firstName,
            lastName: relationship.subordinate.lastName,
            patronymic: relationship.subordinate.patronymic,
            login: relationship.subordinate.login,
        }));
        return res
            .status(200)
            .json({ users, message: "Список подчиненных получен!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Ошибка при получении пользователей" });
    }
});
exports.getSubordinates = getSubordinates;
