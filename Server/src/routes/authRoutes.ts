import { Router } from "express";
import { register, login, refreshToken } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token", refreshToken);

export default router;
