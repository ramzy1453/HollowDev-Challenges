import { Router } from "express";
import authControllers from "../controllers/auth";

const router = Router();

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);

export default router;
