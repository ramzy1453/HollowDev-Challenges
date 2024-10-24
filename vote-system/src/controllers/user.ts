import { Request, Response } from "express";
import { UserRegisterBody, UserUpdateBody } from "../types/user";
import User from "../models/User";
import { createResponse } from "../lib/response";
import { NotFoundError } from "../lib/errors";
import { comparePassword } from "../lib/utils";

const userController = {
  // GET
  async getUsers(req: Request, res: Response) {
    const users = await User.find();
    return createResponse(res, 200, "Users retrieved with success", users);
  },
  // GET
  async getProfile(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const user = await User.findOne({ id: req.userId });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "Profile retrieved with success", user);
  },
  // GET
  async getUserById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const user = await User.findOne({ id });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "User retrieved with success", user);
  },
  // PUT
  async updateProfile(
    req: Request<{ id: string }, {}, UserUpdateBody>,
    res: Response
  ) {
    const user = await User.findOneAndUpdate({ id: req.userId }, req.body, {
      new: true,
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "User updated with success", user);
  },
  // DELETE
  async deleteProfile(
    req: Request<{}, {}, { password: string }>,
    res: Response
  ) {
    const { password } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new NotFoundError("Invalid password");
    }

    await User.deleteOne({ id: userId });

    return createResponse(res, 200, "User deleted with success");
  },
};

export default userController;
