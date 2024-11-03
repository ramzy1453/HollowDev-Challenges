import mongoose from "mongoose";
import { IVote } from "../types/vote";

const voteSchema = new mongoose.Schema<IVote>(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Candidature",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
  },
  { timestamps: true }
);

voteSchema.virtual("id").get(function (this) {
  return this._id.toHexString();
});

voteSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const vote = mongoose.model<IVote>("Vote", voteSchema);

export default vote;
