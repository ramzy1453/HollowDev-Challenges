import { Router } from "express";
import userController from "../controllers/user";

const router = Router();
export default router;

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
