import { body } from "express-validator";

export class AuthValidator {
  static login = [
    body("email").isEmail().notEmpty().withMessage("Invalid email"),
    body("password").isString().notEmpty().withMessage("Invalid password"),
  ];
  static register = [
    body("email").isEmail().notEmpty().withMessage("Invalid email"),
    body("password").isString().notEmpty().withMessage("Invalid password"),
    body("firstName").isString().notEmpty().withMessage("Invalid first name"),
    body("lastName").isString().notEmpty().withMessage("Invalid last name"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
}
