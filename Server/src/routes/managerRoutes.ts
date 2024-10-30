import { Router } from "express";
import {
  addSubordinate,
  getSubordinates,
  getUsers,
  removeSubordinate,
} from "../controllers/userController";

const router = Router();

router.get("/all", getUsers);
router.post("/add/subordinate", addSubordinate);
router.post("/remove/subordinate", removeSubordinate);
router.get("/subordinates", getSubordinates);

export default router;
