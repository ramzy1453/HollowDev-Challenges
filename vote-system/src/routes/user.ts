import { Router } from "express";
import userController from "../controllers/user";
import { param } from "express-validator";
import { UserValidator } from "../middlewares/validators/user";
import isAdmin from "../middlewares/isAdmin";
import isAuth from "../middlewares/isAuth";
import validator from "../middlewares/validator";

const router = Router();
export default router;

router.get("/", isAuth, isAdmin, userController.getUsers);
router.get("/profile", isAuth, userController.getProfile);

router.get(
  "/:id",
  isAuth,
  isAdmin,
  UserValidator.validId,
  validator,
  userController.getUserById
);

router.put("/profile", isAuth, userController.updateProfile);
router.put(
  "/update-password",
  isAuth,
  UserValidator.updatePassword,
  validator,
  userController.updatePassword
);
router.delete(
  "/delete-account",
  isAuth,
  UserValidator.delete,
  validator,
  userController.deleteProfile
);
