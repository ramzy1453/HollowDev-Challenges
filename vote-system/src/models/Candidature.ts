import mongoose from "mongoose";
import { ICandidature } from "../types/candidature";
import { string } from "zod";

const candidatureSchema = new mongoose.Schema<ICandidature>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  motivation: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
  },
  candidatureFor: {
    type: String,
    required: true,
    enum: [
      "team-leader",
      "team-assistant",
      "web-lead",
      "mobile-lead",
      "ai-lead",
      "cybersecurity-lead",
    ],
  },
});

candidatureSchema.virtual("id").get(function (this) {
  return this._id.toHexString();
});

candidatureSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Candidature = mongoose.model<ICandidature>(
  "Candidature",
  candidatureSchema
);

export default Candidature;
