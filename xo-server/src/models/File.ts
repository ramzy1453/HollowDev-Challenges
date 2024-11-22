import mongoose from "mongoose";
import { IFile } from "../types/file";

const fileModel = new mongoose.Schema<IFile>({
  name: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  path: {
    required: true,
    type: String,
  },
});

export default mongoose.model("File", fileModel);
