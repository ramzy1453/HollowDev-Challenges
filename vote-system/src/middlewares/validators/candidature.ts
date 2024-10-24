import { body, param } from "express-validator";

export class CandidatureValidator {
  static create = [
    body("skills").isArray().notEmpty().withMessage("Skills is invalid"),
    body("vision").isString().notEmpty().withMessage("Vision is invalid"),
    body("candidatureFor")
      .isString()
      .notEmpty()
      .isIn([
        "team-leader",
        "team-assistant",
        "web-lead",
        "mobile-lead",
        "ai-lead",
        "cybersecurity-lead",
      ])
      .withMessage("Candidature for is invalid"),
    body("motivation")
      .isString()
      .notEmpty()
      .withMessage("Motivation is invalid"),
  ];
  static validId = [param("id").isMongoId().withMessage("Invalid ID")];
}
