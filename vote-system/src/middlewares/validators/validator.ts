import { param } from "express-validator";

export class VoteValidator {
  static validId = [param("id").isMongoId().withMessage("Invalid ID")];
}
