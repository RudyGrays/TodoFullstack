"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Не авторизован" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err || typeof decoded === "string" || !decoded) {
            return res.status(403).json({ error: "Неверный токен" });
        }
        var userId = decoded.userId;
        req.userId = userId;
        next();
    });
};
exports.authMiddleware = authMiddleware;
