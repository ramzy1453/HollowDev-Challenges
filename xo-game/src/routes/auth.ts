import { Router } from "express";
import authControllers from "../controllers/auth";
import { AuthValidator } from "../middlewares/validators/auth";
import validator from "../middlewares/validator";

const router = Router();
router.post("/login", AuthValidator.login, validator, authControllers.login);
router.post(
  "/register",
  AuthValidator.register,
  validator,
  authControllers.register
);

export default router;
