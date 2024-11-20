import { Request, Response } from "express";
import {
  UserRegisterBody,
  UserUpdateBody,
  UserUpdatePasswordBody,
} from "../types/user";
import User from "../models/User";
import { createResponse } from "../lib/response";
import { NotFoundError } from "../lib/errors";
import { comparePassword, hashPassword } from "../lib/utils";

const userController = {
  // GET
  async getUsers(req: Request, res: Response) {
    const users = await User.find();
    return createResponse(res, 200, "Users retrieved with success", users);
  },
  // GET
  async getProfile(req: Request, res: Response) {
    const user = await User.findById(req.userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "Profile retrieved with success", user);
  },
  // GET
  async getUserById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "User retrieved with success", user);
  },
  // PUT
  async updateProfile(req: Request<{}, {}, UserUpdateBody>, res: Response) {
    const { role, password, ...body } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, body, {
      new: true,
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return createResponse(res, 200, "User updated with success", user);
  },
  async updatePassword(
    req: Request<{}, {}, UserUpdatePasswordBody>,
    res: Response
  ) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { userId } = req;
    if (newPassword !== confirmPassword) {
      throw new NotFoundError("Passwords do not match");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isValidPassword = await comparePassword(oldPassword, user.password);

    if (!isValidPassword) {
      throw new NotFoundError("Invalid password");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    return createResponse(res, 200, "Password updated with success");
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

    await User.findByIdAndDelete(userId);

    return createResponse(res, 200, "User deleted with success");
  },
};

export default userController;
