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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.register = void 0;
const prisma_client_1 = require("../../prisma/prisma.client");
const auth_1 = require("../utils/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, patronymic, login, password } = req.body;
    try {
        const existingUser = yield prisma_client_1.prisma.user.findUnique({ where: { login } });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Пользователь с таким логином уже существует" });
        }
        const hashedPassword = yield (0, auth_1.hashPassword)(password);
        const user = yield prisma_client_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                patronymic,
                login,
                password: hashedPassword,
            },
        });
        const token = (0, auth_1.createToken)(user);
        return res.status(201).json({ token, user });
    }
    catch (error) {
        return res.status(500).json({ error: "Ошибка при регистрации" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        const user = yield prisma_client_1.prisma.user.findUnique({ where: { login } });
        if (!user) {
            return res.status(400).json({ error: "Неверный логин или пароль" });
        }
        const isPasswordValid = yield (0, auth_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Неверный логин или пароль" });
        }
        const token = (0, auth_1.createToken)(user);
        return res.status(200).json({ token, user });
    }
    catch (error) {
        return res.status(500).json({ error: "Ошибка при аутентификации" });
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json(token);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const user = yield prisma_client_1.prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }
        const newToken = (0, auth_1.createToken)(user);
        return res.status(200).json({
            token: newToken,
            user,
        });
    }
    catch (error) {
        return res.status(403).json({ error: "Неверный токен" });
    }
});
exports.refreshToken = refreshToken;
