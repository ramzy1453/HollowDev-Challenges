import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { BadRequestError, InternalServerError } from "../lib/errors";

export function validation(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        throw new BadRequestError(JSON.stringify(errorMessages));
      } else {
        throw new InternalServerError(
          "An internal server error occurred while validating the request"
        );
      }
    }
  };
}
