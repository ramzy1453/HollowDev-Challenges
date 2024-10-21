import { Request, Response } from "express";
import { UserLoginBody, UserRegisterBody, UserUpdateBody } from "../types/user";
import User from "../models/User";
import { createResponse } from "../lib/response";
import { BadRequestError } from "../lib/errors";
import { hashPassword, comparePassword, createToken } from "../lib/utils";

const authControllers = {
  // POST
  async register(req: Request<{}, {}, UserRegisterBody>, res: Response) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ ...req.body, password: hashedPassword });

    const accessToken = await createToken({ userId: user.id });

    // remove password from response

    return createResponse(res, 201, "User created with success", {
      user,
      accessToken,
    });
  },
  // POST
  async login(req: Request<{}, {}, UserLoginBody>, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Invalid email");
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError("Invalid password");
    }

    const accessToken = await createToken({ userId: user.id });

    // remove password from response

    return createResponse(res, 200, "User logged in with success", {
      user,
      accessToken,
    });
  },
};

export default authControllers;
