import { ReadStream } from "fs-capacitor";

export interface IAccount {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  token: string;
  bio?: string;
  avatar?: FileUpload;
}

export interface FileUpload {
  createReadStream(): ReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}
