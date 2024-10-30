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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.register = void 0;
var prisma_client_1 = require("../../prisma/prisma.client");
var auth_1 = require("../utils/auth");
var jsonwebtoken_1 = require("jsonwebtoken");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, patronymic, login, password, existingUser, hashedPassword, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, patronymic = _a.patronymic, login = _a.login, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma_client_1.prisma.user.findUnique({ where: { login: login } })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ error: "Пользователь с таким логином уже существует" })];
                }
                return [4 /*yield*/, (0, auth_1.hashPassword)(password)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma_client_1.prisma.user.create({
                        data: {
                            firstName: firstName,
                            lastName: lastName,
                            patronymic: patronymic,
                            login: login,
                            password: hashedPassword,
                        },
                    })];
            case 4:
                user = _b.sent();
                token = (0, auth_1.createToken)(user);
                return [2 /*return*/, res.status(201).json({ token: token, user: user })];
            case 5:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Ошибка при регистрации" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, login, password, user, isPasswordValid, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, login = _a.login, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_client_1.prisma.user.findUnique({ where: { login: login } })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ error: "Неверный логин или пароль" })];
                }
                return [4 /*yield*/, (0, auth_1.comparePassword)(password, user.password)];
            case 3:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(400).json({ error: "Неверный логин или пароль" })];
                }
                token = (0, auth_1.createToken)(user);
                return [2 /*return*/, res.status(200).json({ token: token, user: user })];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: "Ошибка при аутентификации" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decoded, user, newToken, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    return [2 /*return*/, res.status(401).json(token)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
                return [4 /*yield*/, prisma_client_1.prisma.user.findUnique({
                        where: { id: decoded.userId },
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: "Пользователь не найден" })];
                }
                newToken = (0, auth_1.createToken)(user);
                return [2 /*return*/, res.status(200).json({
                        token: newToken,
                        user: user,
                    })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(403).json({ error: "Неверный токен" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.refreshToken = refreshToken;