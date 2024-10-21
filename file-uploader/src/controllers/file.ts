import { Request, Response } from "express";
import fs from "fs/promises";
import { BadRequestError, NotFoundError } from "../utils/errors";
import File from "../models/File";
import { createResponse } from "../utils/response";
import { FileUpdateBody } from "../types/file";

/************************ POST ******************************/
export async function uploadFile(
  req: Request<{}, {}, { description: string }>,
  res: Response
) {
  if (!req.file) {
    throw new BadRequestError("Please upload a file");
  }

  const { mimetype, path, size, originalname, filename } = req.file;
  const { description } = req.body;

  const file = await File.create({
    name: originalname,
    path,
    filename,
    size,
    description,
    mimeType: mimetype,
  });

  return createResponse(res, 201, "File uploaded", file);
}

/************************ GET ******************************/
export async function getFilesInformation(req: Request, res: Response) {
  const files = await File.find();

  return createResponse(res, 200, "Files information", files);
}

/************************ GET ******************************/
export async function getFileInformationById(
  req: Request<{ id: string }>,
  res: Response
) {
  const { id } = req.params;

  const file = await File.findById(id);

  if (!file) {
    throw new NotFoundError("File not found");
  }

  return createResponse(res, 200, "File information", file);
}

/************************ GET ******************************/
export async function getFileById(req: Request<{ id: string }>, res: Response) {
  const file = await File.findById(req.params.id);

  if (!file) {
    throw new NotFoundError("File not found");
  }

  res.redirect(`/api/v1/uploads/${file.filename}`);
}

/************************ PUT ******************************/
export async function updateFileInformation(
  req: Request<{ id: string }, {}, FileUpdateBody>,
  res: Response
) {
  const { id } = req.params;
  const { description, name } = req.body;
  const file = await File.findByIdAndUpdate(
    id,
    { description, name },
    { new: true }
  );

  if (!file) {
    throw new NotFoundError("File not found");
  }

  return createResponse(res, 200, "File information updated", file);
}

/************************ DELETE ******************************/
export async function deleteFileInformation(
  req: Request<{ id: string }, {}>,
  res: Response
) {
  const { id } = req.params;
  const file = await File.findByIdAndDelete(id);

  if (!file) {
    throw new NotFoundError("File not found");
  }

  return createResponse(res, 200, "File information deleted");
}
