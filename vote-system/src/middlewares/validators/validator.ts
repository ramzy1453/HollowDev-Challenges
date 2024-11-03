import { param } from "express-validator";

export class VoteValidator {
  static validId = [param("candidateId").isMongoId().withMessage("Invalid ID")];
}
