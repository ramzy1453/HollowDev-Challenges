import { validationResult } from "express-validator";

import type { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../lib/errors";
/**
 * @description Middleware to validate the request and check for errors
 * @param req  the request object
 * @param res  the response object
 * @param next the next function
 * @returns
 */
export default function validator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new BadRequestError(
      "Validation Error: " +
        errors
          .array()
          .map((e, i) => e.msg)
          .join(", ")
    );
  }
  next();
}
