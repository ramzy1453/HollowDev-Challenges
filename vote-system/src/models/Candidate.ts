import mongoose from "mongoose";
import { ICandidate } from "../types/candidate";

const candidateSchema = new mongoose.Schema<ICandidate>({});

candidateSchema.virtual("id").get(function (this) {
  return this._id.toHexString();
});

candidateSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const candidate = mongoose.model<ICandidate>("Candidate", candidateSchema);

export default candidate;
