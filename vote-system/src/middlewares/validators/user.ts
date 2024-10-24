import { body, param } from "express-validator";

export class UserValidator {
  static validId = [param("id").isMongoId().withMessage("Invalid ID")];
  static delete = [
    body("password")
      .isString()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 6 characters long"),
  ];
}