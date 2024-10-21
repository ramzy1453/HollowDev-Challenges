export interface IFile {
  name: string;
  filename: string;
  size: number;
  description: string;
  mimeType: string;
  path: string;
}

export interface FileUpdateBody {
  description: string;
  name: string;
}
