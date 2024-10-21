import mongoose from "mongoose";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    role: {
      type: String,
      default: "normal",
      enum: ["normal", "admin"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("id").get(function (this) {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
