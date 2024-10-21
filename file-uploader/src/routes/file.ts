import express from "express";
import {
  deleteFileInformation,
  getFileById,
  getFileInformationById,
  getFilesInformation,
  updateFileInformation,
  uploadFile,
} from "../controllers/file";
import multer from "../middlewares/multer";

const fileRouter = express.Router();

fileRouter.post("/upload", [multer.single("file")], uploadFile);
fileRouter.get("/info/:id", getFileInformationById);
fileRouter.put("/info/:id", updateFileInformation);
fileRouter.get("/info/", getFilesInformation);
fileRouter.delete("/info/:id", deleteFileInformation);
fileRouter.get("/:id", getFileById);

export default fileRouter;
